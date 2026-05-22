(function () {
  'use strict';

  var reduce  = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var nav     = document.getElementById('nav');
  var burger  = document.getElementById('nav-burger');
  var overlay = document.getElementById('nav-overlay');

  /* ── NAV: add scrolled class on scroll ── */
  window.addEventListener('scroll', function () {
    if (nav) nav.classList.toggle('scrolled', window.scrollY > 24);
  }, { passive: true });

  /* ── MOBILE NAV OVERLAY ── */
  if (burger && overlay) {
    function openMenu() {
      overlay.classList.add('open');
      overlay.setAttribute('aria-hidden', 'false');
      burger.classList.add('open');
      burger.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    }
    function closeMenu() {
      overlay.classList.remove('open');
      overlay.setAttribute('aria-hidden', 'true');
      burger.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
    burger.addEventListener('click', function () {
      overlay.classList.contains('open') ? closeMenu() : openMenu();
    });
    overlay.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeMenu();
    });
  }

  /* ── HERO PHOTO: subtle horizontal parallax on mousemove ── */
  if (!reduce && window.innerWidth > 560) {
    var photo = document.querySelector('.hero-photo');
    if (photo) {
      var tx = 0, cx = 0;

      window.addEventListener('mousemove', function (e) {
        tx = ((e.clientX / window.innerWidth) - 0.5) * 18;
      }, { passive: true });

      (function lerp() {
        cx += (tx - cx) * 0.05;
        photo.style.transform = 'translateX(' + cx.toFixed(2) + 'px) scale(1.04)';
        requestAnimationFrame(lerp);
      })();
    }
  }

  /* ── SCROLL REVEAL: IntersectionObserver ── */
  var revealTargets = document.querySelectorAll(
    '[data-reveal], .art-of, .ingredients, .showcase, .details, .campaign, .col-grid, .final-cta'
  );

  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    revealTargets.forEach(function (el) { io.observe(el); });
  } else {
    revealTargets.forEach(function (el) { el.classList.add('in'); });
  }

})();
