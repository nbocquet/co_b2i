/* MetaViewer — file-properties panels + quiz questions that reference them */
const MetaViewerGame = {
  _questions: [],
  _current: 0,
  _score: 0,
  _answered: false,
  _container: null,
  _onComplete: null,
  _accent: '#84cc16',
  _files: [],

  start(container, data, onComplete, accent) {
    this._questions = data.questions.slice();
    this._files = data.files;
    this._current = 0;
    this._score = 0;
    this._answered = false;
    this._container = container;
    this._onComplete = onComplete;
    this._accent = accent || '#84cc16';
    this._render();
  },

  _renderPanels(activeFile) {
    return `<div class="mv-files">
      ${this._files.map((f, fi) => `
        <div class="mv-file-card${fi === activeFile ? ' mv-file-active' : ''}" id="mv-file-${fi}">
          <div class="mv-file-header">
            <span class="mv-file-icon">${f.icon}</span>
            <div>
              <div class="mv-file-name">${f.name}</div>
              <span class="mv-file-badge">${f.typeLabel}</span>
            </div>
          </div>
          <table class="mv-fields">
            ${f.fields.map(field => `
              <tr data-label="${field.label}">
                <td class="mv-field-label">${field.label}</td>
                <td class="mv-field-value">${field.value}</td>
              </tr>`).join('')}
          </table>
        </div>`).join('')}
    </div>`;
  },

  _render() {
    const q = this._questions[this._current];
    const total = this._questions.length;
    const pct = (this._current / total) * 100;
    const activeFile = typeof q.file === 'number' ? q.file : undefined;

    this._container.innerHTML = `
      <div class="exercise-wrap mv-wrap">
        ${this._renderPanels(activeFile)}

        <div class="mv-quiz-section">
          <div class="progress-bar">
            <div class="progress-bar-inner" style="width:${pct}%;background:${this._accent}"></div>
          </div>
          <p style="text-align:center;font-size:.8rem;color:var(--text-dim);margin-bottom:16px">
            Question ${this._current + 1} / ${total}
          </p>
          <p class="quiz-question">${q.q}</p>
          <div class="quiz-answers" id="mv-answers"></div>
          <div id="mv-feedback"></div>
        </div>
      </div>`;

    const grid = this._container.querySelector('#mv-answers');
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

    if (q.highlight !== undefined && typeof q.file === 'number') {
      const card = this._container.querySelector(`#mv-file-${q.file}`);
      if (card) {
        const row = card.querySelector(`tr[data-label="${q.highlight}"]`);
        if (row) row.classList.add('mv-highlight');
      }
    }

    const fb = this._container.querySelector('#mv-feedback');
    fb.innerHTML = `<div class="quiz-explanation">${correct ? '✅ ' : '❌ '} ${q.explanation}</div>
      <button class="btn-next" style="background:${this._accent}" id="btn-mv-next">
        ${this._current + 1 < this._questions.length ? 'Question suivante →' : 'Voir mon résultat'}
      </button>`;
    fb.querySelector('#btn-mv-next').addEventListener('click', () => this._next());
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
