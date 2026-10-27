/**
 * ============================================================
 *  sur lyng-a — Application Logic
 *  Author: [joa]
 * ============================================================
 */

/* ── State ── */
const state = {
  currentView: 'toc',       // 'toc' | 'grid'
  currentFilter: 'All',
  searchQuery: '',
  bookmarks: [],
  currentPoem: null,
  readerFontSize: 1,        // em multiplier, applied as CSS variable
  drawerOpen: false,
};

/* ── DOM refs ── */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

const dom = {
  paletteDropdown: $('#palette-dropdown'),
  paletteBtn: $('#palette-btn'),
  paletteMenu: $('#palette-menu'),
  paletteCurrentLabel: $('#palette-current-label'),
  themeToggle: $('#theme-toggle'),
  bookmarkDrawerBtn: $('#bookmark-drawer-btn'),
  filterPills: $$('.filter-pill'),
  searchInput: $('#search-input'),
  viewBtns: $$('.view-btn'),
  tocView: $('#toc-view'),
  // gridBody doubles as the grid-view container (has class="grid-view")
  tocBody: $('#toc-body'),
  gridBody: $('#grid-body'),
  emptyState: $('#empty-state'),
  readerOverlay: $('#reader-overlay'),
  readerBack: $('#reader-back'),
  readerCatalog: $('#reader-catalog'),
  readerTitle: $('#reader-title'),
  readerMeta: $('#reader-meta'),
  readerEpigraph: $('#reader-epigraph'),
  readerRule: $('#reader-rule'),
  readerBody: $('#reader-body'),
  readerMarginNote: $('#reader-margin-note'),
  readerBookmarkBtn: $('#reader-bookmark-btn'),
  readerShareBtn: $('#reader-share-btn'),
  fontDecrease: $('#font-decrease'),
  fontIncrease: $('#font-increase'),
  marginToggle: $('#margin-toggle'),
  marginBody: $('#margin-body'),
  readerNavPrev: $('#reader-nav-prev'),
  readerNavNext: $('#reader-nav-next'),
  bookmarkDrawer: $('#bookmark-drawer'),
  drawerBackdrop: $('#drawer-backdrop'),
  bookmarkClose: $('#bookmark-close'),
  bookmarkList: $('#bookmark-list'),
  bookmarkEmpty: $('#bookmark-empty'),
  heroFeaturedWrap: $('#hero-featured-wrap'),
  toast: $('#toast'),
};

/* ============================================================
   PALETTES & THEMES
   ============================================================ */
const PALETTES = {
  terracotta: { name: 'Aged Parchment', short: 'Parchment', desc: 'Terracotta & Forest' },
  pine:       { name: 'Pine & Amber', short: 'Pine', desc: 'Highland Mist & Rum' },
  navy:       { name: 'Midnight Navy', short: 'Navy', desc: 'Inkwell & Antique Brass' },
  espresso:   { name: 'Smoked Espresso', short: 'Espresso', desc: 'Tobacco Ash & Whiskey' },
  burgundy:   { name: 'Vintage Burgundy', short: 'Burgundy', desc: 'Wine Stain & Pressed Rose' },
};

function initPalette() {
  const saved = localStorage.getItem('sur-lyng-a-palette') || 'pine';
  applyPalette(saved, false);
}

function applyPalette(paletteKey, notify = true) {
  if (!PALETTES[paletteKey]) paletteKey = 'pine';
  document.documentElement.setAttribute('data-palette', paletteKey);
  localStorage.setItem('sur-lyng-a-palette', paletteKey);

  // Update active state in menu
  $$('.palette-option').forEach(btn => {
    const isActive = btn.dataset.palette === paletteKey;
    btn.classList.toggle('active', isActive);
    btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
  });

  // Update button label
  if (dom.paletteCurrentLabel && PALETTES[paletteKey]) {
    dom.paletteCurrentLabel.textContent = PALETTES[paletteKey].short;
  }

  // Keep theme toggle tooltip informative
  updateThemeLabels();

  if (notify) {
    showToast(`Palette: ${PALETTES[paletteKey].name} ◆`);
  }
}

function initTheme() {
  const saved = localStorage.getItem('sur-lyng-a-theme') || 'light';
  applyTheme(saved);
}

