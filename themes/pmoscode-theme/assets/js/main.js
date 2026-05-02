/* main.js – pmoscode-theme interactions */

document.addEventListener('DOMContentLoaded', function () {

  /* ---------- Dropdown Menu ---------- */
  document.querySelectorAll('.site-nav__item--dropdown').forEach(function (item) {
    item.addEventListener('click', function (e) {
      const link = item.querySelector('.site-nav__link');
      if (e.target === link || link.contains(e.target)) {
        e.preventDefault();
        item.classList.toggle('open');
      }
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

});
