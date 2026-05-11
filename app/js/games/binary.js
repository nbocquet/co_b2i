/* Binary game — click bits to reach target decimal number */
const BinaryGame = {
  _rounds: [],
  _current: 0,
  _score: 0,
  _bits: [],
  _container: null,
  _onComplete: null,
  _accent: '#4361ee',
  _values: [128, 64, 32, 16, 8, 4, 2, 1],

  start(container, data, onComplete, accent) {
    this._rounds = data.rounds.slice();
    this._current = 0;
    this._score = 0;
    this._container = container;
    this._onComplete = onComplete;
    this._accent = accent || '#4361ee';
    this._bits = [0, 0, 0, 0, 0, 0, 0, 0];
    this._render();
  },

  _currentValue() {
    return this._bits.reduce((sum, b, i) => sum + b * this._values[i], 0);
  },

  _render() {
    const target = this._rounds[this._current];
    const total = this._rounds.length;
    const pct = (this._current / total) * 100;
    this._bits = [0, 0, 0, 0, 0, 0, 0, 0];

    this._container.innerHTML = `
      <div class="exercise-wrap">
        <div class="progress-bar">
          <div class="progress-bar-inner" style="width:${pct}%;background:${this._accent}"></div>
        </div>
        <p style="text-align:center;font-size:.8rem;color:var(--text-dim);margin-bottom:12px">
          Niveau ${this._current + 1} / ${total}
        </p>

        <div class="binary-target">
          <div class="target-label">Représente ce nombre en binaire :</div>
          <div class="target-number" id="target-num">${target}</div>
          <div class="target-hint">Clique sur les cases pour activer (1) ou désactiver (0) chaque bit</div>
        </div>

        <div class="binary-bits" id="bits-row"></div>

        <div class="binary-current">
          <div class="current-label">Valeur actuelle :</div>
          <div class="current-value" id="current-val">0</div>
        </div>

        <button class="btn-validate" id="btn-binary-validate" style="background:${this._accent}">Valider</button>

        <div style="text-align:center;font-size:.8rem;color:var(--text-dim);margin-bottom:12px">Historique</div>
        <div class="binary-history" id="binary-history"></div>
      </div>`;

    this._renderBits();
    this._container.querySelector('#btn-binary-validate').addEventListener('click', () => this._validate());
  },

  _renderBits() {
    const row = this._container.querySelector('#bits-row');
    row.innerHTML = '';
    this._values.forEach((val, i) => {
      const btn = document.createElement('div');
      btn.className = 'bit-btn' + (this._bits[i] ? ' on' : '');
      btn.innerHTML = `<div class="bit-value">${val}</div><div class="bit-cell">${this._bits[i]}</div>`;
      btn.addEventListener('click', () => {
        this._bits[i] = this._bits[i] ? 0 : 1;
        this._renderBits();
        this._updateCurrentVal();
      });
      row.appendChild(btn);
    });
  },

  _updateCurrentVal() {
    const target = this._rounds[this._current];
    const cur = this._currentValue();
    const el = this._container.querySelector('#current-val');
    if (el) {
      el.textContent = cur;
      el.className = 'current-value';
    }
  },

  _validate() {
    const target = this._rounds[this._current];
    const cur = this._currentValue();
    const correct = cur === target;
    if (correct) this._score++;

    App.sound(correct);

    const history = this._container.querySelector('#binary-history');
    if (history) {
      const badge = document.createElement('span');
      badge.className = 'history-badge ' + (correct ? 'ok' : 'ko');
      badge.textContent = correct ? `${target} ✓` : `${target} ✗`;
      history.appendChild(badge);
    }

    const valEl = this._container.querySelector('#current-val');
    if (valEl) {
      valEl.className = 'current-value ' + (correct ? 'correct-val' : 'wrong-val');
    }

    if (!correct) {
      const bitsRow = this._container.querySelector('#bits-row');
      if (bitsRow) bitsRow.classList.add('shake');
      setTimeout(() => {
        if (bitsRow) bitsRow.classList.remove('shake');
        this._showCorrectBits(target);
      }, 500);
    }

    const btn = this._container.querySelector('#btn-binary-validate');
    if (btn) btn.disabled = true;

    setTimeout(() => {
      this._current++;
      if (this._current < this._rounds.length) {
        this._render();
      } else {
        this._onComplete(this._score, this._rounds.length);
      }
    }, correct ? 900 : 1800);
  },

  _showCorrectBits(target) {
    let remaining = target;
    const correct = this._values.map(v => {
      if (remaining >= v) { remaining -= v; return 1; }
      return 0;
    });
    const btns = this._container.querySelectorAll('.bit-btn');
    btns.forEach((btn, i) => {
      btn.querySelector('.bit-cell').textContent = correct[i];
      btn.className = 'bit-btn' + (correct[i] ? ' on' : '');
    });
  }
};