function updateThemeLabels() {
  const btn = dom.themeToggle;
  if (!btn) return;
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  const paletteKey = document.documentElement.getAttribute('data-palette') || 'pine';
  const paletteName = PALETTES[paletteKey]?.short || 'Daylight';

  if (isDark) {
    btn.title = `Switch to Daylight reading mode (${paletteName})`;
    btn.querySelector('.theme-label').textContent = 'Daylight';
  } else {
    btn.title = 'Switch to Candlelight (Dark reading mode)';
    btn.querySelector('.theme-label').textContent = 'Candlelight';
  }
}

function applyTheme(mode) {
  document.documentElement.setAttribute('data-theme', mode === 'dark' ? 'dark' : '');
  updateThemeLabels();
  localStorage.setItem('sur-lyng-a-theme', mode);
}

function toggleTheme() {
  const current = localStorage.getItem('sur-lyng-a-theme') || 'light';
  applyTheme(current === 'dark' ? 'light' : 'dark');
}

/* ============================================================
   BOOKMARKS
   ============================================================ */
function loadBookmarks() {
  try {
    state.bookmarks = JSON.parse(localStorage.getItem('sur-lyng-a-bookmarks') || '[]');
  } catch {
    state.bookmarks = [];
  }
}

function saveBookmarks() {
  localStorage.setItem('sur-lyng-a-bookmarks', JSON.stringify(state.bookmarks));
}

function isBookmarked(id) {
  return state.bookmarks.includes(id);
}

function toggleBookmark(id) {
  if (isBookmarked(id)) {
    state.bookmarks = state.bookmarks.filter(b => b !== id);
    showToast('Bookmark removed.');
  } else {
    state.bookmarks.push(id);
    showToast('Poem bookmarked ◆');
  }
  saveBookmarks();
  renderBookmarkDrawer();
  // Update visual states everywhere
  updateBookmarkVisuals();
}

function updateBookmarkVisuals() {
  // TOC rows
  $$('[data-poem-id]', dom.tocBody).forEach(row => {
    const id = parseInt(row.dataset.poemId, 10);
    row.classList.toggle('bookmarked', isBookmarked(id));
  });
  // Grid cards
  $$('[data-poem-id]', dom.gridBody).forEach(card => {
    const id = parseInt(card.dataset.poemId, 10);
    card.classList.toggle('bookmarked', isBookmarked(id));
  });
  // Reader button
  if (dom.readerBookmarkBtn && state.currentPoem) {
    const bm = isBookmarked(state.currentPoem.id);
    dom.readerBookmarkBtn.classList.toggle('bookmarked', bm);
    dom.readerBookmarkBtn.querySelector('.bm-label').textContent = bm ? 'Dog-eared' : 'Dog-ear';
  }
  // Drawer button count badge
  const count = state.bookmarks.length;
  const badge = $('#bookmark-count');
  if (badge) badge.textContent = count > 0 ? count : '';
}

/* ============================================================
   FEATURED POEM (Hero)
   ============================================================ */
function renderFeaturedPoem() {
  const poem = POEMS.find(p => p.featured) || POEMS[0];
  if (!poem || !dom.heroFeaturedWrap) return;

  const previewLines = poem.body.split('\n').filter(l => l.trim()).slice(0, 3).join('\n');

  dom.heroFeaturedWrap.innerHTML = `
    <div class="featured-label">Favour Poem of the Month</div>
    <div class="featured-catalog">${poem.catalogNumber}</div>
    <h2 class="featured-title">${escapeHtml(poem.title)}</h2>
    <div class="featured-preview">${escapeHtml(previewLines)}…</div>
    <div class="featured-meta">
      <span class="featured-theme-tag" role="button" tabindex="0" title="Filter by theme: ${escapeHtml(poem.theme)}">${escapeHtml(poem.theme)}</span>
      <button class="btn-read" data-poem-id="${poem.id}" aria-label="Read ${escapeHtml(poem.title)}">
        Read Piece →
      </button>
    </div>
  `;

  dom.heroFeaturedWrap.querySelector('.btn-read')?.addEventListener('click', () => {
    openPoem(poem.id);
  });

  dom.heroFeaturedWrap.querySelector('.featured-theme-tag')?.addEventListener('click', () => {
    applyFilter(poem.theme);
    document.getElementById('anthology')?.scrollIntoView({ behavior: 'smooth' });
  });
}

/* ============================================================
   FILTERING & COUNTS
   ============================================================ */
