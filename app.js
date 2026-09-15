// Datos de productos
const RAW = `JOR-01|Air Jordan 1 High OG|negro charol|209999|Jordan|1|
JOR-02|Air Jordan 4 Retro "Bred"|negro/rojo/blanco/gris|209999|Jordan|1|
JOR-03|Air Jordan 4 Retro "Fire Red"|blanco/rojo/negro|209999|Jordan|1|
JOR-04|Air Jordan 4 Retro "Sail/Rosa"|blanco hueso/rosa/gris|209999|Jordan|1|
DUNK-01|Nike Dunk Low "Panda"|negro/blanco|194999|Nike Dunk||
DUNK-02|Nike Dunk Low "University Blue"|celeste/blanco|194999|Nike Dunk||
DUNK-03|Nike Dunk Low Disrupt|blanco/crema/rosa|194999|Nike Dunk||
DUNK-04|Nike Dunk Low|azul marino/blanco, suela gum|194999|Nike Dunk||
DUNK-05|Nike Dunk Low|bordó/blanco|194999|Nike Dunk||
DUNK-06|Nike Dunk Low|celeste/blanco con brillos|194999|Nike Dunk||
DUNK-07|Nike Dunk Low|gris/blanco|194999|Nike Dunk||
DUNK-08|Nike Dunk Low|lila/blanco|194999|Nike Dunk||
DUNK-10|Nike Dunk Low|verde/blanco|194999|Nike Dunk||
DUNK-11|Nike SB Dunk Low Pro|blanco/beige/gris|194999|Nike Dunk||
DUNK-12|Nike SB Dunk Low|blanco total|194999|Nike Dunk||
DUNK-14|Nike SB Dunk Low|gris claro/blanco, suela gum|194999|Nike Dunk||
DUNK-15|Nike SB Dunk Low|negro total (triple black)|194999|Nike Dunk||
DUNK-16|Nike SB Dunk Low|negro/blanco, suela gum|194999|Nike Dunk||
DUNK-17|Nike SB Dunk Low|rojo/negro "Bred SB"|194999|Nike Dunk||
SAM-01|Adidas Samba|blanco/negro|160000|Adidas Samba||
SAM-06|Adidas Samba|blanco total|160000|Adidas Samba||
SAM-07|Adidas Samba|blanco/rosa|160000|Adidas Samba||
SAM-08|Adidas Samba|blanco/verde|160000|Adidas Samba||
SAM-09|Adidas Samba|bordó/vino, blanco|160000|Adidas Samba||
SAM-10|Adidas Samba|crema/rosa|160000|Adidas Samba||
SAM-11|Adidas Samba gamuza puntera|beige/negro|160000|Adidas Samba||
SAM-12|Adidas Samba|marrón chocolate/blanco|160000|Adidas Samba||
SAM-13|Adidas Samba|negro/blanco, suela gum|160000|Adidas Samba||
SAM-14|Adidas Samba|rosa total|160000|Adidas Samba||
ADI-01|Adidas Adizero Boston 12|rosa/lila|130000|Adidas||
ADI-02|Adidas Campus|negro/blanco|135000|Adidas||
ADI-03|Adidas Forum Low|blanco/negro|149999|Adidas||
ADI-04|Adidas Originals|blanco clásico|159000|Adidas||
ADI-05|Adidas running|azul marino/rosa|130000|Adidas||
VAN-01|Vans estilo Knu Skool|blanco total, suela gum|179999|Vans||
VAN-02|Vans gamuza|negro/blanco, suela gum|165000|Vans||
VAN-03|Vans estilo Knu Skool|negra/blanca, suela gum|179999|Vans||
NB-02|New Balance 2002R|negro/dorado|174999|New Balance||
NB-03|New Balance running|negro|139999|New Balance||
PUM-01|Puma Urban Classic|blanco/negro/gris|159000|Puma||
PUM-02|Puma plataforma "Urban Essentials"|crema/negro/blanco|150000|Puma||
PUM-03|Puma x BMW|negro/blanco|150000|Puma||
NIK-03|Nike Air Force 1 con dije|blanco/dorado|165000|Nike||
NIK-04|Nike Air Max 1 "Just Do It"|negro/blanco/naranja|165000|Nike||
NIK-05|Nike Air Zoom running|negro/rosa/verde agua|130000|Nike||
NIK-06|Nike ZoomX Invincible Run 3|negro|130000|Nike||
NIK-07|Nike ZoomX Invincible Run Flyknit 3|blanco/dorado/amarillo|130000|Nike||
NIK-08|Nike ZoomX running|blanco/rosa/lila|130000|Nike||
CAT-01|Botas CAT|grafito/rosa "1102"|270000|CAT||34 al 39
CAT-02|Botas CAT|marrón/negro, suela tractor|270000|CAT||38 al 43
CAT-03|Botas CAT|negro total, suela tractor|270000|CAT||38 al 43
CAT-04|Botas CAT|negro/rosa|270000|CAT||34 al 39
OTR-01|Vans blanca|blanco total, suela goma|165000|Vans||`;

