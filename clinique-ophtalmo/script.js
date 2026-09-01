(function () {
  // Loader liquide "O." — une fois par session
  var loader = document.getElementById('loader');
  if (loader) {
    if (sessionStorage.getItem('ophtaLoaderPlayed')) {
      loader.style.display = 'none';
    } else {
      document.body.style.overflow = 'hidden';
      setTimeout(function () {
        loader.classList.add('loader-out');
        document.body.style.overflow = '';
        sessionStorage.setItem('ophtaLoaderPlayed', '1');
        setTimeout(function () { loader.style.display = 'none'; }, 650);
      }, 2300);
    }
  }

  // Homepage hero (mobile only): after the intro, glide gently down to
  // the first paragraph instead of leaving the visitor stuck on the hero
  var heroSection = document.querySelector('.hero');
  var firstParagraph = document.querySelector('.soins-intro-text p');
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (heroSection && firstParagraph && window.innerWidth <= 900 && !reduceMotion) {
    var autoScrollCancelled = false;
    function cancelAutoScroll() { autoScrollCancelled = true; }
    window.addEventListener('wheel', cancelAutoScroll, { passive: true, once: true });
    window.addEventListener('touchstart', cancelAutoScroll, { passive: true, once: true });

    function easeInOutSine(t) { return -(Math.cos(Math.PI * t) - 1) / 2; }

    function glideToFirstParagraph() {
      if (autoScrollCancelled) return;
      var startY = window.scrollY;
      var targetY = firstParagraph.getBoundingClientRect().top + startY - 24;
      var distance = targetY - startY;
      if (distance <= 0) return;
      var duration = 2200;
      var startTime = null;

      function step(timestamp) {
        if (autoScrollCancelled) return;
        if (startTime === null) startTime = timestamp;
        var progress = Math.min((timestamp - startTime) / duration, 1);
        window.scrollTo(0, startY + distance * easeInOutSine(progress));
        if (progress < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    }

    // Give the loader (if it's playing) time to clear before gliding
    var loaderAlreadyPlayed = sessionStorage.getItem('ophtaLoaderPlayed');
    setTimeout(glideToFirstParagraph, loaderAlreadyPlayed ? 900 : 3200);
  }

  // Nav scroll state
  var nav = document.querySelector('header.site-nav');
  function onScroll() {
    if (!nav) return;
    if (window.scrollY > 40) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Mobile menu
  var burger = document.getElementById('burger');
  var mobileMenu = document.getElementById('mobileMenu');
  if (burger && mobileMenu) {
    burger.addEventListener('click', function () {
      mobileMenu.classList.toggle('open');
      burger.classList.toggle('open');
    });
    mobileMenu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        mobileMenu.classList.remove('open');
        burger.classList.remove('open');
      });
    });
  }

  // Reveal on scroll
  var reveals = document.querySelectorAll('.reveal');
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry, i) {
      if (entry.isIntersecting) {
        setTimeout(function () { entry.target.classList.add('visible'); }, i * 70);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  reveals.forEach(function (r) { observer.observe(r); });
  // Safety net: never leave content stuck invisible if the observer
  // doesn't fire (unsupported browser, oversized target, etc.)
  setTimeout(function () {
    reveals.forEach(function (r) { r.classList.add('visible'); });
  }, 2000);

  // Testimonials horizontal scroll arrows
  var track = document.querySelector('.testi-track');
  var prevBtn = document.querySelector('.testi-prev');
  var nextBtn = document.querySelector('.testi-next');
  if (track && prevBtn && nextBtn) {
    var scrollAmount = 320;
    nextBtn.addEventListener('click', function () { track.scrollBy({ left: scrollAmount, behavior: 'smooth' }); });
    prevBtn.addEventListener('click', function () { track.scrollBy({ left: -scrollAmount, behavior: 'smooth' }); });

    function updateArrows() {
      var maxScroll = track.scrollWidth - track.clientWidth;
      prevBtn.disabled = track.scrollLeft <= 4;
      nextBtn.disabled = track.scrollLeft >= maxScroll - 4;
    }
    track.addEventListener('scroll', updateArrows, { passive: true });
    window.addEventListener('resize', updateArrows);
    updateArrows();
  }
})();