function applyFilter(filterName) {
  state.currentFilter = filterName || 'All';
  const pills = $$('.filter-pill');
  pills.forEach(p => {
    const isMatch = (p.dataset.filter || '').trim().toLowerCase() === state.currentFilter.trim().toLowerCase();
    p.classList.toggle('active', isMatch);
    p.setAttribute('aria-pressed', isMatch ? 'true' : 'false');
  });
  renderPoems();
}

function updateFilterCounts() {
  const counts = { all: POEMS.length };
  POEMS.forEach(poem => {
    if (poem.theme) {
      const key = poem.theme.trim().toLowerCase();
      counts[key] = (counts[key] || 0) + 1;
    }
  });

  const pills = $$('.filter-pill');
  pills.forEach(pill => {
    const filter = (pill.dataset.filter || '').trim().toLowerCase();
    const countVal = filter === 'all' ? counts.all : (counts[filter] || 0);
    let countSpan = pill.querySelector('.filter-count');
    if (!countSpan) {
      countSpan = document.createElement('span');
      countSpan.className = 'filter-count';
      pill.appendChild(countSpan);
    }
    countSpan.textContent = countVal;
  });
}

function getFilteredPoems() {
  const current = (state.currentFilter || 'All').trim().toLowerCase();
  return POEMS.filter(poem => {
    const poemTheme = (poem.theme || '').trim().toLowerCase();
    const matchesFilter = current === 'all' || poemTheme === current;
    const q = state.searchQuery.toLowerCase().trim();
    const matchesSearch = !q ||
      (poem.title && poem.title.toLowerCase().includes(q)) ||
      poemTheme.includes(q) ||
      (poem.body && poem.body.toLowerCase().includes(q)) ||
      (poem.catalogNumber && poem.catalogNumber.toLowerCase().includes(q));
    return matchesFilter && matchesSearch;
  });
}

/* ============================================================
   RENDER — TABLE OF CONTENTS
   ============================================================ */
function renderTOC(poems) {
  if (!dom.tocBody) return;

  if (poems.length === 0) {
    dom.tocBody.innerHTML = '';
    return;
  }

  dom.tocBody.innerHTML = poems.map(poem => `
    <div class="toc-row${isBookmarked(poem.id) ? ' bookmarked' : ''}"
         data-poem-id="${poem.id}"
         role="button"
         tabindex="0"
         aria-label="Open poem: ${poem.title}">
      <div class="toc-catalog">${poem.catalogNumber}</div>
      <div class="toc-title-cell">
        <span class="toc-title-text">${poem.title}</span>
        <span class="toc-leaders" aria-hidden="true">
          ....................................................................................................................
        </span>
      </div>
      <span class="toc-tag">${poem.theme}</span>
      <div class="toc-date">${poem.date}</div>
    </div>
  `).join('');

  // Attach click / keyboard events
  $$('.toc-row', dom.tocBody).forEach(row => {
    row.addEventListener('click', () => openPoem(parseInt(row.dataset.poemId, 10)));
    row.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openPoem(parseInt(row.dataset.poemId, 10));
      }
    });
  });

  $$('.toc-tag', dom.tocBody).forEach(tag => {
    tag.addEventListener('click', e => {
      e.stopPropagation();
      applyFilter(tag.textContent.trim());
    });
  });
}

/* ============================================================
   RENDER — CARD GRID
   ============================================================ */
function renderGrid(poems) {
  if (!dom.gridBody) return;

  if (poems.length === 0) {
    dom.gridBody.innerHTML = '';
    return;
  }

  dom.gridBody.innerHTML = poems.map(poem => {
    const previewLines = poem.body
      .split('\n')
      .filter(l => l.trim())
      .slice(0, 3)
      .join('\n');

    return `
      <article class="poem-card${isBookmarked(poem.id) ? ' bookmarked' : ''}"
               data-poem-id="${poem.id}"
               role="button"
               tabindex="0"
               aria-label="Open poem: ${poem.title}">
        <div class="bookmark-corner" aria-hidden="true"></div>
        <div class="card-catalog">${poem.catalogNumber}</div>
        <h3 class="card-title">${poem.title}</h3>
        <div class="card-preview">${escapeHtml(previewLines)}…</div>
        <div class="card-footer">
          <span class="card-tag">${poem.theme}</span>
          <span class="card-date">${poem.date}</span>
        </div>
      </article>
    `;
  }).join('');

  $$('.poem-card', dom.gridBody).forEach(card => {
    card.addEventListener('click', () => openPoem(parseInt(card.dataset.poemId, 10)));
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openPoem(parseInt(card.dataset.poemId, 10));
      }
    });
  });

  $$('.card-tag', dom.gridBody).forEach(tag => {
    tag.addEventListener('click', e => {
      e.stopPropagation();
      applyFilter(tag.textContent.trim());
    });
  });
}

