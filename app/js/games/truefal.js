/* True / False engine with optional countdown */
const TrueFalseGame = {
  _items: [],
  _current: 0,
  _score: 0,
  _container: null,
  _onComplete: null,
  _chrono: false,
  _seconds: 10,
  _timer: null,
  _timeLeft: 0,
  _answered: false,
  _accent: '#4361ee',

  start(container, data, onComplete, accent) {
    this._items = data.items.slice();
    this._current = 0;
    this._score = 0;
    this._answered = false;
    this._container = container;
    this._onComplete = onComplete;
    this._chrono = data.chrono || false;
    this._seconds = data.seconds || 10;
    this._accent = accent || '#4361ee';
    this._render();
  },

  _render() {
    const item = this._items[this._current];
    const total = this._items.length;
    const pct = (this._current / total) * 100;
    this._answered = false;

    this._container.innerHTML = `
      <div class="exercise-wrap">
        <div class="progress-bar">
          <div class="progress-bar-inner" style="width:${pct}%;background:${this._accent}"></div>
        </div>
        <p style="text-align:center;font-size:.8rem;color:var(--text-dim);margin-bottom:12px">
          ${this._current + 1} / ${total}
        </p>
        <div class="tf-statement" id="tf-statement">${item.statement}</div>
        ${this._chrono ? `<div class="tf-timer-bar"><div class="tf-timer-fill" id="tf-timer" style="width:100%"></div></div>` : ''}
        <div class="tf-buttons">
          <button class="tf-btn vrai" id="btn-vrai">✅ VRAI</button>
          <button class="tf-btn faux" id="btn-faux">❌ FAUX</button>
        </div>
        <div id="tf-feedback" style="margin-top:16px"></div>
      </div>`;

    this._container.querySelector('#btn-vrai').addEventListener('click', () => this._pick(true));
    this._container.querySelector('#btn-faux').addEventListener('click', () => this._pick(false));

    if (this._chrono) {
      this._timeLeft = this._seconds;
      this._startTimer();
    }
  },

  _startTimer() {
    clearInterval(this._timer);
    const fill = this._container.querySelector('#tf-timer');
    const tick = 100;
    const totalMs = this._seconds * 1000;
    let elapsed = 0;
    this._timer = setInterval(() => {
      if (this._answered) { clearInterval(this._timer); return; }
      elapsed += tick;
      const pct = Math.max(0, 100 - (elapsed / totalMs) * 100);
      if (fill) fill.style.width = pct + '%';
      if (elapsed >= totalMs) {
        clearInterval(this._timer);
        this._timeUp();
      }
    }, tick);
  },

  _timeUp() {
    if (this._answered) return;
    this._answered = true;
    clearInterval(this._timer);
    App.sound(false);
    this._showFeedback(null);
  },

  _pick(answer) {
    if (this._answered) return;
    this._answered = true;
    clearInterval(this._timer);

    const item = this._items[this._current];
    const correct = answer === item.answer;
    if (correct) this._score++;

    const btnV = this._container.querySelector('#btn-vrai');
    const btnF = this._container.querySelector('#btn-faux');
    [btnV, btnF].forEach(b => b.disabled = true);

    if (item.answer === true) { btnV.classList.add('correct'); btnF.classList.add('wrong'); }
    else { btnF.classList.add('correct'); btnV.classList.add('wrong'); }

    if (!correct) { btnV.classList.remove('correct'); btnF.classList.remove('correct'); }

    App.sound(correct);
    this._showFeedback(correct);
  },

  _showFeedback(correct) {
    const item = this._items[this._current];
    const fb = this._container.querySelector('#tf-feedback');
    const isLast = this._current + 1 >= this._items.length;
    const msg = correct === null
      ? '⏱️ Temps écoulé !'
      : correct ? '✅ Bonne réponse !' : '❌ Mauvaise réponse.';

    fb.innerHTML = `
      <div class="quiz-explanation">${msg} ${item.explanation}</div>
      <button class="btn-next" style="background:${this._accent}" id="btn-tf-next">
        ${isLast ? 'Voir mon résultat' : 'Suivant →'}
      </button>`;
    fb.querySelector('#btn-tf-next').addEventListener('click', () => this._next());
  },

  _next() {
    clearInterval(this._timer);
    this._current++;
    if (this._current < this._items.length) {
      this._render();
    } else {
      this._onComplete(this._score, this._items.length);
    }
  }
};
