/* File Manager game — drag-and-drop (mouse + touch) files into OS folders */
const FileManagerGame = {
  _container: null,
  _onComplete: null,
  _data: null,
  _accent: '#84cc16',
  _files: [],
  _checked: false,
  _dragId: null,
  _ghost: null,

  _extIcon(ext) {
    return ({
      '.docx': '📄', '.odt': '📄', '.pdf': '📋', '.txt': '📝',
      '.jpg': '🖼️', '.png': '🖼️', '.gif': '🖼️', '.svg': '🖼️',
      '.mp3': '🎵', '.wav': '🎵', '.ogg': '🎵',
      '.mp4': '🎬', '.avi': '🎬', '.odp': '📑', '.pptx': '📑'
    })[ext] || '📄';
  },

  start(container, data, onComplete, accent) {
    this._container = container;
    this._onComplete = onComplete;
    this._data = data;
    this._accent = accent || '#84cc16';
    this._checked = false;
    this._dragId = null;
    this._ghost = null;
    this._files = data.files.map((f, i) => ({
      ...f, id: i, placedIn: null, icon: this._extIcon(f.ext)
    }));
    for (let i = this._files.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this._files[i], this._files[j]] = [this._files[j], this._files[i]];
    }
    this._render();
  },

  // ── Render ──────────────────────────────────────────────────────
  _render() {
    const unplaced = this._files.filter(f => f.placedIn === null);
    const allPlaced = unplaced.length === 0;

    this._container.innerHTML = `
      <div class="exercise-wrap">
        <p class="fm-instruction">Glisse chaque fichier dans le bon dossier.</p>

        <div class="fm-layout">

          <div class="fm-panel fm-downloads-panel">
            <div class="fm-panel-header">
              <span>📥 Téléchargements</span>
              <span class="fm-badge" style="background:${this._accent}">${unplaced.length}</span>
            </div>
            <div class="fm-files-list" id="fm-files">
              ${unplaced.length === 0
                ? `<div class="fm-empty">✅ Tout est rangé !<br>Clique sur Vérifier.</div>`
                : unplaced.map(f => `
                    <div class="fm-file" data-id="${f.id}" draggable="true">
                      <span class="fm-file-icon">${f.icon}</span>
                      <div class="fm-file-meta">
                        <div class="fm-file-name">${f.name}</div>
                        <div class="fm-file-ext">${f.ext}</div>
                      </div>
                      <span class="fm-drag-handle">⠿</span>
                    </div>`).join('')}
            </div>
          </div>

          <div class="fm-panel fm-folders-panel">
            <div class="fm-panel-header"><span>📂 Mes dossiers</span></div>
            <div class="fm-folders-grid" id="fm-folders">
              ${this._data.folders.map(folder => {
                const placed = this._files.filter(f => f.placedIn === folder.name);
                return `
                  <div class="fm-folder" data-folder="${folder.name}" style="--fcolor:${folder.color}">
                    <div class="fm-folder-top">
                      <span class="fm-folder-icon">${folder.icon}</span>
                      <div>
                        <div class="fm-folder-name">${folder.name}</div>
                        <div class="fm-folder-count">${placed.length} fichier${placed.length !== 1 ? 's' : ''}</div>
                      </div>
                    </div>
                    ${this._checked && placed.length > 0 ? `
                      <div class="fm-folder-contents">
                        ${placed.map(f => {
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

    this._bindFileEvents();
    this._bindFolderEvents();
    const checkBtn = this._container.querySelector('#btn-fm-check');
    if (checkBtn) checkBtn.addEventListener('click', () => this._check());
  },

  // ── File event binding ──────────────────────────────────────────
  _bindFileEvents() {
    this._container.querySelectorAll('.fm-file').forEach(el => {
      const id = +el.dataset.id;
      const file = this._files.find(f => f.id === id);

      // Mouse drag
      el.addEventListener('dragstart', e => {
        this._dragId = id;
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/plain', id);
        setTimeout(() => el.classList.add('fm-dragging'), 0);
      });
      el.addEventListener('dragend', () => {
        el.classList.remove('fm-dragging');
        this._dragId = null;
      });

      // Touch drag
      el.addEventListener('touchstart', e => {
        this._dragId = id;
        const touch = e.touches[0];
        this._createGhost(file, touch.clientX, touch.clientY);
        el.classList.add('fm-dragging');
      }, { passive: true });

      el.addEventListener('touchmove', e => {
        e.preventDefault();
        if (!this._ghost) return;
        const touch = e.touches[0];
        this._moveGhost(touch.clientX, touch.clientY);
        this._highlightFolderAt(touch.clientX, touch.clientY);
      }, { passive: false });

      el.addEventListener('touchend', e => {
        el.classList.remove('fm-dragging');
        if (!this._ghost) return;
        const touch = e.changedTouches[0];
        this._removeGhost();
        this._clearFolderHighlights();
        const folderEl = this._folderAt(touch.clientX, touch.clientY);
        if (folderEl) this._dropOnFolder(folderEl.dataset.folder);
        else this._dragId = null;
      }, { passive: true });
    });
  },

  // ── Folder event binding ────────────────────────────────────────
  _bindFolderEvents() {
    this._container.querySelectorAll('.fm-folder').forEach(el => {
      const name = el.dataset.folder;

      el.addEventListener('dragover', e => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        el.classList.add('fm-drag-over');
      });
      el.addEventListener('dragleave', e => {
        if (!el.contains(e.relatedTarget)) el.classList.remove('fm-drag-over');
      });
      el.addEventListener('drop', e => {
        e.preventDefault();
        el.classList.remove('fm-drag-over');
        this._dropOnFolder(name);
      });
    });
  },

  // ── Drop logic ──────────────────────────────────────────────────
  _dropOnFolder(folderName) {
    if (this._dragId === null || this._checked) return;
    const file = this._files.find(f => f.id === this._dragId);
    if (!file) return;
    file.placedIn = folderName;
    App.sound(true);
    this._dragId = null;
    this._render();
  },

  // ── Ghost (touch feedback) ──────────────────────────────────────
  _createGhost(file, x, y) {
    this._removeGhost();
    const g = document.createElement('div');
    g.className = 'fm-ghost';
    g.innerHTML = `<span>${file.icon}</span><span>${file.name}${file.ext}</span>`;
    g.style.left = (x - 80) + 'px';
    g.style.top  = (y - 28) + 'px';
    document.body.appendChild(g);
    this._ghost = g;
  },

  _moveGhost(x, y) {
    if (!this._ghost) return;
    this._ghost.style.left = (x - 80) + 'px';
    this._ghost.style.top  = (y - 28) + 'px';
  },

  _removeGhost() {
    if (this._ghost) { this._ghost.remove(); this._ghost = null; }
  },

  // ── Touch hit-testing ───────────────────────────────────────────
  _folderAt(x, y) {
    // Ghost has pointer-events:none so elementFromPoint looks through it
    const el = document.elementFromPoint(x, y);
    return el && el.closest('.fm-folder');
  },

  _highlightFolderAt(x, y) {
    this._clearFolderHighlights();
    const el = this._folderAt(x, y);
    if (el) el.classList.add('fm-drag-over');
  },

  _clearFolderHighlights() {
    this._container.querySelectorAll('.fm-folder.fm-drag-over')
      .forEach(el => el.classList.remove('fm-drag-over'));
  },

  // ── Check ────────────────────────────────────────────────────────
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
             Les fichiers en <span style="color:var(--wrong)">rouge</span> sont mal placés.`}
      </div>
      <button class="btn-next" style="background:${this._accent};margin-top:12px" id="btn-fm-done">
        Voir mon résultat
      </button>`;
    fb.querySelector('#btn-fm-done').addEventListener('click', () => {
      this._onComplete(correct, this._files.length);
    });
  }
};
