(function () {
  'use strict';

  var PAIRS = [
    // --- quotidien ---
    { cat: 'Quotidien', ea: '🪥', a: 'Tube de dentifrice : écrasé', eb: '🌀', b: 'Tube bien roulé' },
    { cat: 'Quotidien', ea: '🌪️', a: 'L’appart est : Bordélique', eb: '🗄️', b: 'Tout est rangé' },
    { cat: 'Quotidien', ea: '💡', a: 'Dans l’appart : Lumière toujours allumée', eb: '🌑', b: 'Lumière toujours éteinte' },
    { cat: 'Quotidien', ea: '🍽️', a: 'Vaisselle tout de suite', eb: '🕰️', b: 'Vaisselle plus tard' },
    { cat: 'Quotidien', ea: '🤫', a: 'Silence pour dormir', eb: '📻', b: 'Bruit de fond pour dormir' },
    { cat: 'Quotidien', ea: '🌬️', a: 'Fenêtre ouverte la nuit', eb: '🚪', b: 'Fenêtre fermée' },
    { cat: 'Quotidien', ea: '🌅', a: 'Douche le matin', eb: '🌙', b: 'Douche le soir' },
    { cat: 'Quotidien', ea: '🔥', a: 'Chauffage à fond', eb: '🧶', b: 'Pull à la maison' },
    { cat: 'Quotidien', ea: '🔔', a: 'Notifications activées', eb: '🔕', b: 'Téléphone en silencieux' },
    { cat: 'Quotidien', ea: '🧽', a: 'Petit ménage très souvent', eb: '🧹', b: 'Gros ménage une fois par semaine' },
    { cat: 'Quotidien', ea: '⬅️', a: 'Côté gauche du lit', eb: '➡️', b: 'Côté droit du lit', comp: true },
    { cat: 'Quotidien', ea: '😴', a: 'Grasse matinée', eb: '🌅', b: 'Lever tôt' },
    { cat: 'Quotidien', ea: '📖', a: 'Livre', eb: '📺', b: 'Série' },
    { cat: 'Quotidien', ea: '🏃', a: 'Sportif du dimanche', eb: '💪', b: 'Sportif 7j/7' },
    { cat: 'Quotidien', ea: '🥾', a: 'Dimanche rando', eb: '🛌', b: 'Dimanche dodo' },
    { cat: 'Quotidien', ea: '🎬', a: 'Choisir le film ou la série ce soir', eb: '🤝', b: 'Laisser l’autre décider' },
    { cat: 'Quotidien', ea: '⏰', a: 'Alarme : une fois et debout', eb: '🔁', b: 'Alarme : 5 créneaux minimum' },
    { cat: 'Quotidien', ea: '📱', a: 'Scroller au lit : 5 min', eb: '🕳️', b: 'Scroller au lit : 2h' },
    { cat: 'Quotidien', ea: '😢', a: 'Pleurer devant un film : Souvent', eb: '🧊', b: 'Pleurer devant un film : Jamais' },
    { cat: 'Quotidien', ea: '⏱️', a: 'Arriver en avance', eb: '🏃', b: 'Arriver en retard' },
    { cat: 'Quotidien', ea: '🪫', a: 'Charger son tel à 5%', eb: '🔋', b: 'Le brancher à 50%' },
    { cat: 'Quotidien', ea: '🧳', a: 'Défaire sa valise le jour même', eb: '🫠', b: 'La valise traîne ouverte une semaine' },

    // --- voyage ---
    { cat: 'Voyage', ea: '🎒', a: 'Sac à dos léger', eb: '🧳', b: 'Valise organisée' },
    { cat: 'Voyage', ea: '🎲', a: 'Improviser sur place', eb: '🗺️', b: 'Itinéraire détaillé' },
    { cat: 'Voyage', ea: '🚗', a: 'Road trip en voiture', eb: '✈️', b: 'Vol direct' },
    { cat: 'Voyage', ea: '🆕', a: 'Nouvelle destination', eb: '🔁', b: 'Retourner au même endroit' },
    { cat: 'Voyage', ea: '🚐', a: 'Van aménagé', eb: '⛺', b: 'Tente et duvet' },
    { cat: 'Voyage', ea: '🐌', a: 'Prendre son temps', eb: '🏃', b: 'Enchaîner les activités' },
    { cat: 'Voyage', ea: '🏖️', a: 'Plage', eb: '🏔️', b: 'Montagne' },
    { cat: 'Voyage', ea: '🏙️', a: 'Vivre en ville', eb: '🌳', b: 'Vivre en campagne' },
    { cat: 'Voyage', ea: '🚗', a: 'Voyage en voiture', eb: '🚆', b: 'Voyage en train' },
    { cat: 'Voyage', ea: '☀️', a: 'Bandeur d’été', eb: '❄️', b: 'Bandeur d’hiver' },
    { cat: 'Voyage', ea: '🕐', a: 'Aéroport : 3h en avance', eb: '🏃', b: 'Courir pour l’embarquement' },
    { cat: 'Voyage', ea: '😴', a: 'S’endormir en voiture en 5 min', eb: '🗺️', b: 'Co-pilote infaillible' },

    // --- argent ---
    { cat: 'Argent', ea: '🐖', a: 'Épargner', eb: '🎉', b: 'Profiter' },
    { cat: 'Argent', ea: '🛍️', a: 'Acheteur compulsif', eb: '🧠', b: 'Acheteur réfléchi' },

    // --- langage de l’amour ---
    { cat: 'Langage de l’amour', ea: '📣', a: 'Compliments', eb: '🛠️', b: 'Preuves par les actes' },
    { cat: 'Langage de l’amour', ea: '⚡', a: 'En reparler tout de suite', eb: '⏸️', b: 'Laisser retomber avant' },
    { cat: 'Langage de l’amour', ea: '😢', a: 'Montrer ses émotions', eb: '🧊', b: 'Les garder pour soi' },
    { cat: 'Langage de l’amour', ea: '🤗', a: 'Câlin', eb: '😘', b: 'Bisou' },
    { cat: 'Langage de l’amour', ea: '💬', a: 'Message', eb: '📞', b: 'Appel' },
    { cat: 'Langage de l’amour', ea: '🎁', a: 'Anniversaire surprise', eb: '🗓️', b: 'Anniversaire annoncé' },
    { cat: 'Langage de l’amour', ea: '📱', a: 'Texto au réveil', eb: '🌇', b: 'Silence radio le matin' },
    { cat: 'Langage de l’amour', ea: '🥄', a: 'Dormir en cuillère', eb: '🛏️', b: 'Chacun de son côté sinon j’étouffe' },
    { cat: 'Langage de l’amour', ea: '🧠', a: 'Pardonner une infidélité émotionnelle', eb: '💋', b: 'Pardonner une infidélité physique' },

    // --- sexe ---
    { cat: 'Sexe', ea: '🌅', a: 'Sexe matinal', eb: '🌙', b: 'Sexe le soir' },
    { cat: 'Sexe', ea: '🌳', a: 'Excitant en extérieur', eb: '🏠', b: 'Uniquement à la maison' },
    { cat: 'Sexe', ea: '⬆️', a: 'Top', eb: '⬇️', b: 'Bottom', comp: true },
    { cat: 'Sexe', ea: '🤗', a: 'Câlins après sexe', eb: '🚿', b: 'Direct sous la douche' },
    { cat: 'Sexe', ea: '🕯️', a: 'Préliminaires longs et sensuels', eb: '⚡', b: 'Aller directement au but' },
    { cat: 'Sexe', ea: '😈', a: 'Dominer', eb: '😌', b: 'Être dominé(e)', comp: true },
    { cat: 'Sexe', ea: '🚿', a: 'Faire l’amour sous la douche', eb: '🛁', b: 'Faire l’amour dans un bain' },

    // --- sorties ---
    { cat: 'Sorties', ea: '🕺', a: 'Sortir en boite', eb: '🍻', b: 'Sortir dans les bars' },
    { cat: 'Sorties', ea: '💃', a: 'Danser toute la soirée', eb: '🗨️', b: 'Discuter dans un coin' },
    { cat: 'Sorties', ea: '🏠', a: 'Organiser des soirées chez soi', eb: '🚪', b: 'C’est mieux chez les autres' },
    { cat: 'Sorties', ea: '👨‍👩‍👧', a: 'Voir la famille souvent', eb: '📅', b: 'Voir la famille de temps en temps' },
    { cat: 'Sorties', ea: '📸', a: 'Publier les moments du couple', eb: '🔒', b: 'Garder ça pour soi' },
    { cat: 'Sorties', ea: '📺', a: 'Netflix', eb: '🎬', b: 'Cinéma' },
    { cat: 'Sorties', ea: '🐱', a: 'Chat', eb: '🐶', b: 'Chien' },
    { cat: 'Sorties', ea: '📸', a: 'Story Insta souvent', eb: '👻', b: 'Compte fantôme' },
    { cat: 'Sorties', ea: '🎧', a: 'Playlist pour chaque humeur', eb: '🔁', b: 'Le même album en boucle 3 semaines' },

    // --- nourriture ---
    { cat: 'Nourriture', ea: '🍫', a: 'Sucré', eb: '🍟', b: 'Salé' },
    { cat: 'Nourriture', ea: '🍕', a: 'Pizza', eb: '🍣', b: 'Sushi' },
    { cat: 'Nourriture', ea: '🍵', a: 'Thé', eb: '☕', b: 'Café' },
    { cat: 'Nourriture', ea: '👩‍🍳', a: 'Cuisiner', eb: '🥡', b: 'Commander' },
    { cat: 'Nourriture', ea: '🌶️', a: 'Épicé', eb: '🥛', b: 'Doux' },
    { cat: 'Nourriture', ea: '🍳', a: 'Petit-déj copieux', eb: '🍌', b: 'Petit-déj léger' },
    { cat: 'Nourriture', ea: '🍿', a: 'Grignoter toute la journée', eb: '🍽️', b: 'Trois repas fixes' },

    // --- valeurs & projets de vie ---
    { cat: 'Valeurs & projets de vie', ea: '💼', a: 'Carrière ambitieuse', eb: '⚖️', b: 'Équilibre avant tout' },
    { cat: 'Valeurs & projets de vie', ea: '🏢', a: 'Bel appartement en ville', eb: '🏡', b: 'Grande maison à la campagne' },
    { cat: 'Valeurs & projets de vie', ea: '👥', a: "Beaucoup d’amis", eb: '💎', b: 'Peu mais fidèles' },
    { cat: 'Valeurs & projets de vie', ea: '👶', a: 'Je veux des enfants', eb: '🚫', b: 'Je ne veux pas d’enfants' },
    { cat: 'Valeurs & projets de vie', ea: '🚬', a: 'Petite clope', eb: '🚭', b: 'Ne fume jamais' },
    { cat: 'Valeurs & projets de vie', ea: '🎲', a: 'Improviser', eb: '📋', b: 'Tout planifier' },
    { cat: 'Valeurs & projets de vie', ea: '🏙️', a: 'Vivre en ville toute la vie', eb: '🌾', b: 'Finir à la campagne' },
    { cat: 'Valeurs & projets de vie', ea: '🎂', a: 'Se souvenir de tous les anniversaires', eb: '🤷', b: 'Oublier même le tien' },

    // --- avis tranchés ---
    { cat: 'Avis tranchés', ea: '🎤', a: 'Taylor Swift : Reine', eb: '🙄', b: 'Taylor Swift : Surcotée' },
    { cat: 'Avis tranchés', ea: '🥐', a: 'Pain au chocolat', eb: '🍫', b: 'Chocolatine' },
    { cat: 'Avis tranchés', ea: '🍍', a: 'Ananas sur la pizza : Délice', eb: '🚫', b: 'Ananas sur la pizza : Crime' },
    { cat: 'Avis tranchés', ea: '🦸', a: 'Marvel : Top', eb: '🤷', b: 'Marvel : Pas mon truc' },
    { cat: 'Avis tranchés', ea: '🗼', a: 'Emily in Paris : Plaisir coupable', eb: '🙈', b: 'Emily in Paris : Honte nationale' },
    { cat: 'Avis tranchés', ea: '🏆', a: 'Regarder le foot : Pendant la coupe du monde', eb: '⚽', b: 'Regarder le foot : Je loupe aucun match' },
    { cat: 'Avis tranchés', ea: '⚡', a: 'Harry Potter : Culte', eb: '📈', b: 'Harry Potter : Trop hype' },
    { cat: 'Avis tranchés', ea: '🦻', a: 'Ronfler : Mets des bouchons', eb: '🫀', b: 'Ronfler : Prend mon pouls pour vérifier si je suis en vie' },
    { cat: 'Avis tranchés', ea: '😂', a: 'Écrire "mdr"', eb: '😄', b: 'Écrire "haha"' },
    { cat: 'Avis tranchés', ea: '😭', a: 'Pleurer en coupant des oignons : Toujours', eb: '🧅', b: 'Pleurer en coupant des oignons : Immunisé(e)' },
    { cat: 'Avis tranchés', ea: '🎧', a: 'Écouter un album en entier', eb: '⏭️', b: 'Zapper après 30 sec' },
    { cat: 'Avis tranchés', ea: '📖', a: 'Regarder un tuto pour monter un meuble', eb: '🔨', b: 'Foncer sans la notice' },
    { cat: 'Avis tranchés', ea: '🎶', a: 'Jul : On l’écoute en secret', eb: '🔊', b: 'Jul : À fond, fenêtres ouvertes' },
    { cat: 'Avis tranchés', ea: '🏰', a: 'Les films Disney : J’ai plus l’âge', eb: '🧸', b: 'Les films Disney : Réconfortants' },
    { cat: 'Avis tranchés', ea: '🤘', a: 'Concert : Premier rang dans la fosse', eb: '🪑', b: 'Concert : Posé en tribune' },
    { cat: 'Avis tranchés', ea: '🏝️', a: 'Koh-Lanta : Je survivrais', eb: '🚪', b: 'Koh-Lanta : Éliminé(e) jour 1' },
    { cat: 'Avis tranchés', ea: '☕', a: 'Friends : Culte absolu', eb: '😴', b: 'Friends : Surcotée' },
    { cat: 'Avis tranchés', ea: '🎤', a: 'La Star Academy : Rdv en octobre', eb: '📼', b: 'La Star Academy : Ça devait rester en 2001' },
    { cat: 'Quotidien', ea: '👕', a: 'Plier le linge en sortant du sèche-linge', eb: '🪑', b: 'Le tas informe sur la chaise' },
    { cat: 'Langage de l’amour', ea: '📲', a: 'Envoyer des memes toute la journée', eb: '🤐', b: 'Garder son fil pour soi' },
    { cat: 'Avis tranchés', ea: '👍', a: 'Répondre "ok" : Normal', eb: '😤', b: 'Répondre "ok" : Passif-agressif' },
    { cat: 'Avis tranchés', ea: '👻', a: 'Ghosting : Ça m’est arrivé', eb: '😈', b: 'Ghosting : J’ai déjà ghosté' },
    { cat: 'Langage de l’amour', ea: '🥄', a: 'Petite cuillère', eb: '🍴', b: 'Grande cuillère', comp: true },
    { cat: 'Avis tranchés', ea: '🍵', a: 'Matcha latte : Délicieux', eb: '🌿', b: 'Matcha latte : Du gazon liquide' },
    { cat: 'Avis tranchés', ea: '🔍', a: 'Insta : Compte pour stalker', eb: '🚫', b: 'Insta : Pas besoin de compte secret' },
    { cat: 'Avis tranchés', ea: '🛒', a: 'IKEA en couple : Épreuve du couple', eb: '💛', b: 'IKEA en couple : Date parfaite' },
    { cat: 'Quotidien', ea: '🔊', a: 'Mettre la musique dans la douche', eb: '🎤', b: 'Chanter a capella' }
  ];

  var CODE_CHARS = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';
  var ROUND_SIZE = 5;
  var ORIGINAL_COUNT = PAIRS.length;
  var SESSION_KEY = 'instinctOnlineSession';

  var customPairs = [];

  function getTotalPairsCount() { return ORIGINAL_COUNT + customPairs.length; }
  function getMaxRounds() { return Math.floor(getTotalPairsCount() / ROUND_SIZE); }
  function getPair(idx) { return idx < ORIGINAL_COUNT ? PAIRS[idx] : customPairs[idx - ORIGINAL_COUNT]; }

  var firebaseReady = false;
  var db = null;

  var state = {
    mode: null,
    round: 1,
    pairsOrder: [],
    currentIndex: 0,
    answers: [],
    locked: false,
    sessionRounds: [],
    lastNames: null,
    online: null,
    hotseat: null
  };

  var roomListenerUnsub = null;
  var activeCard = null;

  // ---------- utils ----------

  function $(id) { return document.getElementById(id); }

  function showScreen(id) {
    document.querySelectorAll('.screen').forEach(function (s) {
      s.classList.remove('active');
    });
    $(id).classList.add('active');
  }

  function escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function generateRoomCode() {
    var code = '';
    for (var i = 0; i < 5; i++) {
      code += CODE_CHARS.charAt(Math.floor(Math.random() * CODE_CHARS.length));
    }
    return code;
  }

  // deterministic seeded shuffle so both devices compute the same round content
  function seededRng(seedStr) {
    var h = 1779033703 ^ seedStr.length;
    for (var i = 0; i < seedStr.length; i++) {
      h = Math.imul(h ^ seedStr.charCodeAt(i), 3432918353);
      h = (h << 13) | (h >>> 19);
    }
    var a = (Math.imul(h ^ (h >>> 16), 2246822507) ^ (h >>> 13)) >>> 0;
    return function () {
      a |= 0; a = (a + 0x6D2B79F5) | 0;
      var t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function seededShuffle(array, rng) {
    var arr = array.slice();
    for (var i = arr.length - 1; i > 0; i--) {
      var j = Math.floor(rng() * (i + 1));
      var tmp = arr[i]; arr[i] = arr[j]; arr[j] = tmp;
    }
    return arr;
  }

  function getRoundPairIndexes(seed, roundNumber) {
    var allIdx = [];
    for (var i = 0; i < ORIGINAL_COUNT; i++) allIdx.push(i);
    var shuffled = seededShuffle(allIdx, seededRng(seed));
    for (var j = 0; j < customPairs.length; j++) shuffled.push(ORIGINAL_COUNT + j);
    var start = (roundNumber - 1) * ROUND_SIZE;
    return shuffled.slice(start, start + ROUND_SIZE);
  }

  function updateProgress() {
    var total = state.pairsOrder.length || 1;
    var pct = Math.min(100, (state.currentIndex / total) * 100);
    $('progressFill').style.width = pct + '%';
  }

  function initFirebase() {
    try {
      if (
        typeof firebase !== 'undefined' &&
        typeof FIREBASE_CONFIG !== 'undefined' &&
        FIREBASE_CONFIG.apiKey
      ) {
        firebase.initializeApp(FIREBASE_CONFIG);
        db = firebase.firestore();
        firebaseReady = true;
      }
    } catch (e) {
      console.warn('Firebase non initialisé, mode un seul téléphone uniquement.', e);
      firebaseReady = false;
    }
  }

  // ---------- intro ----------

  function initIntroScreen() {
    if (!firebaseReady) {
      $('onlineModes').hidden = true;
      $('offlineNote').hidden = false;
    }

    $('btnHost').addEventListener('click', function () {
      showScreen('screen-host-name');
      $('hostNameInput').focus();
    });

    $('btnJoin').addEventListener('click', function () {
      showScreen('screen-join');
      $('joinCodeInput').focus();
    });

    $('btnHotseatFallback').addEventListener('click', function () {
      showScreen('screen-hotseat-names');
      $('p1NameInput').focus();
    });

    $('hostBack').addEventListener('click', function () { showScreen('screen-intro'); });
    $('joinBack').addEventListener('click', function () { showScreen('screen-intro'); });
    $('hotseatBack').addEventListener('click', function () { showScreen('screen-intro'); });
  }

  // ---------- host flow ----------

  function initHostFlow() {
    $('hostCreateBtn').addEventListener('click', function () {
      var name = $('hostNameInput').value.trim();
      if (!name) { $('hostNameInput').focus(); return; }
      createRoom(name);
    });

    $('copyCodeBtn').addEventListener('click', function () {
      var code = state.online ? state.online.code : '';
      if (!code) return;
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(code).then(function () {
          $('copyCodeBtn').textContent = 'Copié ✓';
          setTimeout(function () { $('copyCodeBtn').textContent = 'Copier le code'; }, 1500);
        }).catch(function () {});
      }
    });

    $('hostStartBtn').addEventListener('click', function () {
      state.round = 1;
      state.pairsOrder = getRoundPairIndexes(state.online.code, state.round);
      startRound(state.online.myName, state.pairsOrder, state.round);
    });
  }

  function createRoom(name) {
    if (!firebaseReady || !db) {
      console.warn('Firebase non configuré : impossible de créer une partie en ligne.');
      showScreen('screen-intro');
      return;
    }

    var code = generateRoomCode();
    var docRef = db.collection('instinctSessions').doc(code);

    docRef.get().then(function (snap) {
      if (snap.exists) {
        // collision très improbable : on retente avec un nouveau code
        createRoom(name);
        return;
      }

      docRef.set({
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        player1: { name: name },
        player2: null,
        rounds: {}
      }).then(function () {
        state.mode = 'online';
        state.round = 1;
        state.sessionRounds = [];
        state.online = {
          docRef: docRef,
          code: code,
          myKey: 'player1',
          otherKey: 'player2',
          myName: name,
          otherName: null,
          pendingRevealRound: null
        };
        saveOnlineSession();
        requestNotificationPermission();

        $('roomCodeDisplay').textContent = code.split('').join(' ');
        $('hostWaitingText').textContent = 'En attente que quelqu’un rejoigne…';
        showScreen('screen-host-share');
        attachRoomListener(docRef);
      }).catch(function (err) {
        console.warn('Création de partie impossible.', err);
      });
    }).catch(function (err) {
      console.warn('Vérification du code impossible.', err);
    });
  }

  // ---------- join flow ----------

  function initJoinFlow() {
    $('joinConfirmBtn').addEventListener('click', function () {
      var code = $('joinCodeInput').value.trim().toUpperCase();
      var name = $('joinNameInput').value.trim();
      $('joinError').hidden = true;

      if (!code || !name) {
        showJoinError('Entre le code et ton prénom.');
        return;
      }

      if (!firebaseReady || !db) {
        showJoinError('Le mode deux-téléphones n’est pas encore branché sur ce site.');
        return;
      }

      var docRef = db.collection('instinctSessions').doc(code);
      docRef.get().then(function (snap) {
        if (!snap.exists) {
          showJoinError('Code introuvable. Vérifie avec ton/ta partenaire.');
          return;
        }
        var data = snap.data();
        if (data.player2 && data.player2.name) {
          showJoinError('Cette partie a déjà deux joueurs.');
          return;
        }

        docRef.update({
          player2: { name: name }
        }).then(function () {
          state.mode = 'online';
          state.round = 1;
          state.sessionRounds = [];
          state.online = {
            docRef: docRef,
            code: code,
            myKey: 'player2',
            otherKey: 'player1',
            myName: name,
            otherName: data.player1 ? data.player1.name : null,
            pendingRevealRound: null
          };
          saveOnlineSession();
          requestNotificationPermission();
          attachRoomListener(docRef);
          state.pairsOrder = getRoundPairIndexes(code, state.round);
          startRound(name, state.pairsOrder, state.round);
        }).catch(function (err) {
          console.warn('Impossible de rejoindre.', err);
          showJoinError('Impossible de rejoindre, réessaie.');
        });
      }).catch(function (err) {
        console.warn('Lecture de la partie impossible.', err);
        showJoinError('Connexion impossible, réessaie.');
      });
    });
  }

  function showJoinError(msg) {
    var el = $('joinError');
    el.textContent = msg;
    el.hidden = false;
  }

  // ---------- resume a session after closing the tab ----------

  function saveOnlineSession() {
    try {
      localStorage.setItem(SESSION_KEY, JSON.stringify({
        code: state.online.code,
        myKey: state.online.myKey
      }));
    } catch (e) {}
  }

  function clearOnlineSession() {
    try { localStorage.removeItem(SESSION_KEY); } catch (e) {}
  }

  function checkForSavedSession() {
    if (!firebaseReady || !db) return;
    var raw;
    try { raw = localStorage.getItem(SESSION_KEY); } catch (e) { return; }
    if (!raw) return;
    var saved;
    try { saved = JSON.parse(raw); } catch (e) { return; }
    if (!saved || !saved.code || !saved.myKey) return;

    $('resumeCode').textContent = saved.code.split('').join(' ');
    showScreen('screen-resume');

    $('resumeContinueBtn').onclick = function () { resumeOnlineSession(saved); };
    $('resumeNewBtn').onclick = function () {
      clearOnlineSession();
      showScreen('screen-intro');
    };
  }

  function resumeOnlineSession(saved) {
    var docRef = db.collection('instinctSessions').doc(saved.code);

    docRef.get().then(function (snap) {
      if (!snap.exists) { clearOnlineSession(); showScreen('screen-intro'); return; }

      var data = snap.data();
      var me = data[saved.myKey];
      if (!me || !me.name) { clearOnlineSession(); showScreen('screen-intro'); return; }

      var otherKey = saved.myKey === 'player1' ? 'player2' : 'player1';
      var other = data[otherKey];

      state.mode = 'online';
      state.online = {
        docRef: docRef,
        code: saved.code,
        myKey: saved.myKey,
        otherKey: otherKey,
        myName: me.name,
        otherName: other && other.name ? other.name : null,
        pendingRevealRound: null
      };

      if (data.customPairs && Array.isArray(data.customPairs)) {
        customPairs = data.customPairs.map(function (p) {
          return { cat: 'Perso', ea: '✏️', a: p.a, eb: '✏️', b: p.b };
        });
      }

      state.sessionRounds = [];
      var lastAnsweredByMe = 0;
      var rounds = data.rounds || {};
      Object.keys(rounds).forEach(function (key) {
        var n = parseInt(key, 10);
        var r = rounds[key];
        if (r && r[saved.myKey] && n > lastAnsweredByMe) lastAnsweredByMe = n;
        if (r && r.player1 && r.player2) {
          var rIdx = getRoundPairIndexes(saved.code, n);
          var common = countCommon(r.player1, r.player2, rIdx);
          state.sessionRounds.push({ round: n, common: common, tier: getRoundTier(common) });
        }
      });
      state.sessionRounds.sort(function (a, b) { return a.round - b.round; });
      if (data.player1 && data.player2) {
        state.lastNames = { name1: data.player1.name, name2: data.player2.name };
      }

      requestNotificationPermission();
      attachRoomListener(docRef);

      var lastRoundData = rounds[String(lastAnsweredByMe)];
      var otherAnsweredLast = lastAnsweredByMe > 0 && lastRoundData && lastRoundData[otherKey];

      if (lastAnsweredByMe > 0 && !otherAnsweredLast) {
        state.round = lastAnsweredByMe;
        state.online.pendingRevealRound = lastAnsweredByMe;
        $('waitingForName').textContent = state.online.otherName || 'l’autre joueur';
        $('waitingSub').textContent = 'Manche ' + lastAnsweredByMe + ' — le verdict arrive dès que vous avez tous les deux répondu.';
        showScreen('screen-waiting-result');
      } else if (lastAnsweredByMe >= getMaxRounds()) {
        showFinalSummary();
      } else {
        state.round = lastAnsweredByMe + 1;
        state.pairsOrder = getRoundPairIndexes(saved.code, state.round);
        startRound(me.name, state.pairsOrder, state.round);
      }
    }).catch(function (err) {
      console.warn('Reprise de partie impossible.', err);
      showScreen('screen-intro');
    });
  }

  // ---------- notifications ----------

  function requestNotificationPermission() {
    if (typeof Notification === 'undefined') return;
    if (Notification.permission === 'default') {
      try { Notification.requestPermission(); } catch (e) {}
    }
  }

  function notifyPartnerDone(partnerName, roundNumber) {
    if (typeof Notification === 'undefined' || Notification.permission !== 'granted') return;
    if (document.visibilityState === 'visible' && document.hasFocus()) return;
    try {
      new Notification('First date 💕', {
        body: (partnerName || 'Ton/ta partenaire') + ' a fini la manche ' + roundNumber + ' — viens voir le verdict !'
      });
    } catch (e) {}
  }

  // ---------- shared realtime listener ----------

  function attachRoomListener(docRef) {
    if (roomListenerUnsub) roomListenerUnsub();

    roomListenerUnsub = docRef.onSnapshot(function (snap) {
      if (!snap.exists || !state.online) return;
      var data = snap.data();

      if (data.customPairs && Array.isArray(data.customPairs)) {
        customPairs = data.customPairs.map(function (p) {
          return { cat: 'Perso', ea: '✏️', a: p.a, eb: '✏️', b: p.b };
        });
      }

      var other = data[state.online.otherKey];

      if (other && other.name && !state.online.otherName) {
        state.online.otherName = other.name;
        var waitingText = $('hostWaitingText');
        if (waitingText && $('screen-host-share').classList.contains('active')) {
          waitingText.textContent = other.name + ' a rejoint la partie 🎉';
        }
      }

      var pending = state.online.pendingRevealRound;
      if (pending) {
        var roundData = data.rounds && data.rounds[String(pending)];
        if (roundData && roundData.player1 && roundData.player2) {
          state.online.pendingRevealRound = null;
          notifyPartnerDone(state.online.otherName, pending);
          var pairIdx = getRoundPairIndexes(state.online.code, pending);
          revealRound(
            pending, pairIdx,
            data.player1.name, roundData.player1,
            data.player2.name, roundData.player2
          );
        }
      }
    }, function (err) {
      console.warn('Connexion à la partie perdue.', err);
    });
  }

  // ---------- hotseat flow ----------

  function initHotseatFlow() {
    $('hotseatStartBtn').addEventListener('click', function () {
      var p1 = $('p1NameInput').value.trim() || 'Joueur 1';
      var p2 = $('p2NameInput').value.trim() || 'Joueur 2';

      state.mode = 'hotseat';
      state.round = 1;
      state.sessionRounds = [];
      state.hotseat = {
        p1Name: p1,
        p2Name: p2,
        currentPlayer: 1,
        seed: Math.random().toString(36).slice(2),
        answersP1: []
      };

      state.pairsOrder = getRoundPairIndexes(state.hotseat.seed, state.round);
      startRound(p1, state.pairsOrder, state.round);
    });

    $('handoffBtn').addEventListener('click', function () {
      var name = state.hotseat.currentPlayer === 1 ? state.hotseat.p1Name : state.hotseat.p2Name;
      startRound(name, state.pairsOrder, state.round);
    });
  }

  // ---------- game round (shared) ----------

  function startRound(playerName, order, roundLabel) {
    state.pairsOrder = order;
    state.currentIndex = 0;
    state.answers = [];
    $('playerTag').textContent = playerName + (roundLabel ? ' · Manche ' + roundLabel : '');
    updateProgress();
    showScreen('screen-game');
    renderCard();
  }

  function renderCard() {
    var stack = $('cardStack');
    stack.innerHTML = '';

    var ghost2 = document.createElement('div');
    ghost2.className = 'card';
    ghost2.style.transform = 'scale(0.92) translateY(20px)';
    ghost2.style.opacity = '0.25';
    ghost2.style.pointerEvents = 'none';
    stack.appendChild(ghost2);

    var ghost1 = document.createElement('div');
    ghost1.className = 'card';
    ghost1.style.transform = 'scale(0.96) translateY(10px)';
    ghost1.style.opacity = '0.5';
    ghost1.style.pointerEvents = 'none';
    stack.appendChild(ghost1);

    var pairIndex = state.pairsOrder[state.currentIndex];
    var pair = getPair(pairIndex);

    var played = (state.round - 1) * ROUND_SIZE + state.currentIndex;
    var remaining = getTotalPairsCount() - played;
    $('remainingCount').textContent = remaining + ' questions restantes';

    var card = document.createElement('div');
    card.className = 'card';

    var topicTag = document.createElement('span');
    topicTag.className = 'card-topic';
    topicTag.textContent = pair.cat;
    card.appendChild(topicTag);

    var halfA = document.createElement('div');
    halfA.className = 'card-half side-a';
    halfA.innerHTML =
      '<span class="stamp stamp-left" data-stamp="a">Choisi</span>' +
      '<span class="card-emoji">' + pair.ea + '</span>' +
      '<span class="card-word">' + pair.a + '</span>';

    var divider = document.createElement('div');
    divider.className = 'card-divider';
    divider.innerHTML = '<span class="card-line"></span><span class="card-vs">VS</span>';

    var halfB = document.createElement('div');
    halfB.className = 'card-half side-b';
    halfB.innerHTML =
      '<span class="stamp stamp-right" data-stamp="b">Choisi</span>' +
      '<span class="card-emoji">' + pair.eb + '</span>' +
      '<span class="card-word">' + pair.b + '</span>';

    card.appendChild(halfA);
    card.appendChild(divider);
    card.appendChild(halfB);
    stack.appendChild(card);

    var stampA = halfA.querySelector('.stamp');
    var stampB = halfB.querySelector('.stamp');
    activeCard = card;

    var dragging = false;
    var startY = 0;
    var lastDy = 0;
    var startTime = 0;

    function setStamps(dy) {
      if (dy < -8) {
        stampA.style.opacity = Math.min(1, Math.abs(dy) / 90);
        stampB.style.opacity = 0;
      } else if (dy > 8) {
        stampB.style.opacity = Math.min(1, Math.abs(dy) / 90);
        stampA.style.opacity = 0;
      } else {
        stampA.style.opacity = 0;
        stampB.style.opacity = 0;
      }
    }

    card.addEventListener('pointerdown', function (e) {
      if (state.locked) return;
      dragging = true;
      startY = e.clientY;
      lastDy = 0;
      startTime = Date.now();
      card.style.transition = 'none';
      try { card.setPointerCapture(e.pointerId); } catch (err) {}
    });

    card.addEventListener('pointermove', function (e) {
      if (!dragging) return;
      lastDy = e.clientY - startY;
      card.style.transform = 'translateY(' + lastDy + 'px) rotate(' + (lastDy / 40) + 'deg)';
      setStamps(lastDy);
    });

    function onRelease() {
      if (!dragging) return;
      dragging = false;
      card.style.transition = 'transform 0.3s cubic-bezier(.2,.8,.2,1), opacity 0.3s';

      var moved = Math.abs(lastDy);
      var duration = Date.now() - startTime;

      if (moved > 70) {
        commitChoice(card, stampA, stampB, lastDy < 0 ? 'a' : 'b');
      } else if (moved < 10 && duration < 500) {
        var rect = card.getBoundingClientRect();
        var relY = startY - rect.top;
        var half = relY < rect.height / 2 ? 'a' : 'b';
        commitChoice(card, stampA, stampB, half);
      } else {
        card.style.transform = '';
        setStamps(0);
      }
    }

    card.addEventListener('pointerup', onRelease);
    card.addEventListener('pointercancel', function () {
      dragging = false;
      card.style.transition = 'transform 0.3s ease';
      card.style.transform = '';
      setStamps(0);
    });
  }

  function advanceAfterAnswer(side) {
    state.answers.push(side);

    setTimeout(function () {
      state.currentIndex++;
      updateProgress();
      state.locked = false;
      if (state.currentIndex >= state.pairsOrder.length) {
        finishRound();
      } else {
        renderCard();
      }
    }, 260);
  }

  function commitChoice(card, stampA, stampB, side) {
    if (state.locked) return;
    state.locked = true;

    if (side === 'a') {
      stampA.style.opacity = 1;
      card.style.transform = 'translateY(-160%) rotate(-16deg)';
    } else {
      stampB.style.opacity = 1;
      card.style.transform = 'translateY(160%) rotate(16deg)';
    }
    card.style.opacity = '0';

    advanceAfterAnswer(side);
  }

  function commitExtraChoice(side) {
    if (state.locked || !activeCard) return;
    state.locked = true;

    activeCard.style.transition = 'transform 0.25s ease, opacity 0.25s ease';
    activeCard.style.transform = 'scale(0.85)';
    activeCard.style.opacity = '0';

    advanceAfterAnswer(side);
  }

  function initExtraChoices() {
    $('btnNeither').addEventListener('click', function () { commitExtraChoice('neither'); });
    $('btnBoth').addEventListener('click', function () { commitExtraChoice('both'); });
  }

  // ---------- finishing a round ----------

  function finishRound() {
    if (state.mode === 'hotseat') {
      if (state.hotseat.currentPlayer === 1) {
        state.hotseat.answersP1 = state.answers;
        state.hotseat.currentPlayer = 2;
        $('handoffName').textContent = state.hotseat.p2Name;
        showScreen('screen-handoff');
      } else {
        revealRound(
          state.round, state.pairsOrder,
          state.hotseat.p1Name, state.hotseat.answersP1,
          state.hotseat.p2Name, state.answers
        );
      }
    } else if (state.mode === 'online') {
      state.online.pendingRevealRound = state.round;
      var update = {};
      update['rounds.' + state.round + '.' + state.online.myKey] = state.answers;
      state.online.docRef.update(update).catch(function (err) {
        console.warn('Envoi des réponses impossible.', err);
      });
      $('waitingForName').textContent = state.online.otherName || 'l’autre joueur';
      $('waitingSub').textContent = 'Manche ' + state.round + ' — le verdict arrive dès que vous avez tous les deux répondu.';
      showScreen('screen-waiting-result');
    }
  }

  // ---------- round verdict ----------

  function getRoundTier(common) {
    if (common === ROUND_SIZE) return { emoji: '🔥', label: 'Perfect Match !' };
    if (common > 3) return { emoji: '💕', label: 'C’est un Match !' };
    if (common <= 2) return { emoji: '😅', label: 'Pas un match' };
    return { emoji: '🤏', label: 'Presque…' };
  }

  function isMatchForPair(a1, a2, pair) {
    if (pair.comp && (a1 === 'a' || a1 === 'b') && (a2 === 'a' || a2 === 'b')) {
      return a1 !== a2;
    }
    return a1 === a2;
  }

  function countCommon(answers1, answers2, pairIdx) {
    var c = 0;
    for (var i = 0; i < answers1.length; i++) {
      if (isMatchForPair(answers1[i], answers2[i], getPair(pairIdx[i]))) c++;
    }
    return c;
  }

  function pickLabel(side, pair) {
    if (side === 'a') return pair.a;
    if (side === 'b') return pair.b;
    if (side === 'neither') return 'Aucune des deux';
    if (side === 'both') return 'Les deux';
    return side;
  }

  function buildRoundRowsHtml(pairIdx, answers1, answers2, name1, name2) {
    var html = '';
    for (var i = 0; i < pairIdx.length; i++) {
      var pair = getPair(pairIdx[i]);
      var a1 = answers1[i];
      var a2 = answers2[i];
      var isMatch = isMatchForPair(a1, a2, pair);
      var pick1 = pickLabel(a1, pair);
      var pick2 = pickLabel(a2, pair);

      html +=
        '<div class="result-row' + (isMatch ? ' match' : '') + '">' +
          '<span class="result-icon">' + (isMatch ? '💞' : '↔️') + '</span>' +
          '<div class="result-body">' +
            '<div class="result-question">' + pair.a + ' / ' + pair.b + '</div>' +
            '<div class="result-picks">' +
              '<span class="result-pick"><span class="name">' + escapeHtml(name1) + ' →</span> ' + escapeHtml(pick1) + '</span>' +
              '<span class="result-pick"><span class="name">' + escapeHtml(name2) + ' →</span> ' + escapeHtml(pick2) + '</span>' +
            '</div>' +
          '</div>' +
        '</div>';
    }
    return html;
  }

  function revealRound(roundNumber, pairIdx, name1, answers1, name2, answers2) {
    var common = countCommon(answers1, answers2, pairIdx);
    var tier = getRoundTier(common);

    $('roundEmoji').textContent = tier.emoji;
    $('roundBadgeLabel').textContent = tier.label;
    $('roundNumberLabel').textContent = roundNumber;
    $('roundCommonCount').textContent = common;
    $('roundResultsList').innerHTML = buildRoundRowsHtml(pairIdx, answers1, answers2, name1, name2);

    state.sessionRounds.push({
      round: roundNumber, common: common, tier: tier,
      pairIdx: pairIdx.slice(), answers1: answers1.slice(), answers2: answers2.slice(),
      name1: name1, name2: name2
    });
    state.lastNames = { name1: name1, name2: name2 };

    var totalAnswered = state.sessionRounds.length * ROUND_SIZE;
    var totalCommon = 0;
    state.sessionRounds.forEach(function (r) { totalCommon += r.common; });
    var runningPct = totalAnswered ? Math.round((totalCommon / totalAnswered) * 100) : 0;

    $('globalStatPercent').textContent = runningPct + '%';
    $('globalStatCount').textContent = totalAnswered;
    $('globalStatTotal').textContent = getTotalPairsCount();
    $('globalStatBarFill').style.width = runningPct + '%';

    var remaining = getTotalPairsCount() - totalAnswered;
    $('roundRemainingCount').textContent = remaining > 0 ? remaining + ' questions restantes' : '';

    var allSeen = roundNumber >= getMaxRounds();
    $('nextRoundBtn').hidden = allSeen;
    $('allQuestionsSeenNote').hidden = !allSeen;

    updateHistoryBtn();
    showScreen('screen-round-result');
  }

  function initRoundActions() {
    $('nextRoundBtn').addEventListener('click', function () {
      if (state.round >= getMaxRounds()) { showFinalSummary(); return; }
      state.round++;

      if (state.mode === 'hotseat') {
        state.pairsOrder = getRoundPairIndexes(state.hotseat.seed, state.round);
        state.hotseat.currentPlayer = 1;
        $('handoffName').textContent = state.hotseat.p1Name;
        showScreen('screen-handoff');
      } else if (state.mode === 'online') {
        state.pairsOrder = getRoundPairIndexes(state.online.code, state.round);
        startRound(state.online.myName, state.pairsOrder, state.round);
      }
    });

    $('endSessionBtn').addEventListener('click', showFinalSummary);
  }

  // ---------- final summary ----------

  function showFinalSummary() {
    var totalCommon = 0;
    var rowsHtml = '';

    state.sessionRounds.forEach(function (r) {
      totalCommon += r.common;
      rowsHtml +=
        '<div class="summary-row">' +
          '<span class="round-name">Manche ' + r.round + '</span>' +
          '<span class="round-badge">' + r.tier.emoji + ' ' + r.common + '/' + ROUND_SIZE + ' — ' + r.tier.label + '</span>' +
        '</div>';
    });

    var totalQuestions = state.sessionRounds.length * ROUND_SIZE;
    var pct = totalQuestions ? Math.round((totalCommon / totalQuestions) * 100) : 0;
    var names = state.lastNames || { name1: '', name2: '' };

    $('matchPercent').textContent = pct + '%';
    $('summaryRoundsCount').textContent = state.sessionRounds.length;
    $('matchNames').textContent = names.name1 + ' & ' + names.name2;
    $('resultsList').innerHTML = rowsHtml || '<p class="form-sub">Aucune manche jouée.</p>';

    showScreen('screen-results');
  }

  // ---------- custom questions ----------

  function initAddQuestion() {
    $('addQuestionBtn').addEventListener('click', function () {
      $('addQuestionForm').hidden = false;
      $('customOptionA').value = '';
      $('customOptionB').value = '';
      $('customOptionA').focus();
    });

    $('cancelAddQuestion').addEventListener('click', function () {
      $('addQuestionForm').hidden = true;
    });

    $('confirmAddQuestion').addEventListener('click', function () {
      var a = $('customOptionA').value.trim();
      var b = $('customOptionB').value.trim();
      if (!a || !b) return;

      var newPair = { cat: 'Perso', ea: '✏️', a: a, eb: '✏️', b: b };
      customPairs.push(newPair);

      if (state.mode === 'online' && state.online && state.online.docRef) {
        var cpData = customPairs.map(function (p) { return { a: p.a, b: p.b }; });
        state.online.docRef.update({ customPairs: cpData }).catch(function () {});
      }

      $('addQuestionForm').hidden = true;

      var allSeen = state.round >= getMaxRounds();
      $('nextRoundBtn').hidden = allSeen;
      if (!allSeen) $('allQuestionsSeenNote').hidden = true;

      var totalAnswered = state.sessionRounds.length * ROUND_SIZE;
      var remaining = getTotalPairsCount() - totalAnswered;
      $('roundRemainingCount').textContent = remaining > 0 ? remaining + ' questions restantes' : '';
      $('globalStatTotal').textContent = getTotalPairsCount();
    });
  }

  // ---------- history overlay ----------

  function updateHistoryBtn() {
    $('historyBtn').hidden = state.sessionRounds.length === 0;
  }

  function buildHistoryHtml() {
    if (state.sessionRounds.length === 0) {
      return '<p class="history-empty">Aucune manche terminée pour le moment.</p>';
    }
    var html = '';
    for (var i = state.sessionRounds.length - 1; i >= 0; i--) {
      var r = state.sessionRounds[i];
      html += '<div class="history-round-block">';
      html += '<div class="history-round-title">' + r.tier.emoji + ' Manche ' + r.round + ' — ' + r.common + '/' + ROUND_SIZE + ' ' + r.tier.label + '</div>';
      html += buildRoundRowsHtml(r.pairIdx, r.answers1, r.answers2, r.name1, r.name2);
      html += '</div>';
    }
    return html;
  }

  function initHistory() {
    $('historyBtn').addEventListener('click', function () {
      $('historyBody').innerHTML = buildHistoryHtml();
      $('historyOverlay').hidden = false;
    });

    $('historyClose').addEventListener('click', function () {
      $('historyOverlay').hidden = true;
    });

    $('historyOverlay').addEventListener('click', function (e) {
      if (e.target === $('historyOverlay')) $('historyOverlay').hidden = true;
    });
  }

  // ---------- replay ----------

  function initReplay() {
    $('replayBtn').addEventListener('click', function () {
      if (roomListenerUnsub) { roomListenerUnsub(); roomListenerUnsub = null; }
      clearOnlineSession();
      state.mode = null;
      state.online = null;
      state.hotseat = null;
      state.round = 1;
      state.pairsOrder = [];
      state.currentIndex = 0;
      state.answers = [];
      state.sessionRounds = [];
      state.lastNames = null;
      customPairs = [];
      updateProgress();
      updateHistoryBtn();
      $('joinCodeInput').value = '';
      $('joinNameInput').value = '';
      $('hostNameInput').value = '';
      $('p1NameInput').value = '';
      $('p2NameInput').value = '';
      showScreen('screen-intro');
    });
  }

  // ---------- init ----------

  document.addEventListener('DOMContentLoaded', function () {
    initFirebase();
    initIntroScreen();
    initHostFlow();
    initJoinFlow();
    initHotseatFlow();
    initRoundActions();
    initExtraChoices();
    initAddQuestion();
    initHistory();
    initReplay();
    checkForSavedSession();
  });
})();
