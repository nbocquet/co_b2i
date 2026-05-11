/* Email Router game — choose the right action for each received email */
const EmailRouterGame = {
  _container: null,
  _onComplete: null,
  _scenarios: [],
  _current: 0,
  _score: 0,
  _accent: '#8b5cf6',

  start(container, data, onComplete, accent) {
    this._container = container;
    this._onComplete = onComplete;
    this._scenarios = data.scenarios;
    this._current = 0;
    this._score = 0;
    this._accent = accent || '#8b5cf6';
    this._render();
  },

  _render() {
    const sc = this._scenarios[this._current];
    const total = this._scenarios.length;
    const pct = (this._current / total) * 100;
    const { email, question, actions } = sc;

    this._container.innerHTML = `
      <div class="exercise-wrap">
        <div class="progress-bar">
          <div class="progress-bar-inner" style="width:${pct}%;background:${this._accent}"></div>
        </div>
        <p style="text-align:center;font-size:.8rem;color:var(--text-dim);margin-bottom:14px">
          Situation ${this._current + 1} / ${total}
        </p>

        <!-- Received email display -->
        <div class="ph-email-card" style="margin-bottom:20px">
          <div class="ph-email-header">
            <div class="ph-avatar" style="background:#6366f1">${email.fromLabel[0].toUpperCase()}</div>
            <div class="ph-meta">
              <div class="ph-from">
                <strong>${email.fromLabel}</strong>
                <span class="ph-addr">&lt;${email.from}&gt;</span>
              </div>
              <div class="ph-to-line">À : ${email.toLabel}</div>
            </div>
          </div>
          <div class="ph-subject">${email.subject}</div>
          <div class="ph-body">${email.body.replace(/\n/g, '<br>')}</div>
        </div>

        <!-- Question -->
        <p class="er-question">${question}</p>

        <!-- Action buttons -->
        <div class="er-actions" id="er-actions">
          ${actions.map((a, i) => `
            <button class="er-btn" data-idx="${i}">${a.label}</button>`).join('')}
        </div>

        <div id="er-feedback" style="margin-top:14px"></div>
      </div>`;

    this._container.querySelectorAll('.er-btn').forEach(btn => {
      btn.addEventListener('click', () => this._pick(+btn.dataset.idx));
    });
  },

  _pick(idx) {
    const sc = this._scenarios[this._current];
    const chosen = sc.actions[idx];
    const correct = chosen.correct;
    if (correct) this._score++;
    App.sound(correct);

    this._container.querySelectorAll('.er-btn').forEach((btn, i) => {
      btn.disabled = true;
      const action = sc.actions[i];
      if (action.correct) btn.classList.add('er-btn-correct');
      else if (i === idx && !correct) btn.classList.add('er-btn-wrong');
    });

    const isLast = this._current + 1 >= this._scenarios.length;
    const fb = this._container.querySelector('#er-feedback');
    fb.innerHTML = `
      <div class="quiz-explanation">
        ${correct ? '✅' : '❌'} ${chosen.explanation}
      </div>
      <button class="btn-next" style="background:${this._accent};margin-top:12px" id="btn-er-next">
        ${isLast ? 'Voir mon résultat' : 'Situation suivante →'}
      </button>`;
    fb.querySelector('#btn-er-next').addEventListener('click', () => {
      this._current++;
      if (this._current < this._scenarios.length) this._render();
      else this._onComplete(this._score, this._scenarios.length);
    });
  }
};
