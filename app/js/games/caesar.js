/* Caesar cipher game — encode mode + decode challenges */
const CaesarGame = {
  _challenges: [],
  _current: 0,
  _score: 0,
  _mode: 'encode',
  _container: null,
  _onComplete: null,
  _accent: '#4361ee',

  start(container, data, onComplete, accent) {
    this._challenges = data.challenges.slice();
    this._current = 0;
    this._score = 0;
    this._mode = 'encode';
    this._container = container;
    this._onComplete = onComplete;
    this._accent = accent || '#4361ee';
    this._renderMain();
  },

  _cipher(text, shift, encode) {
    return text.toUpperCase().split('').map(ch => {
      if (ch < 'A' || ch > 'Z') return ch;
      const base = 65;
      const code = ch.charCodeAt(0) - base;
      const shifted = encode
        ? (code + shift) % 26
        : (code - shift + 26) % 26;
      return String.fromCharCode(shifted + base);
    }).join('');
  },

  _renderMain() {
    this._container.innerHTML = `
      <div class="exercise-wrap">
        <div class="caesar-mode-tabs">
          <button class="caesar-tab ${this._mode === 'encode' ? 'active' : ''}" id="tab-encode" style="${this._mode === 'encode' ? 'background:' + this._accent : ''}">✏️ Chiffrer</button>
          <button class="caesar-tab ${this._mode === 'decode' ? 'active' : ''}" id="tab-decode" style="${this._mode === 'decode' ? 'background:' + this._accent : ''}">🔓 Déchiffrer</button>
        </div>
        <div id="caesar-content"></div>
      </div>`;

    this._container.querySelector('#tab-encode').addEventListener('click', () => { this._mode = 'encode'; this._renderMain(); });
    this._container.querySelector('#tab-decode').addEventListener('click', () => { this._mode = 'decode'; this._current = 0; this._score = 0; this._renderMain(); });

    if (this._mode === 'encode') this._renderEncodeMode();
    else this._renderDecodeChallenge();
  },

  _renderEncodeMode() {
    const content = this._container.querySelector('#caesar-content');
    content.innerHTML = `
      <div class="caesar-input-area">
        <label>Ton message :</label>
        <textarea id="caesar-text" rows="3" placeholder="Écris ton message ici..."
          style="text-transform:uppercase">BONJOUR</textarea>
      </div>

      <div class="caesar-shift-row">
        <label>Décalage :</label>
        <input type="range" id="caesar-shift" min="1" max="25" value="3">
        <span class="shift-val" id="shift-display">3</span>
      </div>

      <div style="margin-bottom:8px;font-size:.85rem;color:var(--text-dim)">Message chiffré :</div>
      <div class="caesar-output" id="caesar-out">ERQMRXU</div>

      <div style="font-size:.8rem;color:var(--text-dim);text-align:center;margin-bottom:8px">
        Alphabet : <span id="alpha-display" style="font-family:'Courier New',monospace;letter-spacing:.05em"></span>
      </div>
      <div style="font-size:.8rem;color:var(--accent,#4361ee);text-align:center;margin-bottom:20px">
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;→ <span id="alpha-shifted" style="font-family:'Courier New',monospace;letter-spacing:.05em"></span>
      </div>

      <button class="btn-validate" style="background:${this._accent}" id="btn-decode-mode">
        🔓 Essaie de déchiffrer maintenant
      </button>`;

    const update = () => {
      const text = content.querySelector('#caesar-text').value;
      const shift = +content.querySelector('#caesar-shift').value;
      content.querySelector('#shift-display').textContent = shift;
      content.querySelector('#caesar-out').textContent = this._cipher(text, shift, true);
      const alpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      content.querySelector('#alpha-display').textContent = alpha;
      content.querySelector('#alpha-shifted').textContent = alpha.split('').map(c => this._cipher(c, shift, true)).join('');
    };

    content.querySelector('#caesar-text').addEventListener('input', update);
    content.querySelector('#caesar-shift').addEventListener('input', update);
    content.querySelector('#btn-decode-mode').addEventListener('click', () => { this._mode = 'decode'; this._current = 0; this._score = 0; this._renderMain(); });
    update();
  },

  _renderDecodeChallenge() {
    const content = this._container.querySelector('#caesar-content');
    const ch = this._challenges[this._current];
    const total = this._challenges.length;

    content.innerHTML = `
      <div class="caesar-decode-challenge">
        <div class="challenge-label">Défi ${this._current + 1}/${total} — Déchiffre ce message :</div>
        <div class="encoded-msg">${ch.encoded}</div>
      </div>

      <div class="caesar-shift-row">
        <label>Décalage :</label>
        <input type="range" id="dec-shift" min="1" max="25" value="1">
        <span class="shift-val" id="dec-shift-val" style="color:${this._accent}">1</span>
      </div>

      <div style="margin-bottom:8px;font-size:.85rem;color:var(--text-dim)">Message déchiffré :</div>
      <div class="caesar-output" id="dec-out" style="font-size:1.1rem;font-weight:700"></div>

      <button class="btn-validate" style="background:${this._accent}" id="btn-dec-validate">Valider ✓</button>
      <div id="dec-feedback" style="margin-top:14px"></div>`;

    const update = () => {
      const shift = +content.querySelector('#dec-shift').value;
      content.querySelector('#dec-shift-val').textContent = shift;
      content.querySelector('#dec-out').textContent = this._cipher(ch.encoded, shift, false);
    };

    content.querySelector('#dec-shift').addEventListener('input', update);
    content.querySelector('#btn-dec-validate').addEventListener('click', () => {
      const shift = +content.querySelector('#dec-shift').value;
      const decoded = this._cipher(ch.encoded, shift, false);
      const correct = shift === ch.shift;
      if (correct) this._score++;
      App.sound(correct);

      content.querySelector('#dec-shift').disabled = true;
      content.querySelector('#btn-dec-validate').disabled = true;

      const isLast = this._current + 1 >= this._challenges.length;
      const fb = content.querySelector('#dec-feedback');
      fb.innerHTML = `
        <div class="quiz-explanation">
          ${correct ? '🔓 Bravo ! Le décalage était bien ' + ch.shift + '.' : `❌ Le bon décalage était ${ch.shift}. Le message disait : <strong>${ch.decoded}</strong>`}
        </div>
        <button class="btn-next" style="background:${this._accent};margin-top:12px" id="btn-dec-next">
          ${isLast ? 'Voir mon résultat' : 'Défi suivant →'}
        </button>`;
      fb.querySelector('#btn-dec-next').addEventListener('click', () => {
        this._current++;
        if (this._current < this._challenges.length) {
          this._renderDecodeChallenge();
        } else {
          this._onComplete(this._score, this._challenges.length);
        }
      });
    });
    update();
  }
};
