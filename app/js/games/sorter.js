/* Sorter engine — click to select, click category to place */
const SorterGame = {
  _container: null,
  _onComplete: null,
  _data: null,
  _pool: [],
  _placed: {},
  _selected: null,
  _accent: '#4361ee',
  _checked: false,

  start(container, data, onComplete, accent) {
    this._container = container;
    this._onComplete = onComplete;
    this._data = data;
    this._accent = accent || '#4361ee';
    this._pool = data.items.map((item, i) => ({ ...item, id: i }));
    this._selected = null;
    this._checked = false;
    this._placed = {};
    data.categories.forEach(c => { this._placed[c] = []; });
    // Shuffle pool
    for (let i = this._pool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this._pool[i], this._pool[j]] = [this._pool[j], this._pool[i]];
    }
    this._render();
  },

  _render() {
    const colsClass = `cols-${Math.min(this._data.cols || this._data.categories.length, 4)}`;
    this._container.innerHTML = `
      <div class="exercise-wrap">
        <p class="sorter-hint">${this._data.instruction}</p>
        <div class="sorter-pool" id="sorter-pool"></div>
        <div class="sorter-categories ${colsClass}" id="sorter-cats"></div>
        <button class="btn-check" id="btn-check-sorter">Vérifier ✓</button>
        <div id="sorter-feedback" style="margin-top:14px"></div>
      </div>`;

    this._renderPool();
    this._renderCats();
    this._container.querySelector('#btn-check-sorter').addEventListener('click', () => this._check());
  },

  _renderPool() {
    const pool = this._container.querySelector('#sorter-pool');
    pool.innerHTML = '';
    this._pool.forEach(item => {
      const chip = document.createElement('div');
      chip.className = 'sort-chip' + (this._selected && this._selected.id === item.id ? ' selected-chip' : '');
      chip.textContent = item.label;
      chip.addEventListener('click', () => this._selectItem(item));
      pool.appendChild(chip);
    });
  },

  _renderCats() {
    const cats = this._container.querySelector('#sorter-cats');
    cats.innerHTML = '';
    this._data.categories.forEach(cat => {
      const col = document.createElement('div');
      col.className = 'sorter-category' + (this._selected ? ' ready' : '');
      col.innerHTML = `<h3>${cat}</h3><div class="cat-items" id="cat-${this._safeId(cat)}"></div>`;
      col.addEventListener('click', (e) => {
        if (e.target === col || e.target === col.querySelector('h3') || e.target === col.querySelector('.cat-items')) {
          this._placeInCategory(cat);
        }
      });

      const catItems = col.querySelector('.cat-items');
      (this._placed[cat] || []).forEach(item => {
        const chip = document.createElement('div');
        chip.className = 'sort-chip' + (this._checked ? (item.cat === cat ? ' correct-chip' : ' wrong-chip') : '');
        chip.textContent = item.label;
        if (!this._checked) {
          chip.addEventListener('click', () => this._returnToPool(item, cat));
        }
        catItems.appendChild(chip);
      });

      cats.appendChild(col);
    });
  },

  _safeId(str) {
    return str.replace(/[^a-z0-9]/gi, '_');
  },

  _selectItem(item) {
    if (this._checked) return;
    this._selected = (this._selected && this._selected.id === item.id) ? null : item;
    this._renderPool();
    this._renderCats();
  },

  _placeInCategory(cat) {
    if (!this._selected || this._checked) return;
    const item = this._selected;
    this._pool = this._pool.filter(i => i.id !== item.id);
    this._placed[cat].push(item);
    this._selected = null;
    this._renderPool();
    this._renderCats();
  },

  _returnToPool(item, cat) {
    if (this._checked) return;
    this._placed[cat] = this._placed[cat].filter(i => i.id !== item.id);
    this._pool.push(item);
    this._selected = null;
    this._renderPool();
    this._renderCats();
  },

  _check() {
    if (this._pool.length > 0) {
      const fb = this._container.querySelector('#sorter-feedback');
      fb.innerHTML = `<div class="quiz-explanation">⚠️ Il reste des éléments à classer ! Place-les tous avant de vérifier.</div>`;
      return;
    }

    let correct = 0;
    let total = this._data.items.length;
    this._data.categories.forEach(cat => {
      this._placed[cat].forEach(item => {
        if (item.cat === cat) correct++;
      });
    });

    this._checked = true;
    this._renderCats();

    const fb = this._container.querySelector('#sorter-feedback');
    const btn = this._container.querySelector('#btn-check-sorter');
    btn.style.display = 'none';

    App.sound(correct === total);

    fb.innerHTML = `
      <div class="quiz-explanation">
        ${correct === total ? '🎉' : '🔍'} Tu as correctement classé ${correct} / ${total} éléments.
        ${correct < total ? ' Les éléments en <span style="color:var(--wrong)">rouge</span> sont mal placés.' : ''}
      </div>
      <button class="btn-next" style="background:${this._accent};margin-top:12px" id="btn-sorter-done">
        Voir mon résultat
      </button>`;
    fb.querySelector('#btn-sorter-done').addEventListener('click', () => {
      this._onComplete(correct, total);
    });
  }
};
