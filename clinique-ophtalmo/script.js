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