/* ── Master render ── */
function renderPoems() {
  const poems = getFilteredPoems();
  renderTOC(poems);
  renderGrid(poems);

  const isEmpty = poems.length === 0;
  dom.emptyState?.classList.toggle('visible', isEmpty);
}

/* ============================================================
   POEM READER
   ============================================================ */
function openPoem(id) {
  const poem = POEMS.find(p => p.id === id);
  if (!poem) return;
  state.currentPoem = poem;

  // Populate content
  dom.readerCatalog.textContent = poem.catalogNumber;
  dom.readerTitle.textContent = poem.title;

  // Meta
  dom.readerMeta.innerHTML = `
    <span>${poem.date}</span>
    <span>${poem.theme}</span>
    ${poem.readingTime ? `<span>${poem.readingTime} read</span>` : ''}
  `;

  // Epigraph
  if (poem.epigraph) {
    dom.readerEpigraph.innerHTML = `
      <p class="reader-epigraph-text">"${escapeHtml(poem.epigraph.text)}"</p>
      <span class="reader-epigraph-attr">${poem.epigraph.attribution}</span>
    `;
    dom.readerEpigraph.style.display = '';
    dom.readerRule.style.display = '';
  } else {
    dom.readerEpigraph.style.display = 'none';
    dom.readerRule.style.display = 'none';
  }

  // Body
  dom.readerBody.textContent = poem.body;

  // Margin note
  if (poem.marginNote) {
    dom.readerMarginNote.style.display = '';
    dom.marginBody.textContent = poem.marginNote;
    dom.marginBody.classList.remove('open');
    dom.marginToggle.classList.remove('open');
  } else {
    dom.readerMarginNote.style.display = 'none';
  }

  // Bookmark state
  updateBookmarkVisuals();

  // Prev / Next nav
  const allPoems = POEMS;
  const idx = allPoems.findIndex(p => p.id === id);
  const prev = allPoems[idx - 1];
  const next = allPoems[idx + 1];

  if (dom.readerNavPrev) {
    if (prev) {
      dom.readerNavPrev.innerHTML = `
        <span class="reader-nav-label">← Previous</span>
        <span class="reader-nav-title">${prev.title}</span>
      `;
      dom.readerNavPrev.dataset.poemId = prev.id;
      dom.readerNavPrev.style.visibility = '';
    } else {
      dom.readerNavPrev.style.visibility = 'hidden';
    }
  }

  if (dom.readerNavNext) {
    if (next) {
      dom.readerNavNext.innerHTML = `
        <span class="reader-nav-label">Next →</span>
        <span class="reader-nav-title">${next.title}</span>
      `;
      dom.readerNavNext.dataset.poemId = next.id;
      dom.readerNavNext.style.visibility = '';
    } else {
      dom.readerNavNext.style.visibility = 'hidden';
    }
  }

  // Open overlay
  dom.readerOverlay.classList.add('open');
  dom.readerOverlay.scrollTop = 0;
  document.body.style.overflow = 'hidden';

  // URL hash for shareable links
  history.pushState({ poemId: id }, '', `#poem-${id}`);
}

function closePoem() {
  dom.readerOverlay.classList.remove('open');
  document.body.style.overflow = '';
  state.currentPoem = null;
  // Restore URL
  history.pushState({}, '', window.location.pathname);
}

/* ── Font size ── */
function setReaderFontSize(delta) {
  state.readerFontSize = Math.max(0.8, Math.min(1.5, state.readerFontSize + delta));
  dom.readerBody.style.fontSize = `${state.readerFontSize}rem`;
}

/* ============================================================
   BOOKMARK DRAWER
   ============================================================ */
