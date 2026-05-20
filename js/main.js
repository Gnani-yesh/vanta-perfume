(function () {
  'use strict';

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var nav    = document.getElementById('nav');

  /* ── NAV: add scrolled class on scroll ── */
  window.addEventListener('scroll', function () {
    if (nav) nav.classList.toggle('scrolled', window.scrollY > 24);
  }, { passive: true });

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
      threshold: 0.14,
      rootMargin: '0px 0px -40px 0px'
    });

    revealTargets.forEach(function (el) { io.observe(el); });
  } else {
    /* Fallback for browsers without IntersectionObserver */
    revealTargets.forEach(function (el) { el.classList.add('in'); });
  }

})();
