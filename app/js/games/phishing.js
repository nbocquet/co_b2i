/* Phishing detective — classify emails as legit or phishing, then see clues */
const PhishingGame = {
  _container: null,
  _onComplete: null,
  _emails: [],
  _current: 0,
  _score: 0,
  _accent: '#8b5cf6',

  start(container, data, onComplete, accent) {
    this._container = container;
    this._onComplete = onComplete;
    this._emails = data.emails.slice();
    this._current = 0;
    this._score = 0;
    this._accent = accent || '#8b5cf6';
    this._render();
  },

  _render() {
    const email = this._emails[this._current];
    const total = this._emails.length;
    const pct = (this._current / total) * 100;

    this._container.innerHTML = `
      <div class="exercise-wrap">
        <div class="progress-bar">
          <div class="progress-bar-inner" style="width:${pct}%;background:${this._accent}"></div>
        </div>
        <p style="text-align:center;font-size:.8rem;color:var(--text-dim);margin-bottom:14px">
          E-mail ${this._current + 1} / ${total} — Légitime ou tentative de phishing ?
        </p>

        <!-- Email render -->
        <div class="ph-email-card">
          <div class="ph-email-header">
            <div class="ph-avatar">${email.fromLabel[0].toUpperCase()}</div>
            <div class="ph-meta">
              <div class="ph-from">
                <strong>${email.fromLabel}</strong>
                <span class="ph-addr">&lt;${email.from}&gt;</span>
              </div>
              <div class="ph-to-line">À : ${email.to} · ${email.date}</div>
            </div>
          </div>
          <div class="ph-subject">${email.subject}</div>
          <div class="ph-body">${email.body.replace(/\n/g, '<br>').replace(/→ (https?:\/\/\S+)/g, '→ <span class="ph-link">$1</span>').replace(/→ ([^<\n]+)/g, '→ <span class="ph-link-text">$1</span>')}</div>
        </div>

        <!-- Action buttons -->
        <div class="ph-actions" id="ph-actions">
          <button class="ph-btn ph-btn-legit" id="btn-legit">✅ Légitime</button>
          <button class="ph-btn ph-btn-phish" id="btn-phish">🚨 Phishing</button>
        </div>

        <div id="ph-feedback"></div>
      </div>`;

    this._container.querySelector('#btn-legit').addEventListener('click', () => this._judge(true));
    this._container.querySelector('#btn-phish').addEventListener('click', () => this._judge(false));
  },

  _judge(guessedLegit) {
    const email = this._emails[this._current];
    const correct = guessedLegit === email.legit;
    if (correct) this._score++;
    App.sound(correct);

    // Disable buttons, show result style
    const actions = this._container.querySelector('#ph-actions');
    actions.querySelectorAll('.ph-btn').forEach(b => b.disabled = true);
    if (email.legit) {
      this._container.querySelector('#btn-legit').classList.add('ph-btn-correct');
      this._container.querySelector('#btn-phish').classList.add('ph-btn-wrong');
    } else {
      this._container.querySelector('#btn-phish').classList.add('ph-btn-correct');
      this._container.querySelector('#btn-legit').classList.add('ph-btn-wrong');
    }

    const isLast = this._current + 1 >= this._emails.length;
    const fb = this._container.querySelector('#ph-feedback');

    if (email.legit) {
      fb.innerHTML = `
        <div class="quiz-explanation">
          ${correct ? '✅ Bien vu !' : '❌ Attention !'} Cet e-mail est <strong>légitime</strong>.
          L\'expéditeur (${email.from}) utilise un domaine officiel, le ton est normal et aucune information sensible n\'est demandée.
        </div>
        <button class="btn-next" style="background:${this._accent};margin-top:12px" id="btn-ph-next">
          ${isLast ? 'Voir mon résultat' : 'E-mail suivant →'}
        </button>`;
    } else {
      const flagsHtml = email.flags.map(f => `
        <div class="ph-flag">
          <span class="ph-flag-label">🚩 ${f.label}</span>
          <span class="ph-flag-detail">${f.detail}</span>
        </div>`).join('');

      fb.innerHTML = `
        <div class="quiz-explanation">
          ${correct ? '🕵️ Excellent !' : '❌ Raté !'} Cet e-mail est un <strong>phishing</strong>.
          Voici les indices qui auraient dû mettre la puce à l\'oreille :
        </div>
        <div class="ph-flags">${flagsHtml}</div>
        <button class="btn-next" style="background:${this._accent};margin-top:12px" id="btn-ph-next">
          ${isLast ? 'Voir mon résultat' : 'E-mail suivant →'}
        </button>`;
    }

    fb.querySelector('#btn-ph-next').addEventListener('click', () => {
      this._current++;
      if (this._current < this._emails.length) this._render();
      else this._onComplete(this._score, this._emails.length);
    });
  }
};
