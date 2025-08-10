// ============================
// Config do negócio (personalize fácil)
// ============================
const BUSINESS = {
  wppNumber: "5524998236007",
  baseUrl: "https://grife-moda-teste.vercel.app", // <— troquei
  utm: "?utm_source=site&utm_medium=whatsapp&utm_campaign=produto",
};

// ============================
// Produtos (exemplos • substitua quando tiver fotos reais)
// ============================
const products = [
  {
    sku: "GM-TS-001",
    name: "Camiseta Básica Preta",
    price: 79.90,
    sizes: ["P", "M", "G"],
    color: "Preta",
    image: "./assets/fotos/camiseta-preta-basica.webp",
    url: "/produto/camiseta-basica-preta",
    highlight: true
  },
  {
    sku: "GM-TS-002",
    name: "Camiseta Oversized Off-White",
    price: 89.90,
    sizes: ["M", "G", "GG"],
    color: "Off-White",
    image: "./assets/fotos/camiseta-oversized-off-white.webp",
    url: "/produto/camiseta-oversized-offwhite",
    highlight: true
  },
  {
    sku: "GM-TS-003",
    name: "Camiseta Estonada Azul",
    price: 84.90,
    sizes: ["P", "M", "G", "GG"],
    color: "Azul",
    image: "./assets/fotos/camiseta-estonada-azul.webp",
    url: "/produto/camiseta-estonada-azul"
  },
  {
    sku: "GM-CM-001",
    name: "Camisa Xadrez Vermelha",
    price: 129.90,
    sizes: ["P", "M", "G", "GG"],
    color: "Vermelha",
    image: "./assets/fotos/camisa-xadrez-vermelha.webp",
    url: "/produto/camisa-xadrez-vermelha"
  },
  {
    sku: "GM-JN-001",
    name: "Calça Jeans Slim Azul",
    price: 139.90,
    sizes: ["38", "40", "42", "44"],
    color: "Azul",
    image: "./assets/fotos/calça-jeans-slim-azul.webp",
    url: "/produto/calca-jeans-slim-azul"
  },
  {
    sku: "GM-JG-001",
    name: "Calça Jogger Moletom Cinza",
    price: 119.90,
    sizes: ["P", "M", "G"],
    color: "Cinza",
    image: "./assets/fotos/calça-jogger-moletom.webp",
    url: "/produto/calca-jogger-moletom-cinza"
  },
  {
    sku: "GM-JQ-001",
    name: "Jaqueta Corta-Vento Preta",
    price: 199.90,
    sizes: ["P", "M", "G", "GG"],
    color: "Preta",
    image: "./assets/fotos/jaqueta-corta-vento-preta.webp",
    url: "/produto/jaqueta-corta-vento-preta",
    highlight: true
  },
  {
    sku: "GM-BR-001",
    name: "Bermuda Sarja Caramelo",
    price: 99.90,
    sizes: ["38", "40", "42", "44"],
    color: "Caramelo",
    image: "./assets/fotos/bermuda-sarja-caramelo.webp",
    url: "/produto/bermuda-sarja-caramelo"
  },
  {
    sku: "GM-ML-001",
    name: "Moletom Hoodie Verde",
    price: 149.90,
    sizes: ["P", "M", "G", "GG"],
    color: "Verde",
    image: "./assets/fotos/moletom-hoddie-verde.webp",
    url: "/produto/moletom-hoodie-verde",
    highlight: true
  },
  {
    sku: "GM-AC-002",
    name: "Cinto de Couro Marrom",
    price: 69.90,
    sizes: ["90", "100", "110"],
    color: "Marrom",
    image: "./assets/fotos/cinto-couro-marrom.webp",
    url: "/produto/cinto-couro-marrom"
  }
];


// ============================
// Utilidades
// ============================
const fmtBRL = (n) =>
  n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

function whatsappHref({ nome, cor, tamanho, preco, url }) {
  const msg = `Oi Emerson! Quero o produto [${nome}] (${cor} / ${tamanho}). Valor: ${fmtBRL(preco)}. Link: ${url}${BUSINESS.utm}`;
  return `https://wa.me/${BUSINESS.wppNumber}?text=${encodeURIComponent(msg)}`;
}

function openWhats(payload) {
  const href = whatsappHref(payload);
  window.open(href, "_blank", "noopener");
}

function logEvent(name, data) {
  // plugue no GA4 depois; por hora, console
  console.log(name, data);
}

// ============================
// Navbar mobile
// ============================
(function setupNav() {
  const toggle = document.querySelector(".nav-toggle");
  const menu = document.getElementById("menu");
  if (!toggle || !menu) return;
  toggle.addEventListener("click", () => {
    const open = menu.classList.toggle("show");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  });
})();

// ============================
// CTA de WhatsApp genéricos
// ============================
["cta-wpp-top", "cta-wpp-hero", "cta-wpp-bottom"].forEach((id) => {
  const el = document.getElementById(id);
  if (!el) return;
  el.addEventListener("click", () => {
    const payload = {
      nome: "Atendimento",
      cor: "-",
      tamanho: "-",
      preco: 0,
      url: BUSINESS.baseUrl
    };
    logEvent("cta_whatsapp_generic", payload);
    openWhats(payload);
  });
});

// ============================
// Render de produtos
// ============================
(function renderProducts() {
  const grid = document.getElementById("product-grid");
  if (!grid) return;

  const fragment = document.createDocumentFragment();

  products.forEach((p) => {
    const card = document.createElement("article");
    card.className = "card";

    card.innerHTML = `
      <img src="${p.image}" alt="${p.name}" loading="lazy" />
      <div class="card-body">
        ${p.highlight ? '<span class="badge">Retire hoje</span>' : ""}
        <h3 class="title">${p.name}</h3>
        <div class="price">${fmtBRL(p.price)}</div>
        <div class="muted">Tamanhos: ${p.sizes.join(", ")}</div>
        <div class="cta-row" style="margin-top:10px">
          <a class="btn" href="./produto.html?sku=${p.sku}">Detalhes</a>
          <button class="btn btn-accent js-buy" type="button">Comprar no WhatsApp</button>
        </div>
      </div>
    `;

    // bind
    card.querySelector(".js-buy").addEventListener("click", () => {
      const payload = {
        nome: p.name,
        cor: p.color || "-",
        tamanho: p.sizes?.[0] || "-",
        preco: p.price,
        url: BUSINESS.baseUrl + p.url
      };
      logEvent("cta_whatsapp_clicked", { sku: p.sku, ...payload });
      openWhats(payload);
    });

    fragment.appendChild(card);
  });

  grid.appendChild(fragment);
})();

// ============================
// Contador 48h (Oferta de lançamento)
// ============================
(function countdown48h() {
  // 48h a partir do primeiro carregamento
  const now = Date.now();
  const end = now + 48 * 60 * 60 * 1000;

  const elH = document.getElementById("cd-h");
  const elM = document.getElementById("cd-m");
  const elS = document.getElementById("cd-s");
  if (!elH || !elM || !elS) return;

  function tick() {
    const diff = Math.max(0, end - Date.now());
    const totalSec = Math.floor(diff / 1000);
    const h = Math.floor(totalSec / 3600);
    const m = Math.floor((totalSec % 3600) / 60);
    const s = totalSec % 60;
    elH.textContent = String(h).padStart(2, "0");
    elM.textContent = String(m).padStart(2, "0");
    elS.textContent = String(s).padStart(2, "0");
    if (diff > 0) requestAnimationFrame(tick);
  }
  tick();
})();

window.PRODUCTS = products;