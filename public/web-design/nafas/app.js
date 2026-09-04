const I18N = window.NAFASI18N;
I18N.init();
const t = (key, vars) => I18N.t(key, vars);
const tp = (product, field) => I18N.product(product, field);

const state = {
  products: [],
  cart: JSON.parse(localStorage.getItem('nafas-cart') || '[]'),
  audience: 'all',
  category: 'all',
  sort: 'featured',
  activeProduct: null,
  selectedSize: null,
  shipping: { amount: 49, label: t('checkout.shipping') }
};

const $ = (q, root = document) => root.querySelector(q);
const $$ = (q, root = document) => [...root.querySelectorAll(q)];
const money = n => `${new Intl.NumberFormat(I18N.locale()).format(Math.round(n))} MAD`;
const fallback = './assets/fallback.svg';

function toast(message) {
  const el = $('#toast');
  el.textContent = message;
  el.classList.add('show');
  clearTimeout(toast.t);
  toast.t = setTimeout(() => el.classList.remove('show'), 2200);
}

function saveCart() {
  localStorage.setItem('nafas-cart', JSON.stringify(state.cart));
  renderCart();
}

function getProduct(id) { return state.products.find(p => p.id === Number(id)); }
function cartQty() { return state.cart.reduce((n, i) => n + i.quantity, 0); }
function cartSubtotal() {
  return state.cart.reduce((sum, line) => {
    const p = getProduct(line.productId);
    return sum + (p ? p.price * line.quantity : 0);
  }, 0);
}

function imageTag(src, alt, className = '') {
  return `<img class="${className}" src="${src}" alt="${alt}" loading="lazy">`;
}

function audienceLabel(audience) {
  return ({
    Women: t('shop.women'),
    Men: t('shop.men'),
    Unisex: t('shop.unisex'),
    Accessories: t('shop.objects')
  })[audience] || audience;
}

function matchesAudience(product, audience = state.audience) {
  // Gender departments are intentionally strict: unisex pieces stay in their own department.
  return audience === 'all' || product.audience === audience;
}

function updateAudienceFilters() {
  const counts = state.products.reduce((acc, p) => {
    acc[p.audience] = (acc[p.audience] || 0) + 1;
    return acc;
  }, {});
  const labels = {
    all: t('shop.all'), Women: t('shop.women'), Men: t('shop.men'),
    Unisex: t('shop.unisex'), Accessories: t('shop.objects')
  };
  $$('[data-audience-filter]').forEach(button => {
    const key = button.dataset.audienceFilter;
    const count = key === 'all' ? state.products.length : (counts[key] || 0);
    button.classList.toggle('active', key === state.audience);
    button.setAttribute('aria-pressed', String(key === state.audience));
    button.innerHTML = `<span>${labels[key] || key}</span><span class="filter-count">${count}</span>`;
  });
}

function updateCategoryFilter() {
  const select = $('#categorySelect');
  if (!select) return;
  const scoped = state.products.filter(p => matchesAudience(p));
  const categories = [...new Set(scoped.map(p => p.category))].sort((a,b) => {
    const aLabel = tp({category:a}, 'category');
    const bLabel = tp({category:b}, 'category');
    return aLabel.localeCompare(bLabel, I18N.locale());
  });
  if (state.category !== 'all' && !categories.includes(state.category)) state.category = 'all';
  select.innerHTML = `<option value="all">${t('shop.all_categories')}</option>` + categories.map(category =>
    `<option value="${category}">${tp({category}, 'category')}</option>`
  ).join('');
  select.value = state.category;
}

function renderProducts() {
  updateAudienceFilters();
  updateCategoryFilter();

  let products = state.products.filter(p => matchesAudience(p));
  if (state.category !== 'all') products = products.filter(p => p.category === state.category);
  if (state.sort === 'low') products.sort((a,b) => a.price - b.price);
  if (state.sort === 'high') products.sort((a,b) => b.price - a.price);
  if (state.sort === 'name') products.sort((a,b) => tp(a,'name').localeCompare(tp(b,'name'), I18N.locale()));

  $('#productCount').textContent = t('dyn.pieces', {count:products.length});
  const range = $('#shopRange');
  if (range) range.textContent = `${products.length} / ${state.products.length}`;
  $('#productGrid').innerHTML = products.map((p, idx) => `
    <article class="product-card reveal in-view" data-product-id="${p.id}" data-product-audience="${p.audience}">
      <button class="product-card__media" data-open-product="${p.id}" aria-label="${tp(p,'name')}">
        ${imageTag(p.image, p.imageAlt)}
        ${p.badge ? `<span class="product-card__badge">${p.badge}</span>` : ''}
        <span class="product-card__department">${audienceLabel(p.audience)}</span>
        <span class="quick-add"><span>${t('dyn.view_select')}</span><span>↗</span></span>
      </button>
      <div class="product-card__info">
        <h3>${tp(p,'name')}</h3>
        <span class="product-card__price">${money(p.price)}</span>
        <p>${audienceLabel(p.audience)} · ${tp(p,'color')} / ${tp(p,'category')}</p>
      </div>
    </article>`).join('');
}

