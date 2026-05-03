/* main.js – pmoscode-theme interactions */

document.addEventListener('DOMContentLoaded', function () {

  /* ---------- Dropdown Menu ---------- */
  var canHover = window.matchMedia('(hover: hover)').matches;

  document.querySelectorAll('.site-nav__item--dropdown').forEach(function (item) {
    var hideTimer;

    if (canHover) {
      item.addEventListener('mouseenter', function () {
        clearTimeout(hideTimer);
        item.classList.add('open');
      });
      item.addEventListener('mouseleave', function () {
        hideTimer = setTimeout(function () {
          item.classList.remove('open');
        }, 120);
      });
    }

    // Click toggle for keyboard / touch
    item.querySelector('.site-nav__link').addEventListener('click', function (e) {
      e.preventDefault();
      item.classList.toggle('open');
    });
  });
  document.addEventListener('click', function (e) {
    if (!e.target.closest('.site-nav__item--dropdown')) {
      document.querySelectorAll('.site-nav__item--dropdown.open').forEach(function (el) {
        el.classList.remove('open');
      });
    }
  });

  /* ---------- Mobile Menu Toggle ---------- */
  const menuBtn = document.getElementById('menu-toggle');
  const nav = document.querySelector('.site-nav');
  if (menuBtn && nav) {
    menuBtn.addEventListener('click', function () {
      nav.classList.toggle('open');
    });
  }

  /* ---------- Dark Mode Toggle ---------- */
  const themeBtn = document.getElementById('theme-toggle');
  if (themeBtn) {
    themeBtn.addEventListener('click', function () {
      document.documentElement.classList.add('theme-transition');
      var isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      if (isDark) {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
      } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
      }
      setTimeout(function () {
        document.documentElement.classList.remove('theme-transition');
      }, 400);
    });
  }

  /* ---------- Hero Tabs (Popular / Recent) ---------- */
  document.querySelectorAll('.tab-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      const group = btn.closest('[data-tabs]');
      if (!group) return;
      group.querySelectorAll('.tab-btn').forEach(function (b) { b.classList.remove('active'); });
      group.querySelectorAll('.tab-panel').forEach(function (p) { p.classList.remove('active'); });
      btn.classList.add('active');
      const target = btn.getAttribute('data-tab');
      const panel = group.querySelector('[data-panel="' + target + '"]');
      if (panel) panel.classList.add('active');
    });
  });

  /* ---------- Back to Top ---------- */
  const topLink = document.getElementById('back-to-top');
  if (topLink) {
    topLink.addEventListener('click', function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---------- Search Overlay ---------- */
  var overlay   = document.getElementById('search-overlay');
  var backdrop  = document.getElementById('search-backdrop');
  var input     = document.getElementById('search-input');
  var results   = document.getElementById('search-results');
  var closeBtn  = document.getElementById('search-close');

  if (!overlay) return;

  var fuse       = null;
  var fuseReady  = false;

  function openOverlay() {
    overlay.classList.add('is-open');
    document.body.classList.add('search-open');
    input.focus();
    if (!fuseReady) loadFuse();
  }

  function closeOverlay() {
    overlay.classList.remove('is-open');
    document.body.classList.remove('search-open');
  }

  function loadFuse() {
    fuseReady = true;
    var s = document.createElement('script');
    s.src = 'https://cdn.jsdelivr.net/npm/fuse.js@7/dist/fuse.min.js';
    s.onload = function () {
      fetch('/index.json')
        .then(function (r) { return r.json(); })
        .then(function (data) {
          fuse = new Fuse(data, {
            keys: [
              { name: 'title',      weight: 0.7 },
              { name: 'summary',    weight: 0.3 },
              { name: 'categories', weight: 0.1 },
              { name: 'tags',       weight: 0.1 }
            ],
            includeScore: true,
            threshold: 0.4
          });
          var val = input.value.trim();
          if (val) renderResults(fuse.search(val));
        });
    };
    document.head.appendChild(s);
  }

  // Open buttons (data-search-open)
  document.querySelectorAll('[data-search-open]').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      openOverlay();
    });
  });

  closeBtn.addEventListener('click', closeOverlay);
  backdrop.addEventListener('click', closeOverlay);

  // Keyboard shortcuts
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && overlay.classList.contains('is-open')) {
      closeOverlay();
      return;
    }
    if ((e.key === '/' || (e.ctrlKey && e.key === 'k')) &&
        !overlay.classList.contains('is-open') &&
        document.activeElement.tagName !== 'INPUT' &&
        document.activeElement.tagName !== 'TEXTAREA') {
      e.preventDefault();
      openOverlay();
    }
  });

  // Live search
  input.addEventListener('input', function () {
    var val = this.value.trim();
    if (!fuse) return;
    if (!val) { results.innerHTML = ''; return; }
    renderResults(fuse.search(val));
  });

  // Close on result click
  results.addEventListener('click', function (e) {
    if (e.target.closest('.search-result')) closeOverlay();
  });

  function renderResults(items) {
    if (!items.length) {
      results.innerHTML = '<p class="search-overlay__empty">Keine Ergebnisse gefunden.</p>';
      return;
    }
    results.innerHTML = items.slice(0, 8).map(function (r) {
      var p    = r.item;
      var cats = (p.categories || []).map(function (c) {
        return '<span class="pill pill--primary" style="font-size:11px;padding:2px 8px;">' + c + '</span>';
      }).join('');
      return '<a class="search-result" href="' + p.url + '">'
        + '<div class="search-result__title">'   + p.title + '</div>'
        + '<div class="search-result__meta">'    + p.date + (cats ? '&nbsp;&nbsp;' + cats : '') + '</div>'
        + (p.summary ? '<p class="search-result__summary">' + p.summary + '</p>' : '')
        + '</a>';
    }).join('');
  }

});