function renderBookmarkDrawer() {
  if (!dom.bookmarkList) return;

  if (state.bookmarks.length === 0) {
    dom.bookmarkList.innerHTML = '';
    dom.bookmarkEmpty?.style.setProperty('display', '');
    return;
  }

  dom.bookmarkEmpty?.style.setProperty('display', 'none');

  dom.bookmarkList.innerHTML = state.bookmarks.map(id => {
    const poem = POEMS.find(p => p.id === id);
    if (!poem) return '';
    return `
      <button class="bookmark-item" data-poem-id="${poem.id}" aria-label="Open ${poem.title}">
        <div class="bookmark-item-catalog">${poem.catalogNumber} · ${poem.theme}</div>
        <div class="bookmark-item-title">${poem.title}</div>
      </button>
    `;
  }).join('');

  $$('.bookmark-item', dom.bookmarkList).forEach(btn => {
    btn.addEventListener('click', () => {
      closeDrawer();
      openPoem(parseInt(btn.dataset.poemId, 10));
    });
  });
}

function openDrawer() {
  state.drawerOpen = true;
  dom.bookmarkDrawer.classList.add('open');
  dom.drawerBackdrop.classList.add('open');
  document.body.style.overflow = 'hidden';
  renderBookmarkDrawer();
}

function closeDrawer() {
  state.drawerOpen = false;
  dom.bookmarkDrawer.classList.remove('open');
  dom.drawerBackdrop.classList.remove('open');
  if (!dom.readerOverlay.classList.contains('open')) {
    document.body.style.overflow = '';
  }
}

/* ============================================================
   TOAST
   ============================================================ */
let toastTimeout;
function showToast(message) {
  if (!dom.toast) return;
  dom.toast.textContent = message;
  dom.toast.classList.add('show');
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => dom.toast.classList.remove('show'), 2500);
}

/* ============================================================
   SHARE / COPY
   ============================================================ */
function copyToClipboard(url) {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(url).then(() => showToast('Link copied to clipboard.'));
  } else {
    // Fallback
    const ta = document.createElement('textarea');
    ta.value = url;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    showToast('Link copied to clipboard.');
  }
}

function sharePoem() {
  if (!state.currentPoem) return;
  const url = `${window.location.origin}${window.location.pathname}#poem-${state.currentPoem.id}`;
  const shareData = {
    title: `${state.currentPoem.title} — sur lyng-a`,
    text: `"${state.currentPoem.title}" — poetry by [joa]`,
    url: url
  };

  // Use native OS share sheet if supported (mobile iOS/Android)
  if (navigator.share) {
    navigator.share(shareData).catch(err => {
      if (err.name !== 'AbortError') {
        copyToClipboard(url);
      }
    });
  } else {
    copyToClipboard(url);
  }
}

/* ============================================================
   UTILITY
   ============================================================ */
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/* ============================================================
   EVENT WIRING
   ============================================================ */
