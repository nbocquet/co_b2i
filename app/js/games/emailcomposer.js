/* Email Composer game — place address chips in À / Cc / Cci, pick Objet */
const EmailComposerGame = {
  _container: null,
  _onComplete: null,
  _data: null,
  _accent: '#8b5cf6',
  _scenarios: [],
  _current: 0,
  _score: 0,
  // per-scenario state
  _fields: { to: [], cc: [], bcc: [] },
  _pool: [],
  _selectedObjet: null,
  _activeChip: null, // id of chip awaiting field assignment

  start(container, data, onComplete, accent) {
    this._container = container;
    this._onComplete = onComplete;
    this._scenarios = data.scenarios;
    this._accent = accent || '#8b5cf6';
    this._current = 0;
    this._score = 0;
    this._loadScenario();
  },

  _loadScenario() {
    const sc = this._scenarios[this._current];
    this._fields = { to: [], cc: [], bcc: [] };
    this._selectedObjet = null;
    this._activeChip = null;
    this._pool = sc.addresses.map((a, i) => ({ ...a, id: i }));
    this._render();
  },

  _render() {
    const sc = this._scenarios[this._current];
    const total = this._scenarios.length;
    const pct = (this._current / total) * 100;
    const active = this._activeChip;

    this._container.innerHTML = `
      <div class="exercise-wrap">
        <div class="progress-bar">
          <div class="progress-bar-inner" style="width:${pct}%;background:${this._accent}"></div>
        </div>

        <!-- Scenario -->
        <div class="ec-scenario">
          <span class="ec-scenario-icon">📋</span>
          <p>${sc.situation}</p>
        </div>

        <!-- Compose window -->
        <div class="ec-window">
          <div class="ec-window-bar">
            <span class="ec-window-dot"></span><span class="ec-window-dot"></span><span class="ec-window-dot"></span>
            <span class="ec-window-title">Nouveau message</span>
          </div>

          <div class="ec-field-row">
            <span class="ec-field-label">De :</span>
            <span class="ec-field-fixed">toi@eduge.ch</span>
          </div>

          ${['to','cc','bcc'].map(f => {
            const labels = { to: 'À :', cc: 'Cc :', bcc: 'Cci :' };
            const chips = this._fields[f];
            return `
              <div class="ec-field-row ec-dropzone ${active !== null ? 'ec-drop-ready' : ''}" data-field="${f}">
                <span class="ec-field-label">${labels[f]}</span>
                <div class="ec-chips-in-field">
                  ${chips.map(chip => `
                    <span class="ec-chip ec-chip-placed" data-id="${chip.id}" data-from="${f}">
                      ${chip.label} <span class="ec-chip-addr">&lt;${chip.addr}&gt;</span>
                      <span class="ec-chip-remove">✕</span>
                    </span>`).join('')}
                  ${active !== null ? `<span class="ec-drop-hint">Cliquer ici pour mettre en ${labels[f].replace(' :','')}</span>` : ''}
                </div>
              </div>`;
          }).join('')}

          <div class="ec-field-row">
            <span class="ec-field-label">Objet :</span>
            <div class="ec-objet-choices">
              ${sc.objets.map((o, i) => `
                <label class="ec-objet-option ${this._selectedObjet === i ? 'ec-objet-selected' : ''}">
                  <input type="radio" name="objet" value="${i}" ${this._selectedObjet === i ? 'checked' : ''}>
                  ${o.text}
                </label>`).join('')}
            </div>
          </div>
        </div>

        <!-- Address pool -->
        <div class="ec-pool-label">Adresses disponibles — clique pour placer :</div>
        <div class="ec-pool" id="ec-pool">
          ${this._pool.map(chip => `
            <span class="ec-chip ${active === chip.id ? 'ec-chip-active' : ''}" data-id="${chip.id}">
              ${chip.label} <span class="ec-chip-addr">&lt;${chip.addr}&gt;</span>
            </span>`).join('')}
          ${this._pool.length === 0 ? '<span style="color:var(--text-dim);font-size:.85rem">Toutes les adresses sont placées.</span>' : ''}
        </div>

        <button class="btn-validate" id="btn-ec-send" style="background:${this._accent}">
          ✈️ Envoyer
        </button>
        <div id="ec-feedback" style="margin-top:14px"></div>
      </div>`;

    // Pool chip click → select / deselect
    this._container.querySelectorAll('#ec-pool .ec-chip').forEach(el => {
      el.addEventListener('click', () => {
        const id = +el.dataset.id;
        this._activeChip = (this._activeChip === id) ? null : id;
        this._render();
      });
    });

    // Drop zone click → place selected chip
    this._container.querySelectorAll('.ec-dropzone').forEach(el => {
      el.addEventListener('click', (e) => {
        if (this._activeChip === null) return;
        if (e.target.classList.contains('ec-chip-remove')) return;
        const field = el.dataset.field;
        const chip = this._pool.find(c => c.id === this._activeChip);
        if (!chip) return;
        this._pool = this._pool.filter(c => c.id !== this._activeChip);
        this._fields[field].push(chip);
        this._activeChip = null;
        this._render();
      });
    });

    // Remove chip from field → back to pool
    this._container.querySelectorAll('.ec-chip-placed .ec-chip-remove').forEach(el => {
      el.addEventListener('click', (e) => {
        e.stopPropagation();
        const chipEl = el.closest('.ec-chip-placed');
        const id = +chipEl.dataset.id;
        const fromField = chipEl.dataset.from;
        const chip = this._fields[fromField].find(c => c.id === id);
        if (!chip) return;
        this._fields[fromField] = this._fields[fromField].filter(c => c.id !== id);
        this._pool.push(chip);
        this._render();
      });
    });

    // Objet selection
    this._container.querySelectorAll('input[name=objet]').forEach(inp => {
      inp.addEventListener('change', () => {
        this._selectedObjet = +inp.value;
        this._container.querySelectorAll('.ec-objet-option').forEach((opt, i) => {
          opt.classList.toggle('ec-objet-selected', i === this._selectedObjet);
        });
      });
    });

    // Send button
    this._container.querySelector('#btn-ec-send').addEventListener('click', () => this._validate());
  },

  _validate() {
    const sc = this._scenarios[this._current];
    let points = 0, maxPoints = 0;
    const msgs = [];

    // Check each address placement
    sc.addresses.forEach(addr => {
      maxPoints++;
      const placed = this._fields.to.find(c => c.addr === addr.addr) ? 'to'
        : this._fields.cc.find(c => c.addr === addr.addr) ? 'cc'
        : this._fields.bcc.find(c => c.addr === addr.addr) ? 'bcc'
        : 'none';
      const ok = placed === addr.field;
      if (ok) points++;
      const fieldName = { to: 'À', cc: 'Cc', bcc: 'Cci', none: 'hors de l\'e-mail' };
      msgs.push(`${ok ? '✅' : '❌'} <strong>${addr.label}</strong> (${addr.addr}) → devait être en <em>${fieldName[addr.field]}</em>${ok ? '' : `, placé en <em>${fieldName[placed]}</em>`}`);
    });

    // Check objet
    maxPoints++;
    const objetOk = this._selectedObjet !== null && sc.objets[this._selectedObjet].correct;
    if (objetOk) points++;
    msgs.push(`${objetOk ? '✅' : '❌'} <strong>Objet</strong> : ${this._selectedObjet !== null ? sc.objets[this._selectedObjet].text : '(non sélectionné)'}`);

    if (points === maxPoints) this._score++;
    App.sound(points === maxPoints);

    const fb = this._container.querySelector('#ec-feedback');
    const isLast = this._current + 1 >= this._scenarios.length;
    fb.innerHTML = `
      <div class="quiz-explanation">
        ${points === maxPoints ? '🎉 Parfait !' : `🔍 ${points}/${maxPoints} éléments corrects.`}<br><br>
        ${msgs.join('<br>')}
      </div>
      <button class="btn-next" style="background:${this._accent};margin-top:14px" id="btn-ec-next">
        ${isLast ? 'Voir mon résultat' : 'Scénario suivant →'}
      </button>`;

    this._container.querySelector('#btn-ec-send').disabled = true;
    this._container.querySelector('#btn-ec-next').addEventListener('click', () => {
      this._current++;
      if (this._current < this._scenarios.length) this._loadScenario();
      else this._onComplete(this._score, this._scenarios.length);
    });
  }
};
