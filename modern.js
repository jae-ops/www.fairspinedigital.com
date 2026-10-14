/* Fairspine modern layer: line icons, 3D tilt, nav state, 3D hero loader. */
(function () {
  'use strict';
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  var ICONS = {"zap":"<path d=\"M15.914 4a1.5 1.5 0 00-2.474-1.561l-9 9A1.5 1.5 0 005.5 14h4.002a.5.5 0 01.471.666L8.086 20a1.5 1.5 0 002.475 1.56l9-9A1.5 1.5 0 0018.5 10h-3.997a.5.5 0 01-.472-.667z\" />","mail":"<path d=\"m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7\" /> <rect x=\"2\" y=\"4\" width=\"20\" height=\"16\" rx=\"2\" />","sparkles":"<path d=\"M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z\" /> <path d=\"M20 2v4\" /> <path d=\"M22 4h-4\" /> <circle cx=\"4\" cy=\"20\" r=\"2\" />","arrow-right":"<path d=\"M5 12h14\" /> <path d=\"m12 5 7 7-7 7\" />","earth":"<path d=\"M21.54 15H17a2 2 0 0 0-2 2v4.54\" /> <path d=\"M7 3.34V5a3 3 0 0 0 3 3a2 2 0 0 1 2 2c0 1.1.9 2 2 2a2 2 0 0 0 2-2c0-1.1.9-2 2-2h3.17\" /> <path d=\"M11 21.95V18a2 2 0 0 0-2-2a2 2 0 0 1-2-2v-1a2 2 0 0 0-2-2H2.05\" /> <circle cx=\"12\" cy=\"12\" r=\"10\" />","globe":"<circle cx=\"12\" cy=\"12\" r=\"10\" /> <path d=\"M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20\" /> <path d=\"M2 12h20\" />","graduation-cap":"<path d=\"M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z\" /> <path d=\"M22 10v6\" /> <path d=\"M6 12.5V16a6 3 0 0 0 12 0v-3.5\" />","palette":"<path d=\"M12 22a1 1 0 0 1 0-20 10 9 0 0 1 10 9 5 5 0 0 1-5 5h-2.25a1.75 1.75 0 0 0-1.4 2.8l.3.4a1.75 1.75 0 0 1-1.4 2.8z\" /> <circle cx=\"13.5\" cy=\"6.5\" r=\".5\" fill=\"currentColor\" /> <circle cx=\"17.5\" cy=\"10.5\" r=\".5\" fill=\"currentColor\" /> <circle cx=\"6.5\" cy=\"12.5\" r=\".5\" fill=\"currentColor\" /> <circle cx=\"8.5\" cy=\"7.5\" r=\".5\" fill=\"currentColor\" />","target":"<circle cx=\"12\" cy=\"12\" r=\"10\" /> <circle cx=\"12\" cy=\"12\" r=\"6\" /> <circle cx=\"12\" cy=\"12\" r=\"2\" />","house":"<path d=\"M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8\" /> <path d=\"M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z\" />","building-2":"<path d=\"M10 12h4\" /> <path d=\"M10 8h4\" /> <path d=\"M14 21v-3a2 2 0 0 0-4 0v3\" /> <path d=\"M6 10H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-2\" /> <path d=\"M6 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16\" />","eye":"<path d=\"M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0\" /> <circle cx=\"12\" cy=\"12\" r=\"3\" />","lightbulb":"<path d=\"M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5\" /> <path d=\"M9 18h6\" /> <path d=\"M10 22h4\" />","coins":"<path d=\"M13.744 17.736a6 6 0 1 1-7.48-7.48\" /> <path d=\"M15 6h1v4\" /> <path d=\"m6.134 14.768.866-.5 2 3.464\" /> <circle cx=\"16\" cy=\"8\" r=\"6\" />","laptop":"<path d=\"M18 5a2 2 0 0 1 2 2v8.526a2 2 0 0 0 .212.897l1.068 2.127a1 1 0 0 1-.9 1.45H3.62a1 1 0 0 1-.9-1.45l1.068-2.127A2 2 0 0 0 4 15.526V7a2 2 0 0 1 2-2z\" /> <path d=\"M20.054 15.987H3.946\" />","trending-up":"<path d=\"M16 7h6v6\" /> <path d=\"m22 7-8.5 8.5-5-5L2 17\" />","chart-column":"<path d=\"M3 3v16a2 2 0 0 0 2 2h16\" /> <path d=\"M18 17V9\" /> <path d=\"M13 17V5\" /> <path d=\"M8 17v-3\" />","pen-line":"<path d=\"M13 21h8\" /> <path d=\"M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z\" />","phone":"<path d=\"M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384\" />","satellite-dish":"<path d=\"M18 12a6 6 0 00-6-6\" /> <path d=\"M2.824 10.459a8 8 0 0010.717 10.717c.558-.276.623-1.012.183-1.452l-9.448-9.448c-.44-.44-1.176-.375-1.452.183\" /> <path d=\"M22 12A10 10 0 0012 2\" /> <path d=\"m9 15 4-4\" />","smartphone":"<rect width=\"14\" height=\"20\" x=\"5\" y=\"2\" rx=\"2\" ry=\"2\" /> <path d=\"M12 18h.01\" />","refresh-cw":"<path d=\"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8\" /> <path d=\"M21 3v5h-5\" /> <path d=\"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16\" /> <path d=\"M8 16H3v5\" />","search":"<path d=\"m21 21-4.34-4.34\" /> <circle cx=\"11\" cy=\"11\" r=\"8\" />","flame":"<path d=\"M12 3q1 4 4 6.5t3 5.5a1 1 0 0 1-14 0 5 5 0 0 1 1-3 1 1 0 0 0 5 0c0-2-1.5-3-1.5-5q0-2 2.5-4\" />","shopping-bag":"<path d=\"M16 10a4 4 0 0 1-8 0\" /> <path d=\"M3.103 6.034h17.794\" /> <path d=\"M3.4 5.467a2 2 0 0 0-.4 1.2V20a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6.667a2 2 0 0 0-.4-1.2l-2-2.667A2 2 0 0 0 17 2H7a2 2 0 0 0-1.6.8z\" />","handshake":"<path d=\"m11 17 2 2a1 1 0 1 0 3-3\" /> <path d=\"m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4\" /> <path d=\"m21 3 1 11h-2\" /> <path d=\"M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3\" /> <path d=\"M3 4h8\" />","user-round":"<circle cx=\"12\" cy=\"8\" r=\"5\" /> <path d=\"M20 21a8 8 0 0 0-16 0\" />"};
  var EMOJI = {"9889":"zap","9993":"mail","10024":"sparkles","127757":"earth","127758":"earth","127759":"earth","127760":"globe","127891":"graduation-cap","127912":"palette","127919":"target","127960":"house","127970":"building-2","128065":"eye","128161":"lightbulb","128176":"coins","128187":"laptop","128200":"trending-up","128202":"chart-column","128221":"pen-line","128222":"phone","128225":"satellite-dish","128241":"smartphone","128260":"refresh-cw","128269":"search","128293":"flame","128717":"shopping-bag","129309":"handshake","129492":"user-round"};

  function iconSvg(name, size) {
    return '<svg class="mi" viewBox="0 0 24 24" width="' + size + '" height="' + size +
      '" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
      ICONS[name] + '</svg>';
  }
  window.__fsIcon = iconSvg;

  /* 1. Replace emoji icons with line icons ------------------------------- */
  var ICON_SELECTORS = [
    '.sc-icon', '.pv-card .icon', '.region-card > div:first-child',
    '[style*="font-size:1.5rem;margin-bottom:0.75rem"]',
    '[style*="font-size:2rem;margin-bottom:0.75rem"]'
  ].join(',');
  document.querySelectorAll(ICON_SELECTORS).forEach(function (el) {
    if (el.querySelector('svg')) return;
    var txt = (el.textContent || '').replace(/[️\s]/g, '');
    var chars = Array.from(txt);
    if (chars.length !== 1) return;
    var name = EMOJI[chars[0].codePointAt(0)];
    if (!name) return;
    el.innerHTML = iconSvg(name, 24);
    el.classList.add('mi-tile');
    el.removeAttribute('aria-hidden');
  });

  /* 2. Nav state ---------------------------------------------------------- */
  var nav = document.querySelector('nav');
  if (nav) {
    var onScroll = function () { nav.classList.toggle('is-scrolled', window.scrollY > 12); };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* 3. 3D tilt on cards --------------------------------------------------- */
  if (finePointer && !reduceMotion) {
    var TILT = '.service-card,.pv-card,.job-card,.how-step,[data-tilt]';
    document.querySelectorAll(TILT).forEach(function (el) {
      var raf = 0, rect = null;
      el.classList.add('tilt');
      el.addEventListener('pointerenter', function () {
        rect = el.getBoundingClientRect();
        el.style.transition = 'transform .14s ease-out, box-shadow .3s, border-color .25s';
      });
      el.addEventListener('pointermove', function (e) {
        if (!rect) rect = el.getBoundingClientRect();
        var x = (e.clientX - rect.left) / rect.width;
        var y = (e.clientY - rect.top) / rect.height;
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(function () {
          el.style.transform = 'perspective(900px) rotateX(' + (-(y - 0.5) * 11).toFixed(2) + 'deg) rotateY(' +
            ((x - 0.5) * 13).toFixed(2) + 'deg) scale3d(1.02,1.02,1.02)';
          el.style.setProperty('--mx', (x * 100).toFixed(1) + '%');
          el.style.setProperty('--my', (y * 100).toFixed(1) + '%');
        });
      });
      el.addEventListener('pointerleave', function () {
        rect = null;
        cancelAnimationFrame(raf);
        el.style.transition = 'transform .7s cubic-bezier(.2,.8,.2,1), box-shadow .3s, border-color .25s';
        el.style.transform = '';
      });
    });
  }

  /* 4. 3D hero ------------------------------------------------------------ */
  var stage = document.getElementById('hero3d-stage');
  if (stage) {
    var hero = stage.closest('.hero3d');
    var chips = Array.prototype.slice.call(stage.querySelectorAll('[data-depth]'));
    var pm = { x: 0, y: 0, tx: 0, ty: 0 }, chipRaf = 0;

    var fallback = function () { stage.classList.add('is-static'); };

    var loadScene = function () {
      import('/assets/hero3d.js?v=1').then(function (m) {
        var api = m.initHero3D(stage.querySelector('.hero3d__canvas'), { reduceMotion: reduceMotion });
        if (!api) return fallback();
        stage.classList.add('is-live');
        stage.querySelector('.hero3d__canvas').addEventListener('hero3d:lost', fallback);
      }).catch(fallback);
    };
    if ('requestIdleCallback' in window) requestIdleCallback(loadScene, { timeout: 900 });
    else setTimeout(loadScene, 250);

    if (!reduceMotion && finePointer && chips.length) {
      window.addEventListener('pointermove', function (e) {
        var r = stage.getBoundingClientRect();
        pm.tx = Math.max(-1.3, Math.min(1.3, ((e.clientX - r.left) / r.width - 0.5) * 2));
        pm.ty = Math.max(-1.3, Math.min(1.3, ((e.clientY - r.top) / r.height - 0.5) * 2));
        if (!chipRaf) chipRaf = requestAnimationFrame(tick);
      }, { passive: true });
      var tick = function () {
        chipRaf = 0;
        pm.x += (pm.tx - pm.x) * 0.12; pm.y += (pm.ty - pm.y) * 0.12;
        chips.forEach(function (c) {
          var d = parseFloat(c.getAttribute('data-depth')) || 1;
          c.style.transform = 'translate3d(' + (pm.x * d * 20).toFixed(1) + 'px,' + (pm.y * d * 14).toFixed(1) + 'px,' + (d * 40) + 'px)';
        });
        if (Math.abs(pm.tx - pm.x) > 0.002 || Math.abs(pm.ty - pm.y) > 0.002) chipRaf = requestAnimationFrame(tick);
      };
    }
  }
})();