function wireEvents() {
  // Palette dropdown
  const togglePaletteMenu = (force) => {
    if (!dom.paletteBtn || !dom.paletteMenu) return;
    const isExpanded = dom.paletteBtn.getAttribute('aria-expanded') === 'true';
    const shouldOpen = typeof force === 'boolean' ? force : !isExpanded;
    dom.paletteBtn.setAttribute('aria-expanded', String(shouldOpen));
    if (shouldOpen) {
      dom.paletteMenu.removeAttribute('hidden');
      requestAnimationFrame(() => dom.paletteMenu.classList.add('open'));
    } else {
      dom.paletteMenu.classList.remove('open');
      setTimeout(() => {
        if (!dom.paletteMenu.classList.contains('open')) {
          dom.paletteMenu.setAttribute('hidden', '');
        }
      }, 150);
    }
  };

  dom.paletteBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    togglePaletteMenu();
  });

  $$('.palette-option').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const palette = btn.dataset.palette;
      if (palette) {
        applyPalette(palette);
        togglePaletteMenu(false);
        dom.paletteBtn?.focus();
      }
    });
  });

  // Close palette dropdown when clicking outside
  document.addEventListener('click', (e) => {
    if (dom.paletteDropdown && !dom.paletteDropdown.contains(e.target)) {
      togglePaletteMenu(false);
    }
  });

  // Theme toggle
  dom.themeToggle?.addEventListener('click', toggleTheme);

  // Bookmark drawer open/close
  dom.bookmarkDrawerBtn?.addEventListener('click', openDrawer);
  dom.bookmarkClose?.addEventListener('click', closeDrawer);
  dom.drawerBackdrop?.addEventListener('click', closeDrawer);

  // Filter pills
  $$('.filter-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      applyFilter(pill.dataset.filter);
    });
  });

  // Search
  dom.searchInput?.addEventListener('input', e => {
    state.searchQuery = e.target.value;
    renderPoems();
  });

  // View switcher
  dom.viewBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const view = btn.dataset.view;
      state.currentView = view;
      dom.viewBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-pressed', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-pressed', 'true');
      dom.tocView.classList.toggle('active', view === 'toc');
      dom.gridBody.classList.toggle('active', view === 'grid');
    });
  });

  // Reader back
  dom.readerBack?.addEventListener('click', closePoem);

  // Reader bookmark
  dom.readerBookmarkBtn?.addEventListener('click', () => {
    if (state.currentPoem) toggleBookmark(state.currentPoem.id);
  });

  // Reader share
  dom.readerShareBtn?.addEventListener('click', sharePoem);

  // Font size
  dom.fontDecrease?.addEventListener('click', () => setReaderFontSize(-0.1));
  dom.fontIncrease?.addEventListener('click', () => setReaderFontSize(0.1));

  // Margin note toggle
  dom.marginToggle?.addEventListener('click', () => {
    const open = dom.marginBody.classList.toggle('open');
    dom.marginToggle.classList.toggle('open', open);
    dom.marginToggle.setAttribute('aria-expanded', String(open));
  });

  // Reader nav
  dom.readerNavPrev?.addEventListener('click', () => {
    const id = parseInt(dom.readerNavPrev.dataset.poemId, 10);
    if (id) openPoem(id);
  });
  dom.readerNavNext?.addEventListener('click', () => {
    const id = parseInt(dom.readerNavNext.dataset.poemId, 10);
    if (id) openPoem(id);
  });

  // Keyboard escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      if (dom.paletteMenu && dom.paletteMenu.classList.contains('open')) {
        dom.paletteBtn?.setAttribute('aria-expanded', 'false');
        dom.paletteMenu.classList.remove('open');
        dom.paletteMenu.setAttribute('hidden', '');
        dom.paletteBtn?.focus();
      } else if (state.drawerOpen) {
        closeDrawer();
      } else if (dom.readerOverlay.classList.contains('open')) {
        closePoem();
      }
    }
  });

  // Handle browser back button
  window.addEventListener('popstate', e => {
    if (state.drawerOpen) {
      closeDrawer();
    }
    if (dom.readerOverlay.classList.contains('open')) {
      dom.readerOverlay.classList.remove('open');
      document.body.style.overflow = '';
      state.currentPoem = null;
    }
  });

  // Touch / Swipe gestures for Reader Overlay
  let touchStartX = 0;
  let touchStartY = 0;

  dom.readerOverlay?.addEventListener('touchstart', e => {
    if (e.changedTouches && e.changedTouches[0]) {
      touchStartX = e.changedTouches[0].screenX;
      touchStartY = e.changedTouches[0].screenY;
    }
  }, { passive: true });

  dom.readerOverlay?.addEventListener('touchend', e => {
    if (!e.changedTouches || !e.changedTouches[0]) return;
    const touchEndX = e.changedTouches[0].screenX;
    const touchEndY = e.changedTouches[0].screenY;
    const diffX = touchEndX - touchStartX;
    const diffY = touchEndY - touchStartY;

    // Verify horizontal swipe dominance and distance threshold (min 55px)
    if (Math.abs(diffX) > 55 && Math.abs(diffX) > Math.abs(diffY) * 1.5) {
      if (diffX < 0) {
        // Swiped left -> Next poem
        const nextId = dom.readerNavNext ? parseInt(dom.readerNavNext.dataset.poemId, 10) : null;
        if (nextId) openPoem(nextId);
      } else {
        // Swiped right -> Previous poem
        const prevId = dom.readerNavPrev ? parseInt(dom.readerNavPrev.dataset.poemId, 10) : null;
        if (prevId) openPoem(prevId);
      }
    }
  }, { passive: true });

  // Check URL hash on load (shareable link support)
  const hash = window.location.hash;
  if (hash && hash.startsWith('#poem-')) {
    const id = parseInt(hash.replace('#poem-', ''), 10);
    if (!isNaN(id)) {
      // Slight delay to let DOM settle
      setTimeout(() => openPoem(id), 100);
    }
  }
}

/* ============================================================
   INIT
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  initPalette();
  initTheme();
  loadBookmarks();
  updateFilterCounts();
  renderFeaturedPoem();
  renderPoems();
  renderBookmarkDrawer();
  wireEvents();

  // Set initial view
  dom.tocView.classList.add('active');
  dom.gridBody.classList.remove('active');
});
