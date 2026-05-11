/* Quiz engine — multiple choice, 4 answers */
const QuizGame = {
  _questions: [],
  _current: 0,
  _score: 0,
  _answered: false,
  _container: null,
  _onComplete: null,
  _accent: '#4361ee',

  start(container, data, onComplete, accent) {
    this._questions = data.questions.slice();
    this._current = 0;
    this._score = 0;
    this._answered = false;
    this._container = container;
    this._onComplete = onComplete;
    this._accent = accent || '#4361ee';
    this._render();
  },

  _render() {
    const q = this._questions[this._current];
    const total = this._questions.length;
    const pct = (this._current / total) * 100;

    this._container.innerHTML = `
      <div class="exercise-wrap">
        <div class="progress-bar">
          <div class="progress-bar-inner" style="width:${pct}%;background:${this._accent}"></div>
        </div>
        <p style="text-align:center;font-size:.8rem;color:var(--text-dim);margin-bottom:16px">
          Question ${this._current + 1} / ${total}
        </p>
        <p class="quiz-question">${q.q}</p>
        <div class="quiz-answers" id="quiz-answers"></div>
        <div id="quiz-feedback"></div>
      </div>`;

    const grid = this._container.querySelector('#quiz-answers');
    q.answers.forEach((ans, i) => {
      const btn = document.createElement('button');
      btn.className = 'quiz-btn';
      btn.textContent = ans;
      btn.addEventListener('click', () => this._pick(i));
      grid.appendChild(btn);
    });
  },

  _pick(index) {
    if (this._answered) return;
    this._answered = true;

    const q = this._questions[this._current];
    const correct = index === q.correct;
    if (correct) this._score++;

    const btns = this._container.querySelectorAll('.quiz-btn');
    btns.forEach((btn, i) => {
      btn.disabled = true;
      if (i === q.correct) btn.classList.add('correct');
      else if (i === index && !correct) btn.classList.add('wrong');
    });

    App.sound(correct);

    const fb = this._container.querySelector('#quiz-feedback');
    fb.innerHTML = `<div class="quiz-explanation">${correct ? '✅ ' : '❌ '} ${q.explanation}</div>
      <button class="btn-next" style="background:${this._accent}" id="btn-quiz-next">
        ${this._current + 1 < this._questions.length ? 'Question suivante →' : 'Voir mon résultat'}
      </button>`;
    fb.querySelector('#btn-quiz-next').addEventListener('click', () => this._next());
  },

  _next() {
    this._current++;
    this._answered = false;
    if (this._current < this._questions.length) {
      this._render();
    } else {
      this._onComplete(this._score, this._questions.length);
    }
  }
};