function setAudience(audience) {
  state.audience = audience;
  state.category = 'all';
  renderProducts();
  document.querySelector('#shop').scrollIntoView({behavior:'smooth', block:'start'});
}
function openProduct(id) {
  const p = getProduct(id);
  if (!p) return;
  state.activeProduct = p;
  state.selectedSize = null;
  const panel = $('#productModalPanel');
  panel.innerHTML = `
    <div class="product-view">
      <div class="product-view__media">${imageTag(p.image, p.imageAlt)}</div>
      <div class="product-view__info">
        <div class="product-view__top"><span class="micro">${audienceLabel(p.audience)} / ${p.sku} / ${tp(p,'madeIn')}</span><button class="close-x" data-close-modal>×</button></div>
        <h2>${tp(p,'name')}</h2>
        <div class="product-view__price">${money(p.price)}</div>
        <p class="product-view__desc">${tp(p,'description')}</p>
        <div class="product-meta"><div><span>${t('dyn.color')}</span><b>${tp(p,'color')}</b></div><div><span>${t('dyn.fit')}</span><b>${tp(p,'fit')}</b></div><div><span>${t('dyn.material')}</span><b>${tp(p,'material')}</b></div><div><span>${t('dyn.origin')}</span><b>${tp(p,'madeIn')}</b></div></div>
        <div class="size-label"><span>${t('dyn.select_size')}</span><button id="sizeGuideBtn">${t('dyn.size_guide')}</button></div>
        <div class="size-grid">${p.sizes.map(s => `<button class="size-btn" data-size="${s}" ${Number(p.stock[s]||0)===0?'disabled':''}>${s}</button>`).join('')}</div>
        <button class="checkout-btn product-add" id="productAddBtn" disabled>${t('dyn.add_bag')} <span>↗</span></button>
        <p class="product-view__note">${t('dyn.product_note')}</p>
      </div>
    </div>`;
  $('#productModal').classList.add('open');
  $('#productModal').setAttribute('aria-hidden','false');
  document.body.classList.add('no-scroll');
}

function closeProduct() {
  $('#productModal').classList.remove('open');
  $('#productModal').setAttribute('aria-hidden','true');
  state.activeProduct = null;
  state.selectedSize = null;
  unlockBodyIfClear();
}

function addToCart(productId, size, quantity = 1) {
  const p = getProduct(productId);
  if (!p || !size) return;
  const stock = Number(p.stock[size] || 0);
  const existing = state.cart.find(i => i.productId === p.id && i.size === size);
  const desired = (existing ? existing.quantity : 0) + quantity;
  if (desired > stock) return toast(t('dyn.only_available', {stock,size}));
  if (existing) existing.quantity = desired;
  else state.cart.push({ productId:p.id, size, quantity });
  saveCart();
  toast(t('dyn.added_bag', {name:tp(p,'name')}));
}

function renderCart() {
  state.cart = state.cart.filter(line => getProduct(line.productId));
  const qty = cartQty();
  const subtotal = cartSubtotal();
  $('#cartCount').textContent = qty;
  $('#cartTitle').textContent = `${qty} ${t(qty === 1 ? 'dyn.item' : 'dyn.items')}`;
  $('#cartSubtotal').textContent = money(subtotal);
  const progress = Math.min(100, Math.round(subtotal / 2500 * 100));
  $('#progressBar').style.width = `${progress}%`;
  $('#progressValue').textContent = `${progress}%`;
  $('#deliveryText').textContent = subtotal >= 2500 ? t('dyn.free_unlocked') : t('dyn.to_free', {amount:money(2500 - subtotal)});
  $('#checkoutBtn').disabled = !state.cart.length;

  if (!state.cart.length) {
    $('#cartItems').innerHTML = `<div class="cart-empty"><div><div style="font-family:var(--serif);font-size:44px">${t('dyn.bag_empty_title')}</div><p>${t('dyn.bag_empty_body')}</p></div></div>`;
    return;
  }
  $('#cartItems').innerHTML = state.cart.map((line, index) => {
    const p = getProduct(line.productId);
    return `<div class="cart-line">
      ${imageTag(p.image, p.imageAlt)}
      <div><h4>${tp(p,'name')}</h4><p>${tp(p,'color')} / ${t('dyn.size')} ${line.size}</p><div class="qty-control"><button data-qty="-1" data-line="${index}">−</button><span>${line.quantity}</span><button data-qty="1" data-line="${index}">+</button></div></div>
      <div class="cart-line__right"><b>${money(p.price * line.quantity)}</b><button class="remove-line" data-remove="${index}">${t('dyn.remove')}</button></div>
    </div>`;
  }).join('');
}

