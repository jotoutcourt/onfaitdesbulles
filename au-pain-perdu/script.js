(function () {
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
        setTimeout(function () { entry.target.classList.add('visible'); }, i * 60);
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

  // Stickers pop in with a little stagger when their section enters view
  var stickers = document.querySelectorAll('.sticker');
  if (stickers.length) {
    var stickerObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal');
          stickerObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    stickers.forEach(function (s) { stickerObserver.observe(s); });
  }

  // Stickers can be peeled off and stuck anywhere on the page (mouse + touch),
  // and dropping one onto the wave-banner makes it ride the scrolling text
  var waveBanner = document.querySelector('.wave-banner');
  var waveSvg = waveBanner ? waveBanner.querySelector('svg') : null;
  var wavePath = document.getElementById('wavePath');
  var WAVE_DUR = 22;

  function makeDraggable(sticker) {
    var dragging = false, offsetX = 0, offsetY = 0;

    function startDrag(e) {
      try {
        sticker.setPointerCapture(e.pointerId);
      } catch (err) {
        return; // no valid pointer session — bail out before touching drag state
      }
      dragging = true;
      sticker.classList.add('dragging');

      var rect = sticker.getBoundingClientRect();
      offsetX = e.clientX - rect.left;
      offsetY = e.clientY - rect.top;

      // Detach from its original spot so it can be stuck anywhere on the page,
      // but keep it visually exactly where it already was.
      if (sticker.parentElement !== document.body) {
        sticker.style.width = rect.width + 'px';
        // Stop any resting bob/float loop — but the sticker's pop-in entrance
        // also relies on an animation (fill-mode:both) to hold opacity:1 against
        // the base .reveal{opacity:0} rule, so pin opacity explicitly or killing
        // the animation makes it vanish.
        sticker.style.animation = 'none';
        sticker.style.opacity = '1';
        document.body.appendChild(sticker);
        sticker.style.left = (rect.left + window.scrollX) + 'px';
        sticker.style.top = (rect.top + window.scrollY) + 'px';

        // The hero mascot's "colle-moi où tu veux" hint has done its job once grabbed
        if (sticker.classList.contains('hero-mascot')) {
          var hint = document.querySelector('.hint-arrow');
          if (hint) hint.style.transition = 'opacity 0.4s ease', hint.style.opacity = '0';
        }
      }
    }

    sticker.addEventListener('pointerdown', startDrag);

    window.addEventListener('pointermove', function (e) {
      if (!dragging) return;
      sticker.style.left = (e.clientX - offsetX + window.scrollX) + 'px';
      sticker.style.top = (e.clientY - offsetY + window.scrollY) + 'px';
    });

    window.addEventListener('pointerup', function (e) {
      if (!dragging) return;
      dragging = false;
      sticker.classList.remove('dragging');
      if (sticker.hasPointerCapture && sticker.hasPointerCapture(e.pointerId)) {
        sticker.releasePointerCapture(e.pointerId);
      }

      if (waveBanner && wavePath) {
        var waveRect = waveBanner.getBoundingClientRect();
        if (e.clientX >= waveRect.left && e.clientX <= waveRect.right && e.clientY >= waveRect.top && e.clientY <= waveRect.bottom) {
          attachToWave(sticker, e.clientX, e.clientY);
        }
      }
    });

    return startDrag;
  }

  // Glue a dropped sticker onto the wavy text path, riding it in sync with the marquee
  function attachToWave(sticker, clientX, clientY) {
    var pt = waveSvg.createSVGPoint();
    pt.x = clientX;
    pt.y = clientY;
    var local = pt.matrixTransform(waveSvg.getScreenCTM().inverse());

    var totalLen = wavePath.getTotalLength();
    var samples = 150;
    var bestLen = 0, bestDist = Infinity;
    for (var i = 0; i <= samples; i++) {
      var len = (i / samples) * totalLen;
      var p = wavePath.getPointAtLength(len);
      var dx = p.x - local.x, dy = p.y - local.y;
      var dist = dx * dx + dy * dy;
      if (dist < bestDist) { bestDist = dist; bestLen = len; }
    }
    var beginOffset = -((bestLen / totalLen) * WAVE_DUR);

    var ns = 'http://www.w3.org/2000/svg';
    var ratio = (sticker.naturalWidth && sticker.naturalHeight) ? (sticker.naturalWidth / sticker.naturalHeight) : 1;
    var h = 56, w = h * ratio;
    var image = document.createElementNS(ns, 'image');
    image.setAttribute('href', sticker.getAttribute('src'));
    image.setAttribute('width', w);
    image.setAttribute('height', h);
    image.setAttribute('x', -w / 2);
    image.setAttribute('y', -h / 2);
    image.setAttribute('class', 'wave-riding-sticker');

    var animateMotion = document.createElementNS(ns, 'animateMotion');
    animateMotion.setAttribute('dur', WAVE_DUR + 's');
    animateMotion.setAttribute('repeatCount', 'indefinite');
    animateMotion.setAttribute('begin', beginOffset + 's');
    animateMotion.setAttribute('rotate', 'auto');

    var mpath = document.createElementNS(ns, 'mpath');
    mpath.setAttribute('href', '#wavePath');
    animateMotion.appendChild(mpath);
    image.appendChild(animateMotion);
    waveSvg.appendChild(image);

    var src = sticker.getAttribute('src');
    sticker.remove();

    // Grabbing the riding sticker peels it back off the wave into a free sticker
    image.addEventListener('pointerdown', function (e) {
      var rect = image.getBoundingClientRect();
      image.remove();

      var freed = document.createElement('img');
      freed.className = 'sticker';
      freed.src = src;
      freed.alt = '';
      freed.style.position = 'absolute';
      freed.style.width = rect.width + 'px';
      freed.style.left = (rect.left + window.scrollX) + 'px';
      freed.style.top = (rect.top + window.scrollY) + 'px';
      freed.style.opacity = '1';
      document.body.appendChild(freed);

      var startDrag = makeDraggable(freed);
      startDrag(e);
    });
  }

  stickers.forEach(makeDraggable);

  // Cursor image trail: a pool of recycled images that follow the mouse,
  // reused on "Notre histoire" (story text) and the "carte" menu frame
  function setupImageTrail(zone, images) {
    if (!zone) return;
    var POOL_SIZE = 3;
    var MIN_DISTANCE = 90;
    var pool = [];
    for (var i = 0; i < POOL_SIZE; i++) {
      var img = document.createElement('img');
      img.className = 'trail-img';
      zone.appendChild(img);
      pool.push(img);
    }
    var poolIndex = 0, imgIndex = 0, lastX = null, lastY = null;
    zone.addEventListener('mousemove', function (e) {
      var rect = zone.getBoundingClientRect();
      var x = e.clientX - rect.left;
      var y = e.clientY - rect.top;
      if (lastX !== null && Math.hypot(x - lastX, y - lastY) < MIN_DISTANCE) return;
      lastX = x; lastY = y;
      var el = pool[poolIndex];
      el.src = images[imgIndex % images.length];
      el.style.left = x + 'px';
      el.style.top = y + 'px';
      el.style.opacity = '1';
      poolIndex = (poolIndex + 1) % POOL_SIZE;
      imgIndex++;
    });
    zone.addEventListener('mouseleave', function () {
      pool.forEach(function (el) { el.style.opacity = '0'; });
      lastX = null; lastY = null;
    });
  }
  setupImageTrail(document.getElementById('heroTrail'), ['assets/plats/plat1.png', 'assets/plats/plat2.png', 'assets/plats/plat3.png', 'assets/plats/plat5.png', 'assets/plats/plat6.png']);
})();
