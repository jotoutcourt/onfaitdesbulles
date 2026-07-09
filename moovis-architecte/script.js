(function () {
  // Loader "plan d'architecte" — une fois par session
  var loader = document.getElementById('loader');
  if (loader) {
    if (sessionStorage.getItem('moovisLoaderPlayed')) {
      loader.style.display = 'none';
    } else {
      document.body.style.overflow = 'hidden';
      setTimeout(function () {
        loader.classList.add('loader-out');
        document.body.style.overflow = '';
        sessionStorage.setItem('moovisLoaderPlayed', '1');
        setTimeout(function () { loader.style.display = 'none'; }, 750);
      }, 3400);
    }
  }

  // Mobile menu
  var burger = document.getElementById('burger');
  var mobileMenu = document.getElementById('mobileMenu');
  var mobileClose = document.getElementById('mobileClose');
  if (burger && mobileMenu) {
    burger.addEventListener('click', function () { mobileMenu.classList.add('open'); });
  }
  if (mobileClose && mobileMenu) {
    mobileClose.addEventListener('click', function () { mobileMenu.classList.remove('open'); });
  }
  if (mobileMenu) {
    mobileMenu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { mobileMenu.classList.remove('open'); });
    });
  }

  // Typewriter effect for the story pull-quote — wraps each character in its
  // own span so the CSS stagger (.reveal.visible .tw-char) can type it in.
  var storyQuoteBq = document.querySelector('.story-quote blockquote');
  var twDuration = 0;
  if (storyQuoteBq) {
    var twChars = storyQuoteBq.textContent.split('');
    storyQuoteBq.innerHTML = twChars.map(function (ch, i) {
      if (ch === ' ') return ' ';
      var safe = ch.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
      return '<span class="tw-char" style="--i:' + i + '">' + safe + '</span>';
    }).join('') + '<span class="tw-cursor"></span>';
    twDuration = twChars.length * 26 + 300;
  }

  // Reveal on scroll
  var reveals = document.querySelectorAll('.reveal');
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry, i) {
      if (entry.isIntersecting) {
        setTimeout(function () {
          entry.target.classList.add('visible');
          var cursor = entry.target.querySelector('.tw-cursor');
          if (cursor) {
            setTimeout(function () { cursor.classList.add('tw-cursor-done'); }, twDuration);
          }
        }, i * 60);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  reveals.forEach(function (r) { observer.observe(r); });

  // Hero watermark parallax — rises slower than the page, then gets covered by the next section
  var watermark = document.querySelector('.hero-watermark');
  if (watermark && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    var ticking = false;
    function updateWatermarkParallax() {
      var y = window.scrollY;
      var lag = y * 0.45; // stays behind normal scroll speed -> feels like it lifts up slowly
      watermark.style.transform = 'translate(-50%, ' + Math.min(lag, 260) + 'px)';
      ticking = false;
    }
    window.addEventListener('scroll', function () {
      if (!ticking) { requestAnimationFrame(updateWatermarkParallax); ticking = true; }
    }, { passive: true });
    updateWatermarkParallax();
  }

  // Projects filter pills (purely visual demo filtering)
  var pills = document.querySelectorAll('.filter-pill');
  var items = document.querySelectorAll('[data-cat]');
  if (pills.length && items.length) {
    pills.forEach(function (pill) {
      pill.addEventListener('click', function () {
        pills.forEach(function (p) { p.classList.remove('active'); });
        pill.classList.add('active');
        var cat = pill.getAttribute('data-filter');
        items.forEach(function (item) {
          if (cat === 'all' || item.getAttribute('data-cat').indexOf(cat) !== -1) {
            item.style.display = '';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  }

  /* =====================================================================
     Popup projet — galerie photo + description.
     ===================================================================== */
  var PROJECTS_DATA = {
    'proj-1': {
      name: 'Villa L2', location: 'Ouest lyonnais', tags: ['Logement individuel', 'Neuf'],
      description: "Ré-interprétation contemporaine de la « Prairie House » des années 50.",
      images: ['images/projets/villa-l2/avant.jpg', 'images/projets/villa-l2/apres-1.jpg']
    },
    'proj-2': {
      name: 'Villa L1', location: 'Craponne', tags: ['Logement individuel', 'Neuf'],
      description: "Création d'une villa contemporaine avec toit-terrasse.",
      images: ['images/projets/villa-l1/apres-1.jpg', 'images/projets/villa-l1/apres-2.jpg', 'images/projets/villa-l1/apres-3.jpg']
    },
    'proj-3': {
      name: 'Immeuble RGB', location: 'Givors · 2017', tags: ['Logement collectif', 'Neuf', '2017'],
      description: "Ce projet d'immeuble de 1 786 m² répond à un besoin d'accessibilité PMR effective de la totalité des appartements et des espaces annexes d'habitation. La taille des treize appartements et des terrasses dépasse largement les standards habituels. Le dernier étage est occupé par un unique penthouse, avec piscine intérieure.",
      images: ['images/projets/immeuble-rgb/apres-1.jpg', 'images/projets/immeuble-rgb/apres-2.jpg', 'images/projets/immeuble-rgb/apres-3.jpg', 'images/projets/immeuble-rgb/apres-4.jpg', 'images/projets/immeuble-rgb/apres-5.jpg', 'images/projets/immeuble-rgb/apres-6.jpg', 'images/projets/immeuble-rgb/apres-7.jpg', 'images/projets/immeuble-rgb/apres-8.jpg', 'images/projets/immeuble-rgb/apres-9.jpg', 'images/projets/immeuble-rgb/apres-10.jpg', 'images/projets/immeuble-rgb/apres-11.jpg', 'images/projets/immeuble-rgb/apres-12.jpg', 'images/projets/immeuble-rgb/apres-13.jpg', 'images/projets/immeuble-rgb/apres-14.jpg']
    },
    'proj-4': {
      name: 'Villa Ia Orana', location: 'Crêches-sur-Saône · 2017', tags: ['Logement individuel', 'Neuf', '2017', '500 001 à 1 000 000 €'],
      description: "Villa contemporaine.",
      images: ['images/projets/villa-ia-orana/avant.jpg', 'images/projets/villa-ia-orana/apres-1.jpg', 'images/projets/villa-ia-orana/apres-2.jpg', 'images/projets/villa-ia-orana/apres-3.jpg', 'images/projets/villa-ia-orana/apres-4.jpg', 'images/projets/villa-ia-orana/apres-5.jpg', 'images/projets/villa-ia-orana/apres-6.jpg', 'images/projets/villa-ia-orana/apres-7.jpg', 'images/projets/villa-ia-orana/apres-8.jpg', 'images/projets/villa-ia-orana/apres-9.jpg', 'images/projets/villa-ia-orana/apres-10.jpg']
    },
    'proj-5': {
      name: 'Villa C1', location: 'Chaponost · 2017', tags: ['Logement individuel', 'Neuf', '2017', '100 001 à 250 000 €'],
      description: "Villa contemporaine et compacte, sur un terrain étroit et triangulaire, avec de grandes surfaces vitrées, une suite parentale en rez-de-jardin et trois chambres à l'étage.",
      images: ['images/projets/villa-c1/apres-1.jpg', 'images/projets/villa-c1/apres-2.jpg', 'images/projets/villa-c1/apres-3.jpg', 'images/projets/villa-c1/apres-4.jpg', 'images/projets/villa-c1/apres-5.jpg', 'images/projets/villa-c1/apres-6.jpg', 'images/projets/villa-c1/apres-7.jpg']
    },
    'proj-6': {
      name: 'Villa M2', location: 'Cournon-d\'Auvergne · 2014', tags: ['Logement individuel', 'Neuf', '2014', '250 001 à 500 000 €'],
      description: "Villa contemporaine.",
      images: ['images/projets/villa-m2/avant.jpg', 'images/projets/villa-m2/apres-1.jpg', 'images/projets/villa-m2/apres-2.jpg', 'images/projets/villa-m2/apres-3.jpg', 'images/projets/villa-m2/apres-4.jpg', 'images/projets/villa-m2/apres-5.jpg']
    },
    'proj-7': {
      name: 'Villa D1', location: 'Buxy · 2013', tags: ['Logement individuel', 'Neuf', '2013', '250 001 à 500 000 €'],
      description: "Villa contemporaine BBC, en secteur Monument Historique.",
      images: ['images/projets/villa-d1/apres-1.jpg', 'images/projets/villa-d1/apres-2.jpg', 'images/projets/villa-d1/apres-3.jpg', 'images/projets/villa-d1/apres-4.jpg', 'images/projets/villa-d1/apres-5.jpg', 'images/projets/villa-d1/apres-6.jpg', 'images/projets/villa-d1/apres-7.jpg', 'images/projets/villa-d1/apres-8.jpg', 'images/projets/villa-d1/apres-9.jpg', 'images/projets/villa-d1/apres-10.jpg', 'images/projets/villa-d1/apres-11.jpg']
    },
    'proj-8': {
      name: 'Villa V1', location: 'Chaponost · 2012', tags: ['Logement individuel', 'Neuf', '2012', '100 001 à 250 000 €'],
      description: "Villa contemporaine et compacte.",
      images: ['images/projets/villa-v1/apres-1.jpg', 'images/projets/villa-v1/apres-2.jpg', 'images/projets/villa-v1/apres-3.jpg', 'images/projets/villa-v1/apres-4.jpg']
    },
    'proj-9': {
      name: 'Quatre pavillons à Grury', location: 'Grury · 2011', tags: ['Logement collectif', 'Neuf', '2011', '375 000 €'],
      description: "Construction de quatre logements économiques pour l'OPAC de Saône-et-Loire.",
      images: ['images/projets/quatre-pavillons-grury/avant.jpg', 'images/projets/quatre-pavillons-grury/apres-1.jpg', 'images/projets/quatre-pavillons-grury/apres-2.jpg', 'images/projets/quatre-pavillons-grury/apres-3.jpg']
    },
    'proj-10': {
      name: 'Villa M1', location: 'Viernoz · 2007', tags: ['Logement individuel', 'Neuf', '2007', '250 000 à 500 000 €'],
      description: "Villa contemporaine.",
      images: ['images/projets/villa-m1/apres-1.jpg', 'images/projets/villa-m1/apres-2.jpg', 'images/projets/villa-m1/apres-3.jpg', 'images/projets/villa-m1/apres-4.jpg', 'images/projets/villa-m1/apres-5.jpg', 'images/projets/villa-m1/apres-6.jpg', 'images/projets/villa-m1/apres-7.jpg']
    },
    'proj-11': {
      name: 'Maison B.', location: 'Bron · 2018', tags: ['Logement individuel', 'Neuf', 'Existant', '2018', '51 000 à 100 000 €'],
      description: "Restructuration et rénovation d'une maison des années 60 dont la partie habitable était à l'étage, sur garage et annexes. Séjour et cuisine descendus au rez-de-chaussée, découpe de la dalle et création d'une double hauteur sur la cuisine et d'une passerelle vitrée, création d'une suite parentale et d'une chambre d'amis, création d'une cave à vins naturelle et vitrée à côté de la cuisine.",
      images: ['images/projets/maison-b-bron/apres-1.jpg', 'images/projets/maison-b-bron/apres-2.jpg', 'images/projets/maison-b-bron/apres-3.jpg', 'images/projets/maison-b-bron/apres-4.jpg']
    },
    'proj-12': {
      name: 'Appartement B', location: 'Lyon', tags: ['Logement individuel', 'Existant'],
      description: "Aménagement et décoration d'un appartement, entrée, cuisine, salles de bain.",
      images: ['images/projets/appartement-b/apres-1.jpg', 'images/projets/appartement-b/apres-2.jpg']
    },
    'proj-13': {
      name: 'Maison B., Plan Favier', location: 'Ouest lyonnais', tags: ['Logement individuel', 'Existant'],
      description: "Restructuration et extension d'une villa des années 60 sur plan Favier, avec extension sur pilotis sur un terrain en forte pente. Décoration de la cuisine et des salles de bain, agencement.",
      images: ['images/projets/maison-b-plan-favier/avant.jpg', 'images/projets/maison-b-plan-favier/apres-1.jpg', 'images/projets/maison-b-plan-favier/apres-2.jpg', 'images/projets/maison-b-plan-favier/apres-3.jpg', 'images/projets/maison-b-plan-favier/apres-4.jpg', 'images/projets/maison-b-plan-favier/apres-5.jpg', 'images/projets/maison-b-plan-favier/apres-6.jpg', 'images/projets/maison-b-plan-favier/apres-7.jpg', 'images/projets/maison-b-plan-favier/apres-8.jpg', 'images/projets/maison-b-plan-favier/apres-9.jpg', 'images/projets/maison-b-plan-favier/apres-10.jpg', 'images/projets/maison-b-plan-favier/apres-11.jpg', 'images/projets/maison-b-plan-favier/apres-12.jpg']
    },
    'proj-14': {
      name: 'Villa T.', location: 'Fleurieux-sur-Saône', tags: ['Logement individuel', 'Existant'],
      description: "Réaménagement et décoration.",
      images: ['images/projets/villa-t/apres-1.jpg', 'images/projets/villa-t/apres-2.jpg', 'images/projets/villa-t/apres-3.jpg', 'images/projets/villa-t/apres-4.jpg', 'images/projets/villa-t/apres-5.jpg', 'images/projets/villa-t/apres-6.jpg', 'images/projets/villa-t/apres-7.jpg', 'images/projets/villa-t/apres-8.jpg']
    },
    'proj-15': {
      name: 'Duplex sous les combles', location: 'Ouest lyonnais', tags: ['Logement collectif', 'Existant'],
      description: "Transformation d'un appartement au dernier étage en deux duplex sous les combles.",
      images: ['images/projets/duplex-combles/apres-1.jpg', 'images/projets/duplex-combles/apres-2.jpg']
    },
    'proj-16': {
      name: 'Maison G-L', location: 'Chaponost', tags: ['Logement individuel', 'Existant'],
      description: "Rénovation du séjour et création d'une chambre, avec mobilier sur mesure et éclairages.",
      images: ['images/projets/maison-g-l/apres-1.jpg', 'images/projets/maison-g-l/apres-2.jpg', 'images/projets/maison-g-l/apres-3.jpg', 'images/projets/maison-g-l/apres-4.jpg', 'images/projets/maison-g-l/apres-5.jpg', 'images/projets/maison-g-l/apres-6.jpg', 'images/projets/maison-g-l/apres-7.jpg', 'images/projets/maison-g-l/apres-8.jpg', 'images/projets/maison-g-l/apres-9.jpg']
    },
    'proj-17': {
      name: 'Maison S-P', location: 'Ouest lyonnais', tags: ['Logement individuel', 'Existant'],
      description: "Restructuration de deux appartements en une maison unique, avec création des chambres et salles de bain, des escaliers reliant les niveaux, et agrandissement et rénovation du séjour.",
      images: ['images/projets/maison-s-p/apres-1.jpg', 'images/projets/maison-s-p/apres-2.jpg', 'images/projets/maison-s-p/apres-3.jpg', 'images/projets/maison-s-p/apres-4.jpg', 'images/projets/maison-s-p/apres-5.jpg', 'images/projets/maison-s-p/apres-6.jpg', 'images/projets/maison-s-p/apres-7.jpg']
    },
    'proj-18': {
      name: 'Maison Ch.', location: 'Soucieu-en-Jarrest', tags: ['Logement individuel', 'Existant'],
      description: "Le séjour-cuisine a été entièrement refait et une partie de l'ancienne étable a été aménagée en chambre, bureau et dressing, séparés par un vitrage « atelier ».",
      images: ['images/projets/maison-ch/apres-1.jpg', 'images/projets/maison-ch/apres-2.jpg', 'images/projets/maison-ch/apres-3.jpg', 'images/projets/maison-ch/apres-4.jpg', 'images/projets/maison-ch/apres-5.jpg', 'images/projets/maison-ch/apres-6.jpg', 'images/projets/maison-ch/apres-7.jpg', 'images/projets/maison-ch/apres-8.jpg']
    },
    'proj-19': {
      name: 'Villa C2', location: 'Genas', tags: ['Logement individuel', 'Existant'],
      description: "Extension et rénovation d'une villa des années 70.",
      images: ['images/projets/villa-c2/avant.jpg', 'images/projets/villa-c2/apres-1.jpg', 'images/projets/villa-c2/apres-2.jpg', 'images/projets/villa-c2/apres-3.jpg', 'images/projets/villa-c2/apres-4.jpg', 'images/projets/villa-c2/apres-5.jpg', 'images/projets/villa-c2/apres-6.jpg', 'images/projets/villa-c2/apres-7.jpg', 'images/projets/villa-c2/apres-8.jpg', 'images/projets/villa-c2/apres-9.jpg']
    },
    'proj-20': {
      name: 'Villa G-L', location: 'Craponne', tags: ['Logement individuel', 'Existant'],
      description: "Restructuration et rénovation d'une villa de 1972. Les pièces principales, initialement à l'étage sur un sous-sol complet, sont déplacées en rez-de-jardin. Création d'un séjour-cathédrale et d'une extension entièrement vitrée, la maison se tournant vers le sud et le jardin arboré.",
      images: ['images/projets/villa-g-l-craponne/avant.jpg', 'images/projets/villa-g-l-craponne/apres-1.jpg', 'images/projets/villa-g-l-craponne/apres-2.jpg', 'images/projets/villa-g-l-craponne/apres-3.jpg', 'images/projets/villa-g-l-craponne/apres-4.jpg', 'images/projets/villa-g-l-craponne/apres-5.jpg', 'images/projets/villa-g-l-craponne/apres-6.jpg', 'images/projets/villa-g-l-craponne/apres-7.jpg', 'images/projets/villa-g-l-craponne/apres-8.jpg', 'images/projets/villa-g-l-craponne/apres-9.jpg', 'images/projets/villa-g-l-craponne/apres-10.jpg', 'images/projets/villa-g-l-craponne/apres-11.jpg', 'images/projets/villa-g-l-craponne/apres-12.jpg', 'images/projets/villa-g-l-craponne/apres-13.jpg', 'images/projets/villa-g-l-craponne/apres-14.jpg']
    },
    'proj-21': {
      name: 'Maison D.', location: 'Goeulzin · 2016', tags: ['Logement individuel', 'Existant', '2016', '100 001 à 250 000 €'],
      description: "Extension et transformation d'une dépendance en habitation.",
      images: ['images/projets/maison-d-goeulzin/avant.jpg', 'images/projets/maison-d-goeulzin/apres-1.jpg', 'images/projets/maison-d-goeulzin/apres-2.jpg', 'images/projets/maison-d-goeulzin/apres-3.jpg']
    },
    'proj-22': {
      name: 'Maison SP, Anglo-normand', location: 'Chaponost · 2017', tags: ['Logement individuel', 'Existant', '2017', '250 001 à 500 000 €'],
      description: "Rénovation d'une maison des années 30 de style anglo-normand.",
      images: ['images/projets/maison-sp-anglo-normand/avant.jpg', 'images/projets/maison-sp-anglo-normand/apres-1.jpg', 'images/projets/maison-sp-anglo-normand/apres-2.jpg', 'images/projets/maison-sp-anglo-normand/apres-3.jpg', 'images/projets/maison-sp-anglo-normand/apres-4.jpg', 'images/projets/maison-sp-anglo-normand/apres-5.jpg', 'images/projets/maison-sp-anglo-normand/apres-6.jpg', 'images/projets/maison-sp-anglo-normand/apres-7.jpg', 'images/projets/maison-sp-anglo-normand/apres-8.jpg', 'images/projets/maison-sp-anglo-normand/apres-9.jpg', 'images/projets/maison-sp-anglo-normand/apres-10.jpg', 'images/projets/maison-sp-anglo-normand/apres-11.jpg', 'images/projets/maison-sp-anglo-normand/apres-12.jpg', 'images/projets/maison-sp-anglo-normand/apres-13.jpg', 'images/projets/maison-sp-anglo-normand/apres-14.jpg']
    },
    'proj-23': {
      name: 'Maison des Années 30', location: 'Bron · 2013', tags: ['Logement individuel', 'Existant', '2013', '100 001 à 250 000 €'],
      description: "Rénovation après réparation des désordres structurels, façades, serrureries, marquises et travaux intérieurs.",
      images: ['images/projets/maison-annees-30/avant.jpg', 'images/projets/maison-annees-30/apres-1.jpg', 'images/projets/maison-annees-30/apres-2.jpg', 'images/projets/maison-annees-30/apres-3.jpg', 'images/projets/maison-annees-30/apres-4.jpg', 'images/projets/maison-annees-30/apres-5.jpg', 'images/projets/maison-annees-30/apres-6.jpg', 'images/projets/maison-annees-30/apres-7.jpg', 'images/projets/maison-annees-30/apres-8.jpg', 'images/projets/maison-annees-30/apres-9.jpg', 'images/projets/maison-annees-30/apres-10.jpg']
    },
    'proj-24': {
      name: 'Maison F.', location: 'Brindas · 2009', tags: ['Logement individuel', 'Existant', '2009', '51 000 à 100 000 €'],
      description: "Extension du salon, réaménagement de la cuisine et transformation de la mezzanine en dressing et salle d'eau.",
      images: ['images/projets/maison-f/apres-1.jpg', 'images/projets/maison-f/apres-2.jpg', 'images/projets/maison-f/apres-3.jpg', 'images/projets/maison-f/apres-4.jpg', 'images/projets/maison-f/apres-5.jpg', 'images/projets/maison-f/apres-6.jpg']
    },
    'proj-25': {
      name: 'Maison rouge', location: 'Lucey · 2014', tags: ['Logement individuel', 'Existant', '2014', '100 001 à 250 000 €'],
      description: "Rénovation et extension.",
      images: ['images/projets/maison-rouge/apres-1.jpg', 'images/projets/maison-rouge/apres-2.jpg', 'images/projets/maison-rouge/apres-3.jpg', 'images/projets/maison-rouge/apres-4.jpg', 'images/projets/maison-rouge/apres-5.jpg']
    },
    'proj-26': {
      name: 'Garage et atelier', location: 'Longecourt-en-Plaine · 2009', tags: ['Logement individuel', 'Existant', '2009', '1 à 50 000 €'],
      description: "Création d'un garage et d'un atelier en secteur Monument Historique.",
      images: ['images/projets/garage-atelier/apres-1.jpg']
    },
    'proj-27': {
      name: 'Maison B., Lyon', location: 'Lyon · 2008', tags: ['Logement individuel', 'Existant', '2008', '51 000 à 100 000 €'],
      description: "Extension de la cuisine, aménagement du jardin et création d'une piscine.",
      images: ['images/projets/maison-b-lyon/apres-1.jpg', 'images/projets/maison-b-lyon/apres-2.jpg', 'images/projets/maison-b-lyon/apres-3.jpg', 'images/projets/maison-b-lyon/apres-4.jpg', 'images/projets/maison-b-lyon/apres-5.jpg', 'images/projets/maison-b-lyon/apres-6.jpg', 'images/projets/maison-b-lyon/apres-7.jpg']
    }
  };

  var pModalBackdrop = document.getElementById('projectModalBackdrop');
  var pModal = document.getElementById('projectModal');
  var pModalClose = document.getElementById('projectModalClose');
  var pGalleryTrack = document.getElementById('pgalleryTrack');
  var pGalleryDots = document.getElementById('pgalleryDots');
  var pTags = document.getElementById('pmodalTags');
  var pName = document.getElementById('pmodalName');
  var pLocation = document.getElementById('pmodalLocation');
  var pDescription = document.getElementById('pmodalDescription');
  var galleryIndex = 0;
  var galleryCount = 0;

  function goToSlide(i) {
    galleryIndex = (i + galleryCount) % galleryCount;
    pGalleryTrack.style.transform = 'translateX(-' + (galleryIndex * 100) + '%)';
    pGalleryDots.querySelectorAll('button').forEach(function (d, idx) {
      d.classList.toggle('active', idx === galleryIndex);
    });
  }

  function openProjectModal(id) {
    var data = PROJECTS_DATA[id];
    if (!data || !pModal) return;

    pTags.innerHTML = data.tags.map(function (t) { return '<span>' + t + '</span>'; }).join('');
    pName.textContent = data.name;
    pLocation.textContent = data.location;
    pDescription.textContent = data.description;

    pGalleryTrack.innerHTML = data.images.map(function (src) {
      return '<img src="' + src + '" alt="' + data.name + '" />';
    }).join('');
    pGalleryDots.innerHTML = data.images.map(function (_, idx) {
      return '<button type="button" data-slide="' + idx + '" aria-label="Photo ' + (idx + 1) + '"></button>';
    }).join('');
    galleryCount = data.images.length;
    goToSlide(0);

    pModalBackdrop.classList.add('open');
    pModal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeProjectModal() {
    pModalBackdrop.classList.remove('open');
    pModal.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (pModal && pModalBackdrop) {
    document.querySelectorAll('.project-view-link[data-project]').forEach(function (link) {
      link.addEventListener('click', function () { openProjectModal(link.getAttribute('data-project')); });
    });
    if (pModalClose) pModalClose.addEventListener('click', closeProjectModal);
    pModalBackdrop.addEventListener('click', closeProjectModal);
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && pModal.classList.contains('open')) closeProjectModal();
      if (pModal.classList.contains('open')) {
        if (e.key === 'ArrowRight') goToSlide(galleryIndex + 1);
        if (e.key === 'ArrowLeft') goToSlide(galleryIndex - 1);
      }
    });
    document.addEventListener('click', function (e) {
      var next = e.target.closest('.pgallery-next');
      var prev = e.target.closest('.pgallery-prev');
      var dot = e.target.closest('[data-slide]');
      if (next) goToSlide(galleryIndex + 1);
      if (prev) goToSlide(galleryIndex - 1);
      if (dot) goToSlide(parseInt(dot.getAttribute('data-slide'), 10));
    });
  }

  // Before/after compare sliders on project tiles — driven by Pointer Events
  // (a native <input type=range> stretched to fill the tile does not drag reliably
  // cross-browser, so position is tracked directly from pointer coordinates instead).
  document.querySelectorAll('.compare').forEach(function (tile) {
    var before = tile.querySelector('.compare-before');
    var handle = tile.querySelector('.compare-handle');
    if (!before || !handle) return;
    var dragging = false;

    function setFromClientX(clientX) {
      var rect = tile.getBoundingClientRect();
      var pct = ((clientX - rect.left) / rect.width) * 100;
      pct = Math.max(0, Math.min(100, pct));
      before.style.clipPath = 'inset(0 ' + (100 - pct) + '% 0 0)';
      handle.style.left = pct + '%';
    }

    tile.addEventListener('pointerdown', function (e) {
      dragging = true;
      if (tile.setPointerCapture) tile.setPointerCapture(e.pointerId);
      setFromClientX(e.clientX);
    });
    tile.addEventListener('pointermove', function (e) {
      if (!dragging) return;
      setFromClientX(e.clientX);
    });
    tile.addEventListener('pointerup', function () { dragging = false; });
    tile.addEventListener('pointercancel', function () { dragging = false; });
  });
})();