function openCart() {
  $('#cartDrawer').classList.add('open');
  $('#cartDrawer').setAttribute('aria-hidden','false');
  document.body.classList.add('no-scroll');
}
function closeCart() {
  $('#cartDrawer').classList.remove('open');
  $('#cartDrawer').setAttribute('aria-hidden','true');
  unlockBodyIfClear();
}
function unlockBodyIfClear() {
  if (!$$('.modal.open,.search-overlay.open,.mobile-menu.open,.cart-drawer.open').length) document.body.classList.remove('no-scroll');
}

function checkoutSummary() {
  const subtotal = cartSubtotal();
  $('#checkoutItems').innerHTML = state.cart.map(line => {
    const p = getProduct(line.productId);
    return `<div class="summary-item">${imageTag(p.image,p.imageAlt)}<div><h4>${tp(p,'name')}</h4><p>${line.size} × ${line.quantity}</p></div><b>${money(p.price*line.quantity)}</b></div>`;
  }).join('');
  $('#checkoutSubtotal').textContent = money(subtotal);
  $('#checkoutShipping').textContent = money(state.shipping.amount);
  $('#shippingLabel').textContent = state.shipping.amount === 0 ? t('dyn.free_unlocked') : t('checkout.shipping');
  $('#checkoutTotal').textContent = money(subtotal + state.shipping.amount);
}

async function quoteShipping(city) {
  try {
    const subtotal = cartSubtotal();
    const r = await fetch(`/api/shipping-quote?city=${encodeURIComponent(city||'')}&subtotal=${subtotal}`);
    state.shipping = await r.json();
  } catch { state.shipping = {amount: subtotal>=2500?0:49,label:t('checkout.shipping')}; }
  checkoutSummary();
}

function openCheckout() {
  if (!state.cart.length) return;
  closeCart();
  quoteShipping($('#cityInput')?.value || '');
  checkoutSummary();
  $('#checkoutModal').classList.add('open');
  $('#checkoutModal').setAttribute('aria-hidden','false');
  document.body.classList.add('no-scroll');
}
function closeCheckout() {
  $('#checkoutModal').classList.remove('open');
  $('#checkoutModal').setAttribute('aria-hidden','true');
  unlockBodyIfClear();
}

async function placeOrder(form) {
  const button = $('#placeOrderBtn');
  const error = $('#checkoutError');
  button.disabled = true;
  button.firstChild.textContent = `${t('dyn.placing_order')} `;
  error.textContent = '';
  const fd = new FormData(form);
  const customer = Object.fromEntries(fd.entries());
  const payload = {
    customer,
    paymentMethod: fd.get('paymentMethod'),
    items: state.cart.map(i => ({ productId:i.productId, size:i.size, quantity:i.quantity }))
  };
  try {
    const r = await fetch('/api/orders',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)});
    const data = await r.json();
    if (!r.ok) throw new Error((data.details || [data.error]).join(' '));
    const order = data.order;
    state.cart = [];
    localStorage.removeItem('nafas-cart');
    renderCart();
    form.reset();
    closeCheckout();
    showOrderSuccess(order);
    fetchProducts();
  } catch(e) {
    error.textContent = e.message || t('dyn.unable_order');
  } finally {
    button.disabled = false;
    button.innerHTML = `${t('checkout.place_order')} <span>↗</span>`;
  }
}

function showOrderSuccess(order) {
  const modal = $('#trackModal');
  $('#trackResult').innerHTML = `<div class="track-result-card"><span class="micro">${t('dyn.order_confirmed')}</span><h3>${order.number}</h3><p>${t('dyn.thank_you_order',{name:order.customer.firstName,city:order.customer.city,total:money(order.total)})}</p><p>${order.paymentMethod==='bank'?t('dyn.bank_success'):t('dyn.cod_success')}</p><div class="track-timeline"><div class="track-step active">${t('dyn.confirmed')}</div><div class="track-step">${t('dyn.preparing')}</div><div class="track-step">${t('dyn.delivery')}</div></div></div>`;
  modal.classList.add('open');
  modal.setAttribute('aria-hidden','false');
  document.body.classList.add('no-scroll');
}

function openTrack() {
  $('#trackResult').innerHTML = '';
  $('#trackModal').classList.add('open');
  $('#trackModal').setAttribute('aria-hidden','false');
  document.body.classList.add('no-scroll');
}
function closeTrack() {
  $('#trackModal').classList.remove('open');
  $('#trackModal').setAttribute('aria-hidden','true');
  unlockBodyIfClear();
}

function openSearch() {
  $('#searchOverlay').classList.add('open');
  $('#searchOverlay').setAttribute('aria-hidden','false');
  document.body.classList.add('no-scroll');
  setTimeout(()=>$('#searchInput').focus(),60);
}
function closeSearch() {
  $('#searchOverlay').classList.remove('open');
  $('#searchOverlay').setAttribute('aria-hidden','true');
  unlockBodyIfClear();
}
function renderSearch(q='') {
  const s = q.trim().toLowerCase();
  if (!s) { $('#searchResults').innerHTML=''; return; }
  const hits = state.products.filter(p => [p.name,tp(p,'name'),p.category,tp(p,'category'),p.color,tp(p,'color'),p.description,tp(p,'description')].join(' ').toLowerCase().includes(s)).slice(0,8);
  $('#searchResults').innerHTML = hits.length ? hits.map(p => `<button class="search-result-row" data-search-product="${p.id}">${imageTag(p.image,p.imageAlt)}<div><h4>${tp(p,'name')}</h4><span>${tp(p,'category')} / ${tp(p,'color')}</span></div><span>${money(p.price)}</span></button>`).join('') : `<p style="font-family:var(--serif);font-size:34px">${t('dyn.no_pieces')}</p>`;
}