const FALLBACK_TALLE = 'Consultar talles disponibles';
const FAMILIES = ['Nike SB Dunk Low', 'Nike Dunk Low', 'Adidas Samba', 'Botas CAT'];
const PHONE = '5491125076680';

// Parsear productos
const PRODUCTS = RAW.split('\n')
  .filter(l => l.trim())
  .map(l => {
    const [sku, name, color, price, cat, premium, talle] = l.split('|');
    const group = FAMILIES.find(f => name.indexOf(f) === 0) || name;
    return {
      sku, name, color,
      price: +price, cat, premium: premium === '1',
      group, variantName: name.slice(group.length).trim(),
      talle: talle && talle.trim() ? talle.trim() : FALLBACK_TALLE,
      img: 'img/' + sku.toLowerCase() + '.jpg'
    };
  });

// Utilidades
const fmt = n => '$' + n.toLocaleString('es-AR');
const wa = msg => 'https://wa.me/' + PHONE + '?text=' + encodeURIComponent(msg);

// Estado global
let state = {
  q: '',
  cat: 'Todos',
  cart: [],
  cartOpen: false,
  tab: 'catalogo',
  qty: {},
  sel: {},
  zoom: null
};

// Inicializar
function init() {
  loadCartFromStorage();
  loadCartFromHash();
  setupEventListeners();
  render();
}

function loadCartFromStorage() {
  try {
    const saved = JSON.parse(localStorage.getItem('tz-cart') || '[]');
    if (Array.isArray(saved) && saved.length) {
      state.cart = saved;
    }
  } catch (e) {}
}

function loadCartFromHash() {
  try {
    const m = /[#&]c=([^&]+)/.exec(location.hash);
    if (m) {
      const lines = decodeURIComponent(m[1])
        .split(',')
        .map(s => s.split(':'))
        .map(([sku, q]) => {
          const p = PRODUCTS.find(x => x.sku === sku);
          return p ? {
            sku: p.sku,
            name: p.name,
            color: p.color,
            price: p.price,
            img: p.img,
            qty: Math.max(1, +q || 1)
          } : null;
        })
        .filter(Boolean);
      if (lines.length) {
        state.cart = lines;
        state.cartOpen = true;
      }
    }
  } catch (e) {}
}

function setupEventListeners() {
  // Search
  document.getElementById('search-input')?.addEventListener('change', e => {
    state.q = e.target.value;
    render();
  });

  // Escape key
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      if (state.zoom) {
        state.zoom = null;
      } else if (state.cartOpen) {
        state.cartOpen = false;
      }
      render();
    }
  });

  // Guardar carrito
  const obs = new MutationObserver(() => {
    try {
      localStorage.setItem('tz-cart', JSON.stringify(state.cart));
    } catch (e) {}
  });
  obs.observe(document.body, { subtree: true, childList: true });
}

// Acciones
function goTab(tab) {
  state.tab = tab;
  window.scrollTo(0, 0);
  render();
}

function setQty(sku, delta) {
  const q = Math.max(1, (state.qty[sku] || 1) + delta);
  state.qty[sku] = q;
  render();
}

function addToCart(product) {
  const qty = state.qty[product.sku] || 1;
  const existingIdx = state.cart.findIndex(l => l.sku === product.sku);
  if (existingIdx >= 0) {
    state.cart[existingIdx].qty += qty;
  } else {
    state.cart.push({
      sku: product.sku,
      name: product.name,
      color: product.color,
      price: product.price,
      img: product.img,
      qty
    });
  }
  state.cartOpen = true;
  state.qty[product.sku] = 1;
  render();
}

function bumpCartQty(sku, delta) {
  const idx = state.cart.findIndex(l => l.sku === sku);
  if (idx >= 0) {
    state.cart[idx].qty += delta;
    if (state.cart[idx].qty <= 0) {
      state.cart.splice(idx, 1);
    }
  }
  render();
}

function removeFromCart(sku) {
  state.cart = state.cart.filter(l => l.sku !== sku);
  render();
}

function clearCart() {
  state.cart = [];
  render();
}

function openZoom(sku) {
  state.zoom = sku;
  render();
}

function closeZoom() {
  state.zoom = null;
  render();
}

function openCart() {
  state.cartOpen = true;
  render();
}

function closeCart() {
  state.cartOpen = false;
  render();
}

function backToCatalog() {
  state.cartOpen = false;
  goTab('catalogo');
}

function setCategory(cat) {
  state.cat = cat;
  render();
}

// Renderizar
function render() {
  const term = state.q.trim().toLowerCase();
  const cats = ['Todos', ...Array.from(new Set(PRODUCTS.map(p => p.cat)))];
  const filtered = PRODUCTS.filter(p =>
    (state.cat === 'Todos' || p.cat === state.cat) &&
    (!term || (p.name + ' ' + p.color + ' ' + p.sku + ' ' + p.cat).toLowerCase().includes(term))
  );

  const total = state.cart.reduce((a, l) => a + l.price * l.qty, 0);
  const count = state.cart.reduce((a, l) => a + l.qty, 0);
  const zoomed = state.zoom ? PRODUCTS.find(p => p.sku === state.zoom) : null;

  // Mensajes WhatsApp
  const cartLink = state.cart.length && location.protocol.indexOf('http') === 0
    ? location.origin + location.pathname + '#c=' + encodeURIComponent(state.cart.map(l => l.sku + ':' + l.qty).join(','))
    : '';

  const cartMsg = state.cart.length
    ? 'Hola! Quiero hacer este pedido desde la web de TZ Import:\n\n' +
      state.cart.map(l => '• ' + l.qty + 'x ' + l.name + '\n   Color: ' + l.color + ' — SKU ' + l.sku + ' — ' + fmt(l.price * l.qty)).join('\n') +
      '\n\nTotal estimado: ' + fmt(total) + ' (sin envío)\n\n¿Me confirmás talles disponibles y el envío?' +
      '\n\nSé que son 100% originales y que a los pocos días de recibirlo me escriben para saber cómo me quedó el par.' +
      (cartLink ? '\n\nMi carrito guardado: ' + cartLink : '')
    : 'Hola! Quiero hacer un pedido de zapatillas. ¿Me pasás stock y talles?';

  // Actualizar elementos del DOM
  updateSearch(state.q);
  updateFilters(cats, state.cat);
  updateProducts(filtered);
  updateCart(state.cart, cartMsg, total, count);
  updateZoom(zoomed);
  updateCartUI(state.cartOpen);
  updateTabs();
}

function updateSearch(q) {
  const input = document.getElementById('search-input');
  if (input) input.value = q;
}

function updateFilters(cats, selected) {
  const container = document.getElementById('filters-container');
  if (!container) return;
  container.innerHTML = cats.map(c => `
    <button class="filter-btn ${c === selected ? 'active' : ''}" onclick="setCategory('${c}')">
      ${c}
    </button>
  `).join('');
}

