/* Main app router and state manager */
const App = {
  _audioCtx: null,

  // ── Initialization ──────────────────────────────────────────────
  init() {
    this._setupAudio();
    this._showHome();
    document.getElementById('btn-home').addEventListener('click', () => this._showHome());
  },

  // ── Audio feedback (Web Audio API, no external files) ──────────
  _setupAudio() {
    try { this._audioCtx = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) {}
  },

  sound(correct) {
    if (!this._audioCtx) return;
    try {
      const osc = this._audioCtx.createOscillator();
      const gain = this._audioCtx.createGain();
      osc.connect(gain);
      gain.connect(this._audioCtx.destination);
      if (correct) {
        osc.frequency.setValueAtTime(523, this._audioCtx.currentTime);
        osc.frequency.setValueAtTime(659, this._audioCtx.currentTime + 0.1);
        osc.frequency.setValueAtTime(784, this._audioCtx.currentTime + 0.2);
      } else {
        osc.frequency.setValueAtTime(220, this._audioCtx.currentTime);
        osc.frequency.setValueAtTime(180, this._audioCtx.currentTime + 0.15);
      }
      gain.gain.setValueAtTime(0.25, this._audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this._audioCtx.currentTime + 0.4);
      osc.start(this._audioCtx.currentTime);
      osc.stop(this._audioCtx.currentTime + 0.4);
    } catch (e) {}
  },

  // ── Score persistence ────────────────────────────────────────────
  _saveScore(themeId, exId, stars) {
    const key = `b2i_${themeId}_${exId}`;
    const prev = parseInt(localStorage.getItem(key) || '0');
    if (stars > prev) localStorage.setItem(key, stars);
  },

  _getScore(themeId, exId) {
    return parseInt(localStorage.getItem(`b2i_${themeId}_${exId}`) || '0');
  },

  _getThemeProgress(theme) {
    const scores = theme.exercises.map(ex => this._getScore(theme.id, ex.id));
    const total = theme.exercises.length * 3;
    const earned = scores.reduce((s, v) => s + v, 0);
    return Math.round((earned / total) * 100);
  },

  _starsFromScore(score, max) {
    const pct = score / max;
    if (pct >= 0.85) return 3;
    if (pct >= 0.60) return 2;
    if (pct >= 0.30) return 1;
    return 0;
  },

  _renderStars(count) {
    return '⭐'.repeat(count) + '☆'.repeat(3 - count);
  },

  // ── Navigation helpers ───────────────────────────────────────────
  _setTitle(title) {
    document.getElementById('app-title').textContent = title;
  },

  _setBackVisible(visible) {
    const btn = document.getElementById('btn-home');
    btn.classList.toggle('hidden', !visible);
  },

  _getMain() {
    return document.getElementById('main-content');
  },

  // ── Home screen ──────────────────────────────────────────────────
  _showHome() {
    this._setTitle('Informatique 9e');
    this._setBackVisible(false);
    document.getElementById('score-display').textContent = '';

    const main = this._getMain();
    main.innerHTML = `
      <div class="home-hero">
        <h2>Exercices B2i 🖥️</h2>
        <p>Choisis un thème pour t'entraîner</p>
      </div>
      <div class="themes-grid">
        ${THEMES.map(theme => {
          const pct = this._getThemeProgress(theme);
          const stars = theme.exercises.map(ex => this._getScore(theme.id, ex.id));
          const totalStars = stars.reduce((s, v) => s + v, 0);
          const maxStars = theme.exercises.length * 3;
          return `
            <div class="theme-card" data-id="${theme.id}" style="--accent:${theme.color}">
              <span class="icon">${theme.icon}</span>
              <div class="name">${theme.name}</div>
              <div class="progress-bar-wrap"><div class="progress-bar-fill" style="width:${pct}%;background:${theme.color}"></div></div>
              <div class="stars-preview">${totalStars > 0 ? '⭐ ' + totalStars + '/' + maxStars : 'Pas encore commencé'}</div>
            </div>`;
        }).join('')}
      </div>`;

    main.querySelectorAll('.theme-card').forEach(card => {
      card.addEventListener('click', () => this._showTheme(card.dataset.id));
    });
  },

  // ── Theme screen ─────────────────────────────────────────────────
  _showTheme(themeId) {
    const theme = THEMES.find(t => t.id === themeId);
    if (!theme) return;

    this._setTitle(theme.name);
    this._setBackVisible(true);

    const main = this._getMain();
    main.innerHTML = `
      <div class="theme-hero" style="color:${theme.color}">
        <span class="big-icon">${theme.icon}</span>
        <h2 style="color:var(--text)">${theme.name}</h2>
        <p>${theme.desc}</p>
      </div>
      <div class="exercises-list">
        ${theme.exercises.map(ex => {
          const stars = this._getScore(themeId, ex.id);
          const typeLabel = {
            quiz: 'QCM — Questions à choix multiples',
            truefal: 'Vrai ou Faux',
            sorter: 'Classement — Glisser dans les catégories',
            binary: 'Jeu binaire — Bits interactifs',
            rgb: 'Mélangeur RVB',
            caesar: 'Chiffre de César',
            fillblank: 'Texte à compléter'
          }[ex.type] || ex.type;

          return `
            <div class="exercise-card" data-ex="${ex.id}" data-theme="${themeId}" style="border-color:${stars > 0 ? theme.color + '55' : 'transparent'}">
              <div class="ex-icon">${ex.icon}</div>
              <div class="ex-info">
                <div class="ex-title">${ex.title}</div>
                <div class="ex-type">${typeLabel}</div>
              </div>
              <div class="ex-stars">${this._renderStars(stars)}</div>
            </div>`;
        }).join('')}
      </div>`;

    main.querySelectorAll('.exercise-card').forEach(card => {
      card.addEventListener('click', () => this._startExercise(card.dataset.theme, card.dataset.ex));
    });
  },

  // ── Exercise launcher ────────────────────────────────────────────
  _startExercise(themeId, exId) {
    const theme = THEMES.find(t => t.id === themeId);
    const ex = theme && theme.exercises.find(e => e.id === exId);
    if (!ex) return;

    this._setTitle(ex.title);
    this._setBackVisible(true);

    const main = this._getMain();
    main.innerHTML = '';

    const onComplete = (score, max) => {
      const stars = this._starsFromScore(score, max);
      this._saveScore(themeId, exId, stars);
      this._showResult(themeId, exId, score, max, stars, theme.color);
    };

    const engines = { quiz: QuizGame, truefal: TrueFalseGame, sorter: SorterGame, binary: BinaryGame, rgb: RGBGame, caesar: CaesarGame, fillblank: FillBlankGame, filemanager: FileManagerGame };
    const engine = engines[ex.type];
    if (!engine) { main.textContent = 'Exercice non disponible.'; return; }

    // Pass instruction for fillblank
    if (ex.type === 'fillblank') main._instruction = ex.data.instruction;

    engine.start(main, ex.data, onComplete, theme.color);
  },

  // ── Result screen ────────────────────────────────────────────────
  _showResult(themeId, exId, score, max, stars, accent) {
    const theme = THEMES.find(t => t.id === themeId);
    const ex = theme && theme.exercises.find(e => e.id === exId);

    const msgs = [
      ['Pas encore…', 'Continue à t\'entraîner !'],
      ['Pas mal !', 'Tu peux encore mieux faire.'],
      ['Bien joué !', 'Encore un effort pour la perfection.'],
      ['Excellent !', 'Tu maîtrises ce thème !']
    ];
    const [title, sub] = msgs[stars];

    const main = this._getMain();
    main.innerHTML = `
      <div class="result-screen">
        <div class="result-stars pop">${this._renderStars(stars)}</div>
        <div class="result-score" style="color:${accent}">${score} / ${max}</div>
        <div style="font-size:1.4rem;font-weight:800;margin-bottom:6px">${title}</div>
        <div class="result-msg">${sub}</div>

        <div class="result-actions">
          <button class="btn-primary" id="btn-retry" style="background:${accent}">🔄 Réessayer</button>
          <button class="btn-secondary" id="btn-back-theme">← Revenir aux exercices</button>
          <button class="btn-secondary" id="btn-home-res">🏠 Accueil</button>
        </div>
      </div>`;

    main.querySelector('#btn-retry').addEventListener('click', () => this._startExercise(themeId, exId));
    main.querySelector('#btn-back-theme').addEventListener('click', () => this._showTheme(themeId));
    main.querySelector('#btn-home-res').addEventListener('click', () => this._showHome());
  }
};

document.addEventListener('DOMContentLoaded', () => App.init());
