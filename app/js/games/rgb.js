/* RGB mixer game — sliders to match target colors */
const RGBGame = {
  _targets: [],
  _current: 0,
  _score: 0,
  _container: null,
  _onComplete: null,
  _accent: '#4361ee',

  start(container, data, onComplete, accent) {
    this._targets = data.targets.slice();
    this._current = 0;
    this._score = 0;
    this._container = container;
    this._onComplete = onComplete;
    this._accent = accent || '#4361ee';
    this._render();
  },

  _render() {
    const target = this._targets[this._current];
    const total = this._targets.length;
    const pct = (this._current / total) * 100;

    this._container.innerHTML = `
      <div class="exercise-wrap">
        <div class="progress-bar">
          <div class="progress-bar-inner" style="width:${pct}%;background:${this._accent}"></div>
        </div>
        <p style="text-align:center;font-size:.8rem;color:var(--text-dim);margin-bottom:12px">
          Couleur ${this._current + 1} / ${total}
        </p>

        <div style="text-align:center;margin-bottom:8px;font-size:.85rem;color:var(--text-dim)">Couleur cible :</div>
        <div style="display:flex;gap:16px;align-items:center;justify-content:center;margin-bottom:20px">
          <div class="rgb-target-swatch" style="background:rgb(${target.r},${target.g},${target.b});width:100px;height:80px;margin:0"></div>
          <div style="font-size:1.1rem;font-weight:700;color:var(--text)">${target.name}</div>
        </div>

        <div style="text-align:center;font-size:.85rem;color:var(--text-dim);margin-bottom:12px">Ton mélange :</div>
        <div class="rgb-mix-preview" id="mix-preview" style="background:rgb(0,0,0)"></div>

        <div class="rgb-sliders">
          <div class="rgb-slider-row">
            <label class="label-r">R</label>
            <input type="range" id="sl-r" class="slider-r" min="0" max="255" value="0">
            <span class="val" id="val-r">0</span>
          </div>
          <div class="rgb-slider-row">
            <label class="label-v">V</label>
            <input type="range" id="sl-v" class="slider-v" min="0" max="255" value="0">
            <span class="val" id="val-v">0</span>
          </div>
          <div class="rgb-slider-row">
            <label class="label-b">B</label>
            <input type="range" id="sl-b" class="slider-b" min="0" max="255" value="0">
            <span class="val" id="val-b">0</span>
          </div>
        </div>

        <div class="rgb-score-bar">
          <div class="rgb-score-label">Précision :</div>
          <div class="rgb-score-value" id="rgb-prec">0%</div>
        </div>

        <button class="btn-validate" id="btn-rgb-validate" style="background:${this._accent}">Valider mon mélange</button>
        <div id="rgb-feedback" style="margin-top:14px"></div>
      </div>`;

    ['r', 'v', 'b'].forEach(ch => {
      this._container.querySelector(`#sl-${ch}`).addEventListener('input', () => this._update());
    });
    this._container.querySelector('#btn-rgb-validate').addEventListener('click', () => this._validate());
  },

  _update() {
    const r = +this._container.querySelector('#sl-r').value;
    const g = +this._container.querySelector('#sl-v').value;
    const b = +this._container.querySelector('#sl-b').value;

    this._container.querySelector('#val-r').textContent = r;
    this._container.querySelector('#val-v').textContent = g;
    this._container.querySelector('#val-b').textContent = b;
    this._container.querySelector('#mix-preview').style.background = `rgb(${r},${g},${b})`;

    const prec = this._precision(r, g, b);
    const precEl = this._container.querySelector('#rgb-prec');
    precEl.textContent = prec + '%';
    if (prec >= 95) precEl.style.color = 'var(--correct)';
    else if (prec >= 70) precEl.style.color = 'var(--warn)';
    else precEl.style.color = 'var(--wrong)';
  },

  _precision(r, g, b) {
    const target = this._targets[this._current];
    const dist = Math.sqrt(
      Math.pow(r - target.r, 2) +
      Math.pow(g - target.g, 2) +
      Math.pow(b - target.b, 2)
    );
    const maxDist = Math.sqrt(3 * Math.pow(255, 2));
    return Math.round((1 - dist / maxDist) * 100);
  },

  _validate() {
    const r = +this._container.querySelector('#sl-r').value;
    const g = +this._container.querySelector('#sl-v').value;
    const b = +this._container.querySelector('#sl-b').value;
    const target = this._targets[this._current];
    const prec = this._precision(r, g, b);

    const correct = prec >= 90;
    if (correct) this._score++;
    App.sound(correct);

    const btn = this._container.querySelector('#btn-rgb-validate');
    btn.disabled = true;

    const fb = this._container.querySelector('#rgb-feedback');
    const isLast = this._current + 1 >= this._targets.length;
    fb.innerHTML = `
      <div class="quiz-explanation">
        ${correct ? '🎨 Excellent !' : `🔍 La bonne réponse était : RVB(${target.r}, ${target.g}, ${target.b})`}
        Précision : ${prec}% — Code exact : <strong>RVB(${target.r}, ${target.g}, ${target.b})</strong>
      </div>
      <button class="btn-next" style="background:${this._accent};margin-top:12px" id="btn-rgb-next">
        ${isLast ? 'Voir mon résultat' : 'Couleur suivante →'}
      </button>`;
    fb.querySelector('#btn-rgb-next').addEventListener('click', () => {
      this._current++;
      if (this._current < this._targets.length) {
        this._render();
      } else {
        this._onComplete(this._score, this._targets.length);
      }
    });
  }
};
