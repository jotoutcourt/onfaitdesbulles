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

  // Menu overlay
  var menuTrigger = document.getElementById('menuTrigger');
  var menuClose = document.getElementById('menuClose');
  var menuOverlay = document.getElementById('menuOverlay');
  if (menuTrigger && menuOverlay) {
    menuTrigger.addEventListener('click', function () {
      menuOverlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  }
  if (menuClose && menuOverlay) {
    menuClose.addEventListener('click', closeMenu);
  }
  if (menuOverlay) {
    menuOverlay.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', closeMenu);
    });
  }
  function closeMenu() {
    menuOverlay.classList.remove('open');
    document.body.style.overflow = '';
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

  // Catalogue filter pills (purely visual demo filtering)
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
     Panier & favoris — entièrement fictifs, stockés en localStorage.
     Aucune commande n'est réellement transmise ni payée.
     ===================================================================== */
  var CART_KEY = 'bloomCart';
  var FAV_KEY = 'bloomFavs';

  function getCart() { try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; } catch (e) { return []; } }
  function setCart(cart) { localStorage.setItem(CART_KEY, JSON.stringify(cart)); }
  function getFavs() { try { return JSON.parse(localStorage.getItem(FAV_KEY)) || []; } catch (e) { return []; } }
  function setFavs(favs) { localStorage.setItem(FAV_KEY, JSON.stringify(favs)); }

  var toastTimer;
  function showToast(msg) {
    var toast = document.getElementById('toast');
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toast.classList.remove('show'); }, 2200);
  }

  function updateCartBadge() {
    var badge = document.getElementById('cartBadge');
    if (!badge) return;
    var cart = getCart();
    var count = cart.reduce(function (sum, item) { return sum + item.qty; }, 0);
    badge.textContent = count;
    badge.classList.toggle('empty', count === 0);
  }

  function renderCart() {
    var itemsEl = document.getElementById('cartItems');
    var totalEl = document.getElementById('cartTotal');
    if (!itemsEl || !totalEl) return;
    var cart = getCart();
    if (!cart.length) {
      itemsEl.innerHTML = '<p class="cart-empty">Votre panier est vide.</p>';
      totalEl.textContent = '0 €';
      return;
    }
    var total = 0;
    itemsEl.innerHTML = cart.map(function (item) {
      total += item.price * item.qty;
      return '<div class="cart-item" data-id="' + item.id + '">' +
        (item.image ? '<img src="' + item.image + '" alt="" />' : '') +
        '<div class="cart-item-info">' +
          '<span class="ciname">' + item.name + '</span>' +
          '<span class="ciprice">' + item.price + ' € / unité</span>' +
          '<div class="cart-qty">' +
            '<button type="button" data-qty="-1" aria-label="Diminuer">&minus;</button>' +
            '<span>' + item.qty + '</span>' +
            '<button type="button" data-qty="1" aria-label="Augmenter">+</button>' +
            '<button type="button" class="cart-item-remove" data-remove>Retirer</button>' +
          '</div>' +
        '</div>' +
      '</div>';
    }).join('');
    totalEl.textContent = total + ' €';
  }

  function addToCart(id, name, price, image) {
    var cart = getCart();
    var existing = cart.filter(function (i) { return i.id === id; })[0];
    if (existing) { existing.qty += 1; } else { cart.push({ id: id, name: name, price: price, image: image || '', qty: 1 }); }
    setCart(cart);
    updateCartBadge();
    renderCart();
    var badge = document.getElementById('cartBadge');
    if (badge) { badge.classList.remove('bump'); void badge.offsetWidth; badge.classList.add('bump'); }
    showToast(name + ' ajouté au panier');
  }

  document.addEventListener('click', function (e) {
    var addBtn = e.target.closest('[data-add]');
    if (addBtn) {
      var card = addBtn.closest('[data-id]');
      if (card) {
        addToCart(card.getAttribute('data-id'), card.getAttribute('data-name'), parseFloat(card.getAttribute('data-price')), card.getAttribute('data-image'));
        addBtn.classList.add('added');
        var originalLabel = addBtn.textContent;
        addBtn.textContent = 'Ajouté ✓';
        setTimeout(function () { addBtn.classList.remove('added'); addBtn.textContent = originalLabel; }, 1400);
      }
      return;
    }

    var favBtn = e.target.closest('.product-fav');
    if (favBtn) {
      var favCard = favBtn.closest('[data-id]');
      if (favCard) {
        var id = favCard.getAttribute('data-id');
        var favs = getFavs();
        var idx = favs.indexOf(id);
        if (idx === -1) {
          favs.push(id);
          favBtn.classList.add('is-fav');
          showToast(favCard.getAttribute('data-name') + ' ajouté aux favoris');
        } else {
          favs.splice(idx, 1);
          favBtn.classList.remove('is-fav');
        }
        setFavs(favs);
      }
      return;
    }

    var qtyBtn = e.target.closest('[data-qty]');
    if (qtyBtn) {
      var itemEl = qtyBtn.closest('.cart-item');
      var cid = itemEl.getAttribute('data-id');
      var delta = parseInt(qtyBtn.getAttribute('data-qty'), 10);
      var cart = getCart();
      var it = cart.filter(function (i) { return i.id === cid; })[0];
      if (it) {
        it.qty += delta;
        if (it.qty <= 0) cart = cart.filter(function (i) { return i.id !== cid; });
        setCart(cart);
        updateCartBadge();
        renderCart();
      }
      return;
    }

    var removeBtn = e.target.closest('[data-remove]');
    if (removeBtn) {
      var remItemEl = removeBtn.closest('.cart-item');
      var rid = remItemEl.getAttribute('data-id');
      var cart2 = getCart().filter(function (i) { return i.id !== rid; });
      setCart(cart2);
      updateCartBadge();
      renderCart();
    }
  });

  // Cart drawer open/close
  var cartTrigger = document.getElementById('cartTrigger');
  var cartDrawer = document.getElementById('cartDrawer');
  var cartBackdrop = document.getElementById('cartBackdrop');
  var cartClose = document.getElementById('cartClose');
  function openCart() { renderCart(); cartDrawer.classList.add('open'); cartBackdrop.classList.add('open'); }
  function closeCart() { cartDrawer.classList.remove('open'); cartBackdrop.classList.remove('open'); }
  if (cartTrigger && cartDrawer && cartBackdrop) {
    cartTrigger.addEventListener('click', openCart);
    if (cartClose) cartClose.addEventListener('click', closeCart);
    cartBackdrop.addEventListener('click', closeCart);
  }

  // Mark favorited products on load
  document.querySelectorAll('[data-id]').forEach(function (card) {
    var favBtn = card.querySelector('.product-fav');
    if (favBtn && getFavs().indexOf(card.getAttribute('data-id')) !== -1) favBtn.classList.add('is-fav');
  });
  updateCartBadge();

  /* =====================================================================
     Tunnel de commande fictif — formulaire puis confirmation.
     Aucune donnée n'est transmise, tout reste local au navigateur.
     ===================================================================== */
  var cartCheckout = document.getElementById('cartCheckout');
  var checkoutBackdrop = document.getElementById('checkoutBackdrop');
  var checkoutModal = document.getElementById('checkoutModal');
  var checkoutClose = document.getElementById('checkoutClose');
  var checkoutStepForm = document.getElementById('checkoutStepForm');
  var checkoutStepSuccess = document.getElementById('checkoutStepSuccess');
  var checkoutForm = document.getElementById('checkoutForm');
  var checkoutDone = document.getElementById('checkoutDone');

  function summaryRowsHtml(cart) {
    return cart.map(function (i) {
      return '<div class="checkout-summary-row"><span>' + i.name + ' × ' + i.qty + '</span><span>' + (i.price * i.qty) + ' €</span></div>';
    }).join('');
  }

  function openCheckout() {
    var cart = getCart();
    if (!cart.length) return;
    var total = cart.reduce(function (s, i) { return s + i.price * i.qty; }, 0);
    var summaryEl = document.getElementById('checkoutSummary');
    var totalEl = document.getElementById('checkoutTotal');
    if (summaryEl) summaryEl.innerHTML = summaryRowsHtml(cart);
    if (totalEl) totalEl.textContent = total + ' €';
    if (checkoutForm) checkoutForm.reset();
    checkoutStepForm.hidden = false;
    checkoutStepSuccess.hidden = true;
    closeCart();
    checkoutBackdrop.classList.add('open');
    checkoutModal.classList.add('open');
  }
  function closeCheckout() {
    checkoutBackdrop.classList.remove('open');
    checkoutModal.classList.remove('open');
  }
  if (cartCheckout && checkoutModal && checkoutBackdrop) {
    cartCheckout.addEventListener('click', openCheckout);
    if (checkoutClose) checkoutClose.addEventListener('click', closeCheckout);
    checkoutBackdrop.addEventListener('click', closeCheckout);
    if (checkoutDone) checkoutDone.addEventListener('click', closeCheckout);

    if (checkoutForm) {
      checkoutForm.addEventListener('submit', function (e) {
        e.preventDefault();
        var cart = getCart();
        var total = cart.reduce(function (s, i) { return s + i.price * i.qty; }, 0);
        var nameVal = document.getElementById('coName').value.trim() || 'vous';
        var dateVal = document.getElementById('coDate').value;
        var dateLabel = 'prochainement';
        if (dateVal) {
          var d = new Date(dateVal + 'T00:00:00');
          dateLabel = d.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' });
        }
        var orderNum = 'BLM-' + Math.floor(10000 + Math.random() * 90000);

        document.getElementById('successName').textContent = nameVal.split(' ')[0];
        document.getElementById('orderNumber').textContent = '#' + orderNum;
        document.getElementById('deliveryDate').textContent = dateLabel;
        var successSummaryEl = document.getElementById('successSummary');
        if (successSummaryEl) {
          successSummaryEl.innerHTML = summaryRowsHtml(cart) +
            '<div class="checkout-summary-total"><span>Total</span><span>' + total + ' €</span></div>';
        }

        checkoutStepForm.hidden = true;
        checkoutStepSuccess.hidden = false;

        setCart([]);
        updateCartBadge();
      });
    }
  }

  /* =====================================================================
     Recherche — filtre le catalogue complet et amène jusqu'au produit.
     ===================================================================== */
  var PRODUCTS = [
    { id: 'pivoines', name: 'Pivoines', price: '8 €/tige' },
    { id: 'renoncules', name: 'Renoncules blanches', price: '7 €/tige' },
    { id: 'hortensias', name: 'Hortensias bleus', price: '9 €/tige' },
    { id: 'roses-anciennes', name: 'Roses anciennes rouges', price: '6 €/tige' },
    { id: 'alstroemeria', name: 'Alstroemeria', price: '5 €/tige' },
    { id: 'eclat-blanc', name: 'Éclat Blanc', price: '68 €' },
    { id: 'douceur-rosee', name: 'Douceur Rosée', price: '54 €' },
    { id: 'brins-simples', name: 'Brins, brindilles', price: '12 €/tige' },
    { id: 'bouquet-mariee', name: 'Bouquet de mariée sur-mesure', price: 'Sur devis' },
    { id: 'composition-entreprise', name: "Composition d'entreprise", price: 'Sur devis' },
    { id: 'couronne-sechee', name: 'Couronne de fleurs séchées', price: '45 €' },
    { id: 'champetre-pet', name: 'Bouquet champêtre (pet-friendly)', price: '42 €' }
  ];

  function normalize(str) {
    return str.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
  }

  var searchTrigger = document.getElementById('searchTrigger');
  var searchOverlay = document.getElementById('searchOverlay');
  var searchClose = document.getElementById('searchClose');
  var searchInput = document.getElementById('searchInput');
  var searchResults = document.getElementById('searchResults');

  function renderSearchResults(query) {
    if (!searchResults) return;
    var q = normalize(query.trim());
    if (!q) {
      searchResults.innerHTML = '<p class="search-hint">Tapez le nom d\'une fleur ou d\'un bouquet…</p>';
      return;
    }
    var matches = PRODUCTS.filter(function (p) { return normalize(p.name).indexOf(q) !== -1; });
    if (!matches.length) {
      searchResults.innerHTML = '<p class="search-empty">Aucun résultat pour « ' + query + ' ».</p>';
      return;
    }
    searchResults.innerHTML = matches.map(function (p) {
      return '<a class="search-result" href="catalogue.html#p-' + p.id + '"><span>' + p.name + '</span><span class="sr-price">' + p.price + '</span></a>';
    }).join('');
  }

  function openSearch() {
    searchOverlay.classList.add('open');
    renderSearchResults('');
    setTimeout(function () { if (searchInput) searchInput.focus(); }, 350);
  }
  function closeSearch() {
    searchOverlay.classList.remove('open');
    if (searchInput) searchInput.value = '';
  }
  if (searchTrigger && searchOverlay) {
    searchTrigger.addEventListener('click', openSearch);
    if (searchClose) searchClose.addEventListener('click', closeSearch);
    if (searchInput) searchInput.addEventListener('input', function () { renderSearchResults(searchInput.value); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && searchOverlay.classList.contains('open')) closeSearch();
    });
  }

  // Catalogue page: scroll to & highlight a product reached via search
  if (location.hash) {
    var target = document.querySelector(location.hash);
    if (target && target.classList.contains('product-card')) {
      setTimeout(function () {
        target.scrollIntoView({ behavior: 'smooth', block: 'center' });
        var media = target.querySelector('.product-media') || target;
        media.classList.add('search-highlight');
        setTimeout(function () { media.classList.remove('search-highlight'); }, 1600);
      }, 300);
    }
  }

  /* =====================================================================
     Réservation d'atelier — fictive, deux créneaux d'août.
     ===================================================================== */
  var bookTrigger = document.getElementById('bookTrigger');
  var bookingBackdrop = document.getElementById('bookingBackdrop');
  var bookingModal = document.getElementById('bookingModal');
  var bookingClose = document.getElementById('bookingClose');
  var bookingStepForm = document.getElementById('bookingStepForm');
  var bookingStepSuccess = document.getElementById('bookingStepSuccess');
  var bookingForm = document.getElementById('bookingForm');
  var bookingDone = document.getElementById('bookingDone');
  var dateOptions = document.querySelectorAll('.date-option');
  var peopleCountEl = document.getElementById('peopleCount');
  var bookingTotalEl = document.getElementById('bookingTotal');

  var peopleCount = 1;
  var selectedDateBtn = null;

  function updateBookingTotal() {
    if (!selectedDateBtn || !bookingTotalEl) return;
    var price = parseFloat(selectedDateBtn.getAttribute('data-price'));
    bookingTotalEl.textContent = (price * peopleCount) + ' €';
  }
  function selectDate(btn) {
    if (!btn) return;
    dateOptions.forEach(function (d) { d.classList.remove('selected'); });
    btn.classList.add('selected');
    selectedDateBtn = btn;
    updateBookingTotal();
  }
  function updatePeopleUI() {
    if (peopleCountEl) peopleCountEl.textContent = peopleCount;
    updateBookingTotal();
  }

  dateOptions.forEach(function (btn) {
    btn.addEventListener('click', function () { selectDate(btn); });
  });

  document.addEventListener('click', function (e) {
    var peopleBtn = e.target.closest('[data-people]');
    if (peopleBtn) {
      var delta = parseInt(peopleBtn.getAttribute('data-people'), 10);
      peopleCount = Math.max(1, Math.min(6, peopleCount + delta));
      updatePeopleUI();
    }
  });

  function openBooking(presetBtn) {
    peopleCount = 1;
    updatePeopleUI();
    if (presetBtn) {
      var match = null;
      dateOptions.forEach(function (d) { if (d.getAttribute('data-date') === presetBtn.getAttribute('data-date')) match = d; });
      selectDate(match || dateOptions[0]);
    } else if (dateOptions.length) {
      selectDate(dateOptions[0]);
    }
    if (bookingForm) bookingForm.reset();
    bookingStepForm.hidden = false;
    bookingStepSuccess.hidden = true;
    bookingBackdrop.classList.add('open');
    bookingModal.classList.add('open');
  }
  function closeBooking() {
    bookingBackdrop.classList.remove('open');
    bookingModal.classList.remove('open');
  }

  if (bookTrigger && bookingModal) bookTrigger.addEventListener('click', function () { openBooking(null); });
  document.querySelectorAll('[data-book]').forEach(function (btn) {
    btn.addEventListener('click', function () { openBooking(btn); });
  });
  if (bookingClose) bookingClose.addEventListener('click', closeBooking);
  if (bookingBackdrop) bookingBackdrop.addEventListener('click', closeBooking);
  if (bookingDone) bookingDone.addEventListener('click', closeBooking);

  if (bookingForm) {
    bookingForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var nameVal = document.getElementById('bkName').value.trim() || 'vous';
      var ref = 'ATL-' + Math.floor(1000 + Math.random() * 9000);
      var dateLabel = selectedDateBtn ? selectedDateBtn.getAttribute('data-date') : '';
      var themeLabel = selectedDateBtn ? selectedDateBtn.getAttribute('data-theme') : '';
      document.getElementById('bookingSuccessName').textContent = nameVal.split(' ')[0];
      document.getElementById('bookingRef').textContent = '#' + ref;
      document.getElementById('bookingSummaryLine').textContent =
        themeLabel + ' — ' + dateLabel + ' — ' + peopleCount + ' personne' + (peopleCount > 1 ? 's' : '');
      bookingStepForm.hidden = true;
      bookingStepSuccess.hidden = false;
    });
  }
})();