function setupEvents() {
  window.addEventListener('scroll', () => {
    $('#header').classList.toggle('scrolled', scrollY > 20);
    $$('[data-parallax]').forEach(el => {
      if (window.innerWidth < 760) return;
      const speed = Number(el.dataset.parallax || 0);
      el.style.transform = `translateY(${scrollY * speed}px)`;
    });
  }, {passive:true});

  document.addEventListener('click', e => {
    const open = e.target.closest('[data-open-product]');
    if (open) return openProduct(open.dataset.openProduct);
    const size = e.target.closest('[data-size]');
    if (size && !size.disabled) {
      state.selectedSize = size.dataset.size;
      $$('.size-btn').forEach(b => b.classList.toggle('active', b === size));
      $('#productAddBtn').disabled = false;
      return;
    }
    if (e.target.closest('[data-close-modal]')) return closeProduct();
    const qty = e.target.closest('[data-qty]');
    if (qty) {
      const line = state.cart[Number(qty.dataset.line)];
      const p = getProduct(line.productId);
      const next = line.quantity + Number(qty.dataset.qty);
      if (next <= 0) state.cart.splice(Number(qty.dataset.line),1);
      else if (next <= Number(p.stock[line.size]||0)) line.quantity = next;
      else toast(t('dyn.only_available',{stock:p.stock[line.size],size:line.size}));
      return saveCart();
    }
    const rem = e.target.closest('[data-remove]');
    if (rem) { state.cart.splice(Number(rem.dataset.remove),1); return saveCart(); }
    const filter = e.target.closest('[data-audience-filter]');
    if (filter) return setAudience(filter.dataset.audienceFilter);
    const nav = e.target.closest('[data-audience]');
    if (nav) return setAudience(nav.dataset.audience);
    const mobile = e.target.closest('[data-mobile-filter]');
    if (mobile) { closeMobileMenu(); return setAudience(mobile.dataset.mobileFilter); }
    const sr = e.target.closest('[data-search-product]');
    if (sr) { closeSearch(); return openProduct(sr.dataset.searchProduct); }
  });

  $('#productModalPanel').addEventListener('click', e => {
    if (e.target.id === 'productAddBtn' && state.activeProduct && state.selectedSize) {
      addToCart(state.activeProduct.id, state.selectedSize, 1);
      closeProduct();
      openCart();
    }
    if (e.target.id === 'sizeGuideBtn') toast(t('dyn.size_guide_toast'));
  });

  $('#cartBtn').addEventListener('click', openCart);
  $('#closeCart').addEventListener('click', closeCart);
  $('#checkoutBtn').addEventListener('click', openCheckout);
  $('#closeCheckout').addEventListener('click', closeCheckout);
  $('[data-close-checkout]').addEventListener('click', closeCheckout);
  $('#cityInput').addEventListener('input', e => { clearTimeout(quoteShipping.t); quoteShipping.t=setTimeout(()=>quoteShipping(e.target.value),250); });
  $('#checkoutForm').addEventListener('submit', e => { e.preventDefault(); placeOrder(e.currentTarget); });

  $('#trackBtn').addEventListener('click', openTrack);
  $('#footerTrack').addEventListener('click', openTrack);
  $('#closeTrack').addEventListener('click', closeTrack);
  $('[data-close-track]').addEventListener('click', closeTrack);
  $('#trackForm').addEventListener('submit', async e => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const result = $('#trackResult');
    result.innerHTML = `<div style="padding:0 30px;font-family:var(--mono);font-size:9px">${t('dyn.looking_order')}</div>`;
    try {
      const r = await fetch(`/api/orders/${encodeURIComponent(fd.get('number').trim())}?phone=${encodeURIComponent(fd.get('phone').trim())}`);
      const o = await r.json();
      if (!r.ok) throw new Error(o.error || t('dyn.order_not_found'));
      result.innerHTML = `<div class="track-result-card"><span class="micro">${t('dyn.confirmed')}</span><h3>${o.number}</h3><p>${t('dyn.track_sentence',{name:o.customer.firstName,total:money(o.total),status:o.status})}</p><div class="track-timeline"><div class="track-step active">${t('dyn.confirmed')}</div><div class="track-step">${t('dyn.preparing')}</div><div class="track-step">${t('dyn.delivery')}</div></div></div>`;
    } catch(err) { result.innerHTML = `<div style="padding:0 30px;color:#9c2f2f">${err.message}</div>`; }
  });

  $('#searchBtn').addEventListener('click', openSearch);
  $('#closeSearch').addEventListener('click', closeSearch);
  $('#searchInput').addEventListener('input', e => renderSearch(e.target.value));
  $('#categorySelect').addEventListener('change', e => { state.category = e.target.value; renderProducts(); });
  $('#sortSelect').addEventListener('change', e => { state.sort = e.target.value; renderProducts(); });

  $('#menuBtn').addEventListener('click', openMobileMenu);
  $('#closeMenu').addEventListener('click', closeMobileMenu);
  $('#newsletterForm').addEventListener('submit', e => { e.preventDefault(); e.currentTarget.reset(); toast(t('dyn.newsletter_toast')); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') { closeProduct(); closeCart(); closeCheckout(); closeTrack(); closeSearch(); closeMobileMenu(); } });
}

function openMobileMenu(){ $('#mobileMenu').classList.add('open'); $('#mobileMenu').setAttribute('aria-hidden','false'); document.body.classList.add('no-scroll'); }
function closeMobileMenu(){ $('#mobileMenu').classList.remove('open'); $('#mobileMenu').setAttribute('aria-hidden','true'); unlockBodyIfClear(); }

function setupReveal() {
  const io = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('in-view'); io.unobserve(entry.target); }
  }), {threshold:.08});
  $$('.reveal').forEach(el => io.observe(el));
}

async function fetchProducts() {
  try {
    const r = await fetch('./data/products.json');
    if (!r.ok) throw new Error('API unavailable');
    state.products = await r.json();
    renderProducts();
    renderCart();
  } catch (e) {
    $('#productGrid').innerHTML = `<p>${t('dyn.catalog_error')}</p>`;
  }
}

window.addEventListener('nafas:languagechange', () => {
  state.shipping.label = t('checkout.shipping');
  renderProducts();
  renderCart();
  checkoutSummary();
  if (state.activeProduct) openProduct(state.activeProduct.id);
  if ($('#searchInput')?.value) renderSearch($('#searchInput').value);
});

document.addEventListener('error', e => { if (e.target && e.target.tagName === 'IMG' && !e.target.dataset.fallback) { e.target.dataset.fallback='1'; e.target.src=fallback; } }, true);
window.addEventListener('load', () => setTimeout(() => $('#loader').classList.add('is-done'), 550));
setupEvents();
setupReveal();
fetchProducts();
