(function () {
    var FORM_EMAIL = 'jordan.join@icloud.com';

    var $ = function (sel) { return document.querySelector(sel); };

    var envelopeScreen = $('#envelope-screen');
    var videoScreen = $('#video-screen');
    var cardScreen = $('#card-screen');
    var audio = $('#open-sound');
    var video = $('#invitation-video');
    var openBtn = $('#open-btn');
    var skipBtn = $('#skip-video');
    var playFallback = $('#play-fallback');
    var form = $('#rsvp-form');
    var successEl = $('#rsvp-success');
    var particlesContainer = $('#particles');

    var videoAvailable = true;

    video.addEventListener('error', function () { videoAvailable = false; });
    var videoSource = video.querySelector('source');
    if (videoSource) {
        videoSource.addEventListener('error', function () { videoAvailable = false; });
    }

    // Particles
    for (var i = 0; i < 15; i++) {
        var p = document.createElement('div');
        p.className = 'particle';
        p.style.left = Math.random() * 100 + '%';
        p.style.setProperty('--p-opacity', (Math.random() * 0.3 + 0.08).toFixed(2));
        p.style.setProperty('--p-drift', (Math.random() * 50 - 25) + 'px');
        p.style.animationDuration = (Math.random() * 10 + 6) + 's';
        p.style.animationDelay = (Math.random() * 8) + 's';
        var size = Math.random() * 4 + 2;
        p.style.width = size + 'px';
        p.style.height = size + 'px';
        particlesContainer.appendChild(p);
    }

    function switchScreen(from, to) {
        from.classList.remove('active');
        to.classList.add('active');
    }

    function showCard() {
        if (cardScreen.classList.contains('active')) return;
        video.pause();
        switchScreen(videoScreen, cardScreen);
    }

    function showVideo() {
        if (videoScreen.classList.contains('active') || cardScreen.classList.contains('active')) return;

        if (!videoAvailable) {
            switchScreen(envelopeScreen, cardScreen);
            return;
        }

        switchScreen(envelopeScreen, videoScreen);

        var playPromise = video.play();
        if (playPromise) {
            playPromise.catch(function () {
                playFallback.classList.remove('hidden');
            });
        }
    }

    openBtn.addEventListener('click', function () {
        var wrapper = openBtn.parentElement;
        wrapper.classList.add('opening');

        audio.play().catch(function () {});

        audio.addEventListener('ended', function () {
            setTimeout(showVideo, 300);
        }, { once: true });

        setTimeout(function () {
            if (!videoScreen.classList.contains('active') && !cardScreen.classList.contains('active')) {
                showVideo();
            }
        }, 4000);
    });

    video.addEventListener('ended', showCard);

    skipBtn.addEventListener('click', showCard);

    playFallback.addEventListener('click', function () {
        playFallback.classList.add('hidden');
        video.play();
    });

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        var name = form.querySelector('input[name="prenom"]').value.trim();
        if (!name) return;

        fetch('https://formsubmit.co/ajax/' + FORM_EMAIL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                prenom: name,
                _subject: 'RSVP - ' + name + ' sera present aux 30 ans !',
                _captcha: 'false',
                _template: 'box'
            })
        }).catch(function () {});

        form.remove();
        successEl.classList.remove('hidden');
    });
})();
