(function () {
  'use strict';

  var _docHandlersInit = false;

  function initNav() {
    var shopItem    = document.querySelector('.hcnv-shop-item');
    var mmOverlay   = document.querySelector('.hcnv-mm-overlay');
    var shopTrigger = document.querySelector('.hcnv-shop-trigger');
    var mobDrawer   = document.querySelector('.hcnv-mob-drawer');
    var mobOverlay  = document.querySelector('.hcnv-mob-overlay');
    var mobHam      = document.querySelector('.hcnv-mob-ham');
    var mobClose    = document.querySelector('.hcnv-mob-close');

    if (!shopItem && !mobHam) return;

    function openMenu() {
      if (!shopItem) return;
      shopItem.classList.add('open');
      if (mmOverlay) mmOverlay.classList.add('visible');
      if (shopTrigger) shopTrigger.setAttribute('aria-expanded', 'true');
    }

    function closeMenu() {
      if (!shopItem) return;
      shopItem.classList.remove('open');
      if (mmOverlay) mmOverlay.classList.remove('visible');
      if (shopTrigger) shopTrigger.setAttribute('aria-expanded', 'false');
    }

    function openMobMenu() {
      if (mobDrawer) mobDrawer.classList.add('open');
      if (mobOverlay) mobOverlay.classList.add('visible');
      if (mobHam) mobHam.classList.add('open');
      document.body.style.overflow = 'hidden';
    }

    function closeMobMenu() {
      if (mobDrawer) mobDrawer.classList.remove('open');
      if (mobOverlay) mobOverlay.classList.remove('visible');
      if (mobHam) mobHam.classList.remove('open');
      document.body.style.overflow = '';
    }

    if (shopTrigger) {
      shopTrigger.addEventListener('click', function (e) {
        e.stopPropagation();
        shopItem.classList.contains('open') ? closeMenu() : openMenu();
      });
    }

    if (mmOverlay) {
      mmOverlay.addEventListener('click', closeMenu);
    }

    if (shopItem) {
      shopItem.addEventListener('mouseenter', function () {
        if (window.innerWidth > 767) openMenu();
      });
      shopItem.addEventListener('mouseleave', function () {
        setTimeout(function () {
          if (shopItem && !shopItem.matches(':hover')) closeMenu();
        }, 120);
      });
    }

    if (mobHam) {
      mobHam.addEventListener('click', function () {
        mobDrawer && mobDrawer.classList.contains('open') ? closeMobMenu() : openMobMenu();
      });
    }

    if (mobOverlay) {
      mobOverlay.addEventListener('click', closeMobMenu);
    }

    if (mobClose) {
      mobClose.addEventListener('click', closeMobMenu);
    }

    if (mobDrawer) {
      mobDrawer.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', closeMobMenu);
      });
    }

    // Close desktop mega menu when any link inside it is clicked
    if (shopItem) {
      shopItem.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', closeMenu);
      });
    }

    if (!_docHandlersInit) {
      _docHandlersInit = true;

      // Re-query DOM on each event so stale closures don't break after section reloads
      document.addEventListener('keydown', function (e) {
        if (e.key !== 'Escape') return;
        var si = document.querySelector('.hcnv-shop-item');
        var ov = document.querySelector('.hcnv-mm-overlay');
        var tr = document.querySelector('.hcnv-shop-trigger');
        if (si) si.classList.remove('open');
        if (ov) ov.classList.remove('visible');
        if (tr) tr.setAttribute('aria-expanded', 'false');
        var md = document.querySelector('.hcnv-mob-drawer');
        var mo = document.querySelector('.hcnv-mob-overlay');
        var mh = document.querySelector('.hcnv-mob-ham');
        if (md) md.classList.remove('open');
        if (mo) mo.classList.remove('visible');
        if (mh) mh.classList.remove('open');
        document.body.style.overflow = '';
      });

      document.addEventListener('click', function (e) {
        var si = document.querySelector('.hcnv-shop-item');
        if (si && !si.contains(e.target)) {
          si.classList.remove('open');
          var ov = document.querySelector('.hcnv-mm-overlay');
          if (ov) ov.classList.remove('visible');
          var tr = document.querySelector('.hcnv-shop-trigger');
          if (tr) tr.setAttribute('aria-expanded', 'false');
        }
      });
    }
  }

  document.addEventListener('DOMContentLoaded', initNav);
  document.addEventListener('shopify:section:load', initNav);
})();
