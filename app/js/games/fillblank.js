/* Fill-in-the-blank engine — click word then click blank */
const FillBlankGame = {
  _sentences: [],
  _bank: [],
  _blanks: [],
  _selectedWord: null,
  _container: null,
  _onComplete: null,
  _accent: '#4361ee',
  _checked: false,

  start(container, data, onComplete, accent) {
    this._sentences = data.sentences;
    this._bank = data.bank.slice();
    this._accent = accent || '#4361ee';
    this._container = container;
    this._onComplete = onComplete;
    this._blanks = this._sentences.map(s => s.answers.map(() => null));
    this._selectedWord = null;
    this._checked = false;
    this._render();
  },

  _render() {
    this._container.innerHTML = `
      <div class="exercise-wrap">
        <p style="text-align:center;font-size:.9rem;color:var(--text-dim);margin-bottom:16px">
          ${this._container._instruction || ''}
        </p>
        <div id="fb-sentences" style="margin-bottom:24px"></div>
        <div class="section-title" style="text-align:center">Banque de mots</div>
        <div class="word-bank" id="fb-bank"></div>
        <button class="btn-check" id="btn-fb-check" ${this._checked ? 'disabled' : ''}>Vérifier ✓</button>
        <div id="fb-feedback" style="margin-top:14px"></div>
      </div>`;

    this._renderSentences();
    this._renderBank();
    this._container.querySelector('#btn-fb-check').addEventListener('click', () => this._check());
  },

  _renderSentences() {
    const wrap = this._container.querySelector('#fb-sentences');
    wrap.innerHTML = '';

    this._sentences.forEach((sent, si) => {
      const p = document.createElement('div');
      p.className = 'fillblank-sentence';

      sent.parts.forEach((part, pi) => {
        if (part !== null) {
          const span = document.createElement('span');
          span.textContent = part;
          p.appendChild(span);
        } else {
          const blankIdx = sent.blanks.indexOf(pi);
          if (blankIdx === -1) return;
          const slot = document.createElement('span');
          const filled = this._blanks[si][blankIdx];
          slot.className = 'blank-slot' + (filled ? ' filled' : '') +
            (this._selectedWord !== null ? ' selected-slot' : '') +
            (this._checked && filled === sent.answers[blankIdx] ? ' correct-slot' : '') +
            (this._checked && filled && filled !== sent.answers[blankIdx] ? ' wrong-slot' : '');
          slot.textContent = filled || '______';
          slot.dataset.si = si;
          slot.dataset.bi = blankIdx;

          if (!this._checked) {
            slot.addEventListener('click', () => this._fillSlot(si, blankIdx));
          }
          p.appendChild(slot);
        }
      });

      wrap.appendChild(p);
    });
  },

  _renderBank() {
    const bank = this._container.querySelector('#fb-bank');
    bank.innerHTML = '';

    const usedWords = this._blanks.flat().filter(Boolean);

    this._bank.forEach(word => {
      const isUsed = usedWords.includes(word);
      const chip = document.createElement('div');
      chip.className = 'word-chip' +
        (isUsed ? ' used' : '') +
        (this._selectedWord === word ? ' selected-chip' : '');
      chip.textContent = word;
      if (!isUsed && !this._checked) {
        chip.addEventListener('click', () => this._selectWord(word));
      }
      bank.appendChild(chip);
    });
  },

  _selectWord(word) {
    this._selectedWord = (this._selectedWord === word) ? null : word;
    this._renderSentences();
    this._renderBank();
  },

  _fillSlot(si, bi) {
    if (this._checked) return;

    if (this._selectedWord !== null) {
      // Place the selected word into this slot
      const prev = this._blanks[si][bi];
      this._blanks[si][bi] = this._selectedWord;
      this._selectedWord = null;
    } else if (this._blanks[si][bi]) {
      // Return word to bank
      this._selectedWord = null;
      this._blanks[si][bi] = null;
    }

    this._renderSentences();
    this._renderBank();
  },

  _check() {
    const allFilled = this._blanks.every(row => row.every(v => v !== null));
    if (!allFilled) {
      const fb = this._container.querySelector('#fb-feedback');
      fb.innerHTML = `<div class="quiz-explanation">⚠️ Remplis toutes les cases avant de vérifier !</div>`;
      return;
    }

    let correct = 0;
    let total = 0;
    this._sentences.forEach((sent, si) => {
      sent.answers.forEach((ans, bi) => {
        total++;
        if (this._blanks[si][bi] === ans) correct++;
      });
    });

    this._checked = true;
    this._renderSentences();
    App.sound(correct === total);

    const fb = this._container.querySelector('#fb-feedback');
    const btn = this._container.querySelector('#btn-fb-check');
    btn.disabled = true;

    fb.innerHTML = `
      <div class="quiz-explanation">
        ${correct === total ? '🎉 Parfait !' : `🔍 ${correct}/${total} réponses correctes.`}
      </div>
      <button class="btn-next" style="background:${this._accent};margin-top:12px" id="btn-fb-done">
        Voir mon résultat
      </button>`;
    fb.querySelector('#btn-fb-done').addEventListener('click', () => {
      this._onComplete(correct, total);
    });
  }
};