function updateProducts(filtered) {
  const container = document.getElementById('products-container');
  if (!container) return;

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <h3>Sin resultados</h3>
        <p>Probá con otra marca o escribinos y te buscamos el modelo.</p>
      </div>
    `;
    return;
  }

  const byCat = new Map();
  for (const p of filtered) {
    if (!byCat.has(p.cat)) byCat.set(p.cat, new Map());
    const m = byCat.get(p.cat);
    if (!m.has(p.group)) m.set(p.group, []);
    m.get(p.group).push(p);
  }

  container.innerHTML = [...byCat].map(([cat, models]) => `
    <div class="category-section">
      <div class="category-header">
        <h3>${cat}</h3>
        <span class="category-count">${models.size} modelo(s)</span>
      </div>
      <div class="products-grid">
        ${[...models].map(([name, list]) => {
          const key = cat + '|' + name;
          const cur = list.find(p => p.sku === state.sel[key]) || list[0];
          return `
            <article class="product-card">
              <div class="product-image">
                <button class="product-image-btn" onclick="openZoom('${cur.sku}')"></button>
                <img src="${cur.img}" alt="${cur.name} ${cur.color}" loading="lazy">
                <span class="product-zoom-icon">
                  <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="#f5f5f3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"></circle><path d="M11 8v6M8 11h6M20 20l-4.3-4.3"></path></svg>
                </span>
                <span class="product-category-label">${cur.cat}</span>
              </div>
              <div class="product-info">
                <h3 class="product-name">${name}</h3>
                <p class="product-color">${cur.variantName ? cur.variantName + ' · ' + cur.color : 'Color: ' + cur.color}</p>
                ${list.length > 1 ? `
                  <div class="product-variants">
                    ${list.map(v => `
                      <button class="variant-btn ${v.sku === cur.sku ? 'active' : ''}" onclick="selectVariant('${key}', '${v.sku}')" title="${v.variantName ? v.variantName + ' · ' + v.color : v.color}" style="opacity: ${v.sku === cur.sku ? '1' : '.55'}">
                        <img src="${v.img}" alt="${v.variantName ? v.variantName + ' · ' + v.color : v.color}" loading="lazy">
                      </button>
                    `).join('')}
                  </div>
                ` : ''}
                ${cur.talle !== FALLBACK_TALLE ? `<p class="product-size">${cur.talle}</p>` : `
                  <a href="${wa('Hola! Quiero consultar talles disponibles del modelo ' + cur.name + ' (color ' + cur.color + ', SKU ' + cur.sku + '). ¿Qué números tenés?')}" target="_blank" class="talle-link">Consultá tu talle →</a>
                `}
                <p class="product-authentic">✓ 100% original</p>
                <p class="product-sku">SKU ${cur.sku} · ${list.length > 1 ? list.length + ' versiones disponibles' : '1 color disponible'}</p>
                <div class="product-footer">
                  <span class="product-price">${fmt(cur.price)}</span>
                  <div class="quantity-control">
                    <button class="qty-btn" onclick="setQty('${cur.sku}', -1)">−</button>
                    <span class="qty-display">${state.qty[cur.sku] || 1}</span>
                    <button class="qty-btn" onclick="setQty('${cur.sku}', 1)">+</button>
                  </div>
                </div>
                <button class="add-to-cart-btn" onclick="addToCart(PRODUCTS.find(p => p.sku === '${cur.sku}'))">Agregar al carrito</button>
              </div>
            </article>
          `;
        }).join('')}
      </div>
    </div>
  `).join('');
}

function updateCart(cart, cartMsg, total, count) {
  const cartCountEl = document.getElementById('cart-count');
  if (cartCountEl) cartCountEl.textContent = count;

  const cartItemsEl = document.getElementById('cart-items');
  if (cartItemsEl) {
    cartItemsEl.innerHTML = cart.length === 0
      ? `
        <div class="empty-cart">
          <h3>Carrito vacío</h3>
          <p>Sumá pares desde el catálogo para armar tu pedido.</p>
          <button class="cta-btn" onclick="backToCatalog()">Ver catálogo</button>
        </div>
      `
      : cart.map(l => `
        <div class="cart-item">
          <img src="${l.img}" alt="${l.name}" class="cart-item-image" loading="lazy">
          <div class="cart-item-details">
            <p class="cart-item-name">${l.name}</p>
            <p class="cart-item-color">Color: ${l.color}</p>
            <p class="cart-item-sku">SKU ${l.sku} · ${fmt(l.price)}</p>
          </div>
          <div class="cart-item-actions">
            <div class="cart-item-qty">
              <button onclick="bumpCartQty('${l.sku}', -1)">−</button>
              <span>${l.qty}</span>
              <button onclick="bumpCartQty('${l.sku}', 1)">+</button>
            </div>
            <button class="cart-item-remove" onclick="removeFromCart('${l.sku}')">Quitar</button>
          </div>
        </div>
      `).join('');
  }

  const totalEl = document.getElementById('cart-total');
  if (totalEl) totalEl.textContent = fmt(total);

  const cartBtn = document.getElementById('send-cart-btn');
  if (cartBtn) cartBtn.href = wa(cartMsg);
}

function updateZoom(zoomed) {
  const zoomEl = document.getElementById('zoom-modal');
  if (!zoomEl) return;

  if (zoomed) {
    zoomEl.innerHTML = `
      <img src="${zoomed.img}" alt="${zoomed.name} ${zoomed.color}" class="zoom-image">
      <div class="zoom-info">
        <p class="zoom-name">${zoomed.name}</p>
        <p class="zoom-color">Color: ${zoomed.color}</p>
        <p class="zoom-sku">SKU ${zoomed.sku} · ${fmt(zoomed.price)}</p>
      </div>
      <button class="zoom-close" onclick="closeZoom()">✕</button>
    `;
    zoomEl.style.display = 'flex';
  } else {
    zoomEl.style.display = 'none';
  }
}

function updateCartUI(open) {
  const overlay = document.getElementById('cart-overlay');
  const drawer = document.getElementById('cart-drawer');
  if (overlay) overlay.style.display = open ? 'block' : 'none';
  if (drawer) drawer.style.display = open ? 'flex' : 'none';
}

function updateTabs() {
  document.querySelectorAll('[data-section]').forEach(el => {
    el.style.display = el.getAttribute('data-section') === state.tab ? 'block' : 'none';
  });
}

function selectVariant(key, sku) {
  state.sel[key] = sku;
  render();
}

// Iniciar app
document.addEventListener('DOMContentLoaded', init);