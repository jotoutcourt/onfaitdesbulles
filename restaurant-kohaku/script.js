// Kōhaku — comportements UI communs (header sticky, menu mobile, reveal au scroll)

document.addEventListener('DOMContentLoaded', function () {
  var header = document.querySelector('.site-header');
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.main-nav');

  function onScroll() {
    if (!header) return;
    if (window.scrollY > 40) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
  }

  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      nav.classList.toggle('is-open');
      toggle.classList.toggle('is-active');
    });

    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('is-open');
        toggle.classList.remove('is-active');
      });
    });
  }

  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    revealEls.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add('is-visible');
    });
  }

  /* =====================================================================
     Click & Collect — panier fictif stocké en localStorage, tunnel de
     commande simulé (aucune donnée réelle envoyée).
     ===================================================================== */
  var CART_KEY = 'kohakuCart';

  function getCart() {
    try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; }
    catch (e) { return []; }
  }
  function setCart(cart) { localStorage.setItem(CART_KEY, JSON.stringify(cart)); }

  function updateCartBadge() {
    var badge = document.getElementById('cartBadge');
    if (!badge) return;
    var count = getCart().reduce(function (sum, item) { return sum + item.qty; }, 0);
    badge.textContent = count;
    badge.hidden = count === 0;
  }

  function cartTotal(cart) {
    return cart.reduce(function (sum, item) { return sum + item.price * item.qty; }, 0);
  }

  function renderCart() {
    var itemsEl = document.getElementById('cartItems');
    var totalEl = document.getElementById('cartTotal');
    var checkoutLink = document.getElementById('cartCheckoutBtn');
    if (!itemsEl) return;
    var cart = getCart();

    if (!cart.length) {
      itemsEl.innerHTML = '<p class="cart-empty">Votre panier est vide.</p>';
    } else {
      itemsEl.innerHTML = cart.map(function (item) {
        return '<div class="cart-item" data-id="' + item.id + '">' +
          '<div class="cart-item-info">' +
            '<h4>' + item.name + '</h4>' +
            '<div class="cart-item-price">' + item.price + ' € pièce</div>' +
            '<div class="cart-qty">' +
              '<button type="button" data-qty="-1" aria-label="Retirer un">−</button>' +
              '<span>' + item.qty + '</span>' +
              '<button type="button" data-qty="1" aria-label="Ajouter un">+</button>' +
            '</div>' +
            '<button type="button" class="cart-item-remove" data-remove>Retirer</button>' +
          '</div>' +
        '</div>';
      }).join('');
    }

    if (totalEl) totalEl.textContent = cartTotal(cart) + ' €';
    if (checkoutLink) {
      if (cart.length) { checkoutLink.classList.remove('is-disabled'); checkoutLink.removeAttribute('disabled'); }
      else { checkoutLink.classList.add('is-disabled'); checkoutLink.setAttribute('disabled', 'disabled'); }
    }
  }

  function addToCart(id, name, price) {
    var cart = getCart();
    var existing = cart.filter(function (i) { return i.id === id; })[0];
    if (existing) { existing.qty += 1; }
    else { cart.push({ id: id, name: name, price: price, qty: 1 }); }
    setCart(cart);
    updateCartBadge();
    renderCart();
  }

  updateCartBadge();

  document.querySelectorAll('.togo-add').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var id = btn.getAttribute('data-id');
      var name = btn.getAttribute('data-name');
      var price = parseFloat(btn.getAttribute('data-price'));
      addToCart(id, name, price);

      var original = btn.textContent;
      btn.textContent = 'Ajouté ✓';
      btn.classList.add('is-added');
      setTimeout(function () {
        btn.textContent = original;
        btn.classList.remove('is-added');
      }, 1200);
    });
  });

  document.addEventListener('click', function (e) {
    var qtyBtn = e.target.closest('.cart-qty button');
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
    var removeBtn = e.target.closest('.cart-item-remove');
    if (removeBtn) {
      var rItemEl = removeBtn.closest('.cart-item');
      var rid = rItemEl.getAttribute('data-id');
      var cart2 = getCart().filter(function (i) { return i.id !== rid; });
      setCart(cart2);
      updateCartBadge();
      renderCart();
    }
  });

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

  /* Tunnel de commande */
  var checkoutBackdrop = document.getElementById('checkoutBackdrop');
  var checkoutModal = document.getElementById('checkoutModal');
  var checkoutClose = document.getElementById('checkoutClose');
  var checkoutStepForm = document.getElementById('checkoutStepForm');
  var checkoutStepLoading = document.getElementById('checkoutStepLoading');
  var checkoutStepSuccess = document.getElementById('checkoutStepSuccess');
  var checkoutForm = document.getElementById('checkoutForm');
  var checkoutDone = document.getElementById('checkoutDone');
  var cartCheckoutBtn = document.getElementById('cartCheckoutBtn');

  function summaryRowsHtml(cart) {
    return cart.map(function (i) {
      return '<div class="checkout-summary-row"><span>' + i.name + ' × ' + i.qty + '</span><span>' + (i.price * i.qty) + ' €</span></div>';
    }).join('');
  }

  function openCheckout() {
    if (!getCart().length) return;
    var summaryEl = document.getElementById('checkoutSummary');
    if (summaryEl) {
      summaryEl.innerHTML = summaryRowsHtml(getCart()) +
        '<div class="checkout-summary-total"><span>Total</span><span>' + cartTotal(getCart()) + ' €</span></div>';
    }
    if (checkoutForm) checkoutForm.reset();
    checkoutStepForm.hidden = false;
    checkoutStepLoading.hidden = true;
    checkoutStepSuccess.hidden = true;
    closeCart();
    checkoutBackdrop.classList.add('open');
    checkoutModal.classList.add('open');
  }
  function closeCheckout() {
    checkoutBackdrop.classList.remove('open');
    checkoutModal.classList.remove('open');
  }

  if (cartCheckoutBtn) cartCheckoutBtn.addEventListener('click', openCheckout);

  if (checkoutBackdrop && checkoutModal) {
    if (checkoutClose) checkoutClose.addEventListener('click', closeCheckout);
    checkoutBackdrop.addEventListener('click', closeCheckout);
    if (checkoutDone) checkoutDone.addEventListener('click', closeCheckout);

    if (checkoutForm) {
      checkoutForm.addEventListener('submit', function (e) {
        e.preventDefault();
        var cart = getCart();
        if (!cart.length) return;

        checkoutStepForm.hidden = true;
        checkoutStepLoading.hidden = false;

        setTimeout(function () {
          var total = cartTotal(cart);
          var nameVal = (document.getElementById('ccName') || {}).value || 'vous';
          var slotVal = (document.getElementById('ccSlot') || {}).value || 'dès que possible';
          var orderNum = 'KHK-' + Math.floor(10000 + Math.random() * 90000);

          var successNameEl = document.getElementById('ccSuccessName');
          var orderNumberEl = document.getElementById('ccOrderNumber');
          var pickupSlotEl = document.getElementById('ccPickupSlot');
          if (successNameEl) successNameEl.textContent = nameVal.split(' ')[0];
          if (orderNumberEl) orderNumberEl.textContent = '#' + orderNum;
          if (pickupSlotEl) pickupSlotEl.textContent = slotVal;

          var successSummaryEl = document.getElementById('ccSuccessSummary');
          if (successSummaryEl) {
            successSummaryEl.innerHTML = summaryRowsHtml(cart) +
              '<div class="checkout-summary-total"><span>Total</span><span>' + total + ' €</span></div>';
          }

          checkoutStepLoading.hidden = true;
          checkoutStepSuccess.hidden = false;

          setCart([]);
          updateCartBadge();
        }, 1400);
      });
    }
  }
});
