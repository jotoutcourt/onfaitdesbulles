(function () {
  'use strict';

  var PAIRS = [
    // --- quotidien ---
    { ea: '🪥', a: 'Tube de dentifrice écrasé', eb: '🌀', b: 'Tube bien roulé' },
    { ea: '🌪️', a: 'Bordélique', eb: '🗄️', b: 'Tout est rangé' },
    { ea: '💡', a: 'Lumière toujours allumée', eb: '🌑', b: 'Lumière toujours éteinte' },
    { ea: '🍽️', a: 'Vaisselle tout de suite', eb: '🕰️', b: 'Vaisselle plus tard' },
    { ea: '🤫', a: 'Silence pour dormir', eb: '📻', b: 'Bruit de fond pour dormir' },
    { ea: '🌬️', a: 'Fenêtre ouverte la nuit', eb: '🚪', b: 'Fenêtre fermée' },
    { ea: '🌅', a: 'Douche le matin', eb: '🌙', b: 'Douche le soir' },
    { ea: '🔥', a: 'Chauffage à fond', eb: '🧶', b: 'Pull à la maison' },
    { ea: '🔔', a: 'Notifications activées', eb: '🔕', b: 'Téléphone en silencieux' },
    { ea: '🧽', a: 'Petit ménage très souvent', eb: '🧹', b: 'Gros ménage une fois par semaine' },
    { ea: '⬅️', a: 'Côté gauche du lit', eb: '➡️', b: 'Côté droit du lit' },
    { ea: '😴', a: 'Grasse matinée', eb: '🌅', b: 'Lever tôt' },
    { ea: '📖', a: 'Livre', eb: '📺', b: 'Série' },
    { ea: '🏃', a: 'Sportif du dimanche', eb: '💪', b: 'Sportif 7j/7' },
    { ea: '🥾', a: 'Dimanche rando', eb: '🛌', b: 'Dimanche dodo' },
    { ea: '🎬', a: 'Choisir le film ou la série ce soir', eb: '🤝', b: 'Laisser l’autre décider' },

    // --- voyage ---
    { ea: '🎒', a: 'Sac à dos léger', eb: '🧳', b: 'Valise organisée' },
    { ea: '🎲', a: 'Improviser sur place', eb: '🗺️', b: 'Itinéraire détaillé' },
    { ea: '🚗', a: 'Road trip en voiture', eb: '✈️', b: 'Vol direct' },
    { ea: '🆕', a: 'Nouvelle destination', eb: '🔁', b: 'Retourner au même endroit' },
    { ea: '🚐', a: 'Van aménagé', eb: '⛺', b: 'Tente et duvet' },
    { ea: '🐌', a: 'Prendre son temps', eb: '🏃', b: 'Enchaîner les activités' },
    { ea: '🏖️', a: 'Plage', eb: '🏔️', b: 'Montagne' },
    { ea: '🏙️', a: 'Vivre en ville', eb: '🌳', b: 'Vivre en campagne' },
    { ea: '🚗', a: 'Voyage en voiture', eb: '🚆', b: 'Voyage en train' },
    { ea: '☀️', a: 'Bandeur d’été', eb: '❄️', b: 'Bandeur d’hiver' },

    // --- argent ---
    { ea: '🐖', a: 'Épargner', eb: '🎉', b: 'Profiter' },
    { ea: '🛍️', a: 'Acheteur compulsif', eb: '🧠', b: 'Acheteur réfléchi' },

    // --- langage de l'amour ---
    { ea: '📣', a: 'Compliments', eb: '🛠️', b: 'Preuves par les actes' },
    { ea: '⚡', a: 'En reparler tout de suite', eb: '⏸️', b: 'Laisser retomber avant' },
    { ea: '😢', a: 'Montrer ses émotions', eb: '🧊', b: 'Les garder pour soi' },
    { ea: '🤗', a: 'Câlin', eb: '😘', b: 'Bisou' },
    { ea: '💬', a: 'Message', eb: '📞', b: 'Appel' },
    { ea: '🎁', a: 'Anniversaire surprise', eb: '🗓️', b: 'Anniversaire annoncé' },
    { ea: '📱', a: 'Texto au réveil', eb: '🌇', b: 'Silence radio le matin' },
    { ea: '🧠', a: 'Pardonner une infidélité émotionnelle', eb: '💋', b: 'Pardonner une infidélité physique' },

    // --- intimité ---
    { ea: '🌅', a: 'Sexe matinal', eb: '🌙', b: 'Sexe le soir' },
    { ea: '🌳', a: 'Excitant en extérieur', eb: '🏠', b: 'Uniquement à la maison' },
    { ea: '⬆️', a: 'Top', eb: '⬇️', b: 'Bottom' },
    { ea: '🤗', a: 'Câlins après sexe', eb: '🚿', b: 'Direct sous la douche' },
    { ea: '🕯️', a: 'Préliminaires longs et sensuels', eb: '⚡', b: 'Aller directement au but' },
    { ea: '😈', a: 'Dominer', eb: '😌', b: 'Être dominé(e)' },
    { ea: '🚿', a: 'Faire l’amour sous la douche', eb: '🛁', b: 'Faire l’amour dans un bain' },

    // --- sorties ---
    { ea: '🕺', a: 'Sortir en boite', eb: '🍻', b: 'Sortir dans les bars' },
    { ea: '💃', a: 'Danser toute la soirée', eb: '🗨️', b: 'Discuter dans un coin' },
    { ea: '🏠', a: 'Organiser des soirées chez soi', eb: '🚪', b: 'C’est mieux chez les autres' },
    { ea: '👨‍👩‍👧', a: 'Voir la famille souvent', eb: '📅', b: 'Voir la famille de temps en temps' },
    { ea: '📸', a: 'Publier les moments du couple', eb: '🔒', b: 'Garder ça pour soi' },
    { ea: '📺', a: 'Netflix', eb: '🎬', b: 'Cinéma' },
    { ea: '🐱', a: 'Chat', eb: '🐶', b: 'Chien' },

    // --- nourriture ---
    { ea: '🍫', a: 'Sucré', eb: '🍟', b: 'Salé' },
    { ea: '🍕', a: 'Pizza', eb: '🍣', b: 'Sushi' },
    { ea: '🍵', a: 'Thé', eb: '☕', b: 'Café' },
    { ea: '👩‍🍳', a: 'Cuisiner', eb: '🥡', b: 'Commander' },
    { ea: '🌶️', a: 'Épicé', eb: '🥛', b: 'Doux' },
    { ea: '🍳', a: 'Petit-déj copieux', eb: '🍌', b: 'Petit-déj léger' },
    { ea: '🍿', a: 'Grignoter toute la journée', eb: '🍽️', b: 'Trois repas fixes' },

    // --- valeurs & projets de vie ---
    { ea: '💼', a: 'Carrière ambitieuse', eb: '⚖️', b: 'Équilibre avant tout' },
    { ea: '🏢', a: 'Bel appartement en ville', eb: '🏡', b: 'Grande maison à la campagne' },
    { ea: '👥', a: "Beaucoup d'amis", eb: '💎', b: 'Peu mais fidèles' },
    { ea: '👶', a: 'Je veux des enfants', eb: '🚫', b: 'Je ne veux pas d’enfants' },
    { ea: '🚬', a: 'Petite clope', eb: '🚭', b: 'Ne fume jamais' },
    { ea: '🎲', a: 'Improviser', eb: '📋', b: 'Tout planifier' },
    { ea: '🏙️', a: 'Vivre en ville toute la vie', eb: '🌾', b: 'Finir à la campagne' },

    // --- avis tranchés ---
    { ea: '🎤', a: 'Taylor Swift : Reine', eb: '🙄', b: 'Taylor Swift : Surcotée' },
    { ea: '🥐', a: 'Pain au chocolat', eb: '🍫', b: 'Chocolatine' },
    { ea: '🍍', a: 'Ananas sur la pizza : Délice', eb: '🚫', b: 'Ananas sur la pizza : Crime' },
    { ea: '🦸', a: 'Marvel : Top', eb: '🤷', b: 'Marvel : Pas mon truc' },
    { ea: '🗼', a: 'Emily in Paris : Plaisir coupable', eb: '🙈', b: 'Emily in Paris : Honte nationale' },
    { ea: '🏆', a: 'Regarder le foot : Pendant la coupe du monde', eb: '⚽', b: 'Regarder le foot : Je loupe aucun match' },
    { ea: '⚡', a: 'Harry Potter : Culte', eb: '📈', b: 'Harry Potter : Trop hype' },
    { ea: '🦻', a: 'Ronfler : Mets des bouchons', eb: '🫀', b: 'Ronfler : Prend mon pouls pour vérifier si je suis en vie' }
  ];

  var CODE_CHARS = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';
  var ROUND_SIZE = 5;

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
    var perCycle = Math.floor(PAIRS.length / ROUND_SIZE);
    var cycleIndex = Math.floor((roundNumber - 1) / perCycle);
    var pos = (roundNumber - 1) % perCycle;
    var allIdx = [];
    for (var i = 0; i < PAIRS.length; i++) allIdx.push(i);
    var shuffled = seededShuffle(allIdx, seededRng(seed + ':' + cycleIndex));
    return shuffled.slice(pos * ROUND_SIZE, pos * ROUND_SIZE + ROUND_SIZE);
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

  // ---------- shared realtime listener ----------

  function attachRoomListener(docRef) {
    if (roomListenerUnsub) roomListenerUnsub();

    roomListenerUnsub = docRef.onSnapshot(function (snap) {
      if (!snap.exists || !state.online) return;
      var data = snap.data();
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
    var pair = PAIRS[pairIndex];

    var card = document.createElement('div');
    card.className = 'card';

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

  function countCommon(answers1, answers2) {
    var c = 0;
    for (var i = 0; i < answers1.length; i++) {
      if (answers1[i] === answers2[i]) c++;
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
      var pair = PAIRS[pairIdx[i]];
      var a1 = answers1[i];
      var a2 = answers2[i];
      var isMatch = a1 === a2;
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
    var common = countCommon(answers1, answers2);
    var tier = getRoundTier(common);

    $('roundEmoji').textContent = tier.emoji;
    $('roundBadgeLabel').textContent = tier.label;
    $('roundNumberLabel').textContent = roundNumber;
    $('roundCommonCount').textContent = common;
    $('roundResultsList').innerHTML = buildRoundRowsHtml(pairIdx, answers1, answers2, name1, name2);

    state.sessionRounds.push({ round: roundNumber, common: common, tier: tier });
    state.lastNames = { name1: name1, name2: name2 };

    var totalAnswered = state.sessionRounds.length * ROUND_SIZE;
    var totalCommon = 0;
    state.sessionRounds.forEach(function (r) { totalCommon += r.common; });
    var runningPct = totalAnswered ? Math.round((totalCommon / totalAnswered) * 100) : 0;
    $('runningStat').textContent =
      'Vous avez répondu à ' + totalAnswered + ' question' + (totalAnswered > 1 ? 's' : '') +
      ' sur ' + PAIRS.length + ', votre compatibilité est pour le moment de ' + runningPct + '%.';

    showScreen('screen-round-result');
  }

  function initRoundActions() {
    $('nextRoundBtn').addEventListener('click', function () {
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

  // ---------- replay ----------

  function initReplay() {
    $('replayBtn').addEventListener('click', function () {
      if (roomListenerUnsub) { roomListenerUnsub(); roomListenerUnsub = null; }
      state.mode = null;
      state.online = null;
      state.hotseat = null;
      state.round = 1;
      state.pairsOrder = [];
      state.currentIndex = 0;
      state.answers = [];
      state.sessionRounds = [];
      state.lastNames = null;
      updateProgress();
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
    initReplay();
  });
})();
