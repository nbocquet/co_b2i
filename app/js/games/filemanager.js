/* File Manager game — mini OS explorer, click-to-place files into folders */
const FileManagerGame = {
  _container: null,
  _onComplete: null,
  _data: null,
  _accent: '#84cc16',
  _files: [],
  _selected: null,
  _checked: false,

  _extIcon(ext) {
    return ({
      '.docx': '📄', '.odt': '📄', '.pdf': '📋', '.txt': '📝',
      '.jpg': '🖼️', '.png': '🖼️', '.gif': '🖼️', '.svg': '🖼️',
      '.mp3': '🎵', '.wav': '🎵', '.ogg': '🎵',
      '.xlsx': '📊', '.ods': '📊',
      '.mp4': '🎬', '.avi': '🎬', '.odp': '📑', '.pptx': '📑'
    })[ext] || '📄';
  },

  start(container, data, onComplete, accent) {
    this._container = container;
    this._onComplete = onComplete;
    this._data = data;
    this._accent = accent || '#84cc16';
    this._selected = null;
    this._checked = false;
    this._files = data.files.map((f, i) => ({ ...f, id: i, placedIn: null, icon: this._extIcon(f.ext) }));
    // Shuffle
    for (let i = this._files.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this._files[i], this._files[j]] = [this._files[j], this._files[i]];
    }
    this._render();
  },

  _render() {
    const unplaced = this._files.filter(f => f.placedIn === null);
    const allPlaced = unplaced.length === 0;
    const selFile = this._selected !== null ? this._files.find(f => f.id === this._selected) : null;

    this._container.innerHTML = `
      <div class="exercise-wrap">
        <p class="fm-instruction">
          ${selFile
            ? `<span class="fm-hint-sel">📂 Où ranger <strong>${selFile.name}${selFile.ext}</strong> ?</span>`
            : 'Clique un fichier pour le sélectionner, puis le bon dossier pour le ranger.'}
        </p>

        <div class="fm-layout">

          <!-- LEFT: downloads zone -->
          <div class="fm-panel fm-downloads-panel">
            <div class="fm-panel-header">
              <span>📥 Téléchargements</span>
              <span class="fm-badge">${unplaced.length}</span>
            </div>
            <div class="fm-files-list" id="fm-files">
              ${unplaced.length === 0
                ? `<div class="fm-empty">✅ Tout est rangé !<br>Clique sur Vérifier.</div>`
                : unplaced.map(f => `
                    <div class="fm-file ${this._selected === f.id ? 'fm-selected' : ''}" data-id="${f.id}">
                      <span class="fm-file-icon">${f.icon}</span>
                      <div class="fm-file-meta">
                        <div class="fm-file-name">${f.name}</div>
                        <div class="fm-file-ext">${f.ext}</div>
                      </div>
                      ${this._selected === f.id ? '<span class="fm-sel-arrow">→</span>' : ''}
                    </div>`).join('')}
            </div>
          </div>

          <!-- RIGHT: destination folders -->
          <div class="fm-panel fm-folders-panel">
            <div class="fm-panel-header">
              <span>📂 Mes dossiers</span>
            </div>
            <div class="fm-folders-grid" id="fm-folders">
              ${this._data.folders.map(folder => {
                const placed = this._files.filter(f => f.placedIn === folder.name);
                const isReady = this._selected !== null && !this._checked;
                const checkedItems = this._checked ? placed : [];
                return `
                  <div class="fm-folder ${isReady ? 'fm-folder-ready' : ''}"
                       data-folder="${folder.name}"
                       style="${isReady ? `--fcolor:${folder.color}` : ''}">
                    <div class="fm-folder-top">
                      <span class="fm-folder-icon">${folder.icon}</span>
                      <div>
                        <div class="fm-folder-name">${folder.name}</div>
                        <div class="fm-folder-count">${placed.length} fichier${placed.length !== 1 ? 's' : ''}</div>
                      </div>
                    </div>
                    ${checkedItems.length > 0 ? `
                      <div class="fm-folder-contents">
                        ${checkedItems.map(f => {
                          const ok = f.folder === folder.name;
                          return `<div class="fm-placed ${ok ? 'fm-ok' : 'fm-ko'}">${f.icon} ${f.name}${f.ext}</div>`;
                        }).join('')}
                      </div>` : ''}
                  </div>`;
              }).join('')}
            </div>
          </div>

        </div>

        ${allPlaced && !this._checked ? `
          <button class="btn-validate" id="btn-fm-check" style="background:${this._accent}">Vérifier ✓</button>
        ` : ''}

        <div id="fm-feedback" style="margin-top:14px"></div>
      </div>`;

    // Files click
    this._container.querySelectorAll('.fm-file').forEach(el => {
      el.addEventListener('click', () => {
        const id = +el.dataset.id;
        this._selected = (this._selected === id) ? null : id;
        this._render();
      });
    });

    // Folders click
    this._container.querySelectorAll('.fm-folder').forEach(el => {
      el.addEventListener('click', () => {
        if (this._selected === null || this._checked) return;
        const folderName = el.dataset.folder;
        const file = this._files.find(f => f.id === this._selected);
        if (file) {
          file.placedIn = folderName;
          App.sound(true);
          this._selected = null;
          this._render();
        }
      });
    });

    // Check button
    const checkBtn = this._container.querySelector('#btn-fm-check');
    if (checkBtn) checkBtn.addEventListener('click', () => this._check());
  },

  _check() {
    this._checked = true;
    let correct = 0;
    this._files.forEach(f => { if (f.placedIn === f.folder) correct++; });

    App.sound(correct === this._files.length);
    this._render();

    const fb = this._container.querySelector('#fm-feedback');
    fb.innerHTML = `
      <div class="quiz-explanation">
        ${correct === this._files.length
          ? '🎉 Parfait ! Tous les fichiers sont dans le bon dossier !'
          : `🔍 ${correct} / ${this._files.length} fichiers correctement rangés.
             Les fichiers en <span style="color:var(--wrong)">rouge</span> sont dans le mauvais dossier.`}
      </div>
      <button class="btn-next" style="background:${this._accent};margin-top:12px" id="btn-fm-done">
        Voir mon résultat
      </button>`;
    fb.querySelector('#btn-fm-done').addEventListener('click', () => {
      this._onComplete(correct, this._files.length);
    });
  }
};
