// ============================
// Config do negócio (personalize fácil)
// ============================
const BUSINESS = {
  wppNumber: "5524998236007",
  baseUrl: "https://grife-moda-teste.vercel.app",
};

// ============================
// Produtos (MVP)
// Dica: quando otimizar as fotos, adicione `imageBase` SEM extensão e SEM acento
// ex.: imageBase: "./assets/products/camiseta-preta"
// e gere ...-600.webp e ...-1200.webp. Até lá, mantenha `image` como está.
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
    // imageBase: "./assets/products/camiseta-preta" // (quando tiver as versões 600/1200)
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
    image: "./assets/fotos/calça-jeans-slim-azul.webp", // ⚠️ acento pode dar ruim em produção; ideal renomear p/ "calca-jeans-slim-azul.webp"
    url: "/produto/calca-jeans-slim-azul"
  },
  {
    sku: "GM-JG-001",
    name: "Calça Jogger Moletom Cinza",
    price: 119.90,
    sizes: ["P", "M", "G"],
    color: "Cinza",
    image: "./assets/fotos/calça-jogger-moletom.webp", // ideal renomear p/ "calca-jogger-moletom.webp"
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
    image: "./assets/fotos/moletom-hoddie-verde.webp", // typo no nome? (hoodie)
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

function withUtm(url, { campaign = "produto", content } = {}) {
  const qs = new URLSearchParams({
    utm_source: "site",
    utm_medium: "whatsapp",
    utm_campaign: campaign,
  });
  if (content) qs.set("utm_content", content);
  return url + (url.includes("?") ? "&" : "?") + qs.toString();
}

function whatsappHref({ nome, cor, tamanho, preco, url, campaign, content }) {
  const link = withUtm(url, { campaign, content });
  const msg = `Oi Emerson! Quero o produto [${nome}] (${cor} / ${tamanho}). Valor: ${fmtBRL(preco)}. Link: ${link}`;
  return `https://wa.me/${BUSINESS.wppNumber}?text=${encodeURIComponent(msg)}`;
}

function openWhats(payload) {
  window.open(whatsappHref(payload), "_blank", "noopener");
}

function logEvent(name, data) {
  console.log(name, data); // plugue GA4 aqui depois
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
// CTA de WhatsApp genéricos (top/hero/rodapé) — 1 listener por ID
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
      url: BUSINESS.baseUrl,
      campaign: "atendimento",
      content: id
    };
    logEvent("cta_whatsapp_generic", { placement: id });
    openWhats(payload);
  });
});

// ============================
// Helpers de imagem (suporta base 600/1200 quando existir)
// ============================
function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, s => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[s]));
}
function cardImgHTML(p) {
  const alt = escapeHtml(p.name);
  // Se tiver imageBase (sem extensão), usa srcset; senão cai no src simples
  if (p.imageBase) {
    const src = `${p.imageBase}-1200.webp`;
    const srcset = `${p.imageBase}-600.webp 600w, ${p.imageBase}-1200.webp 1200w`;
    const sizes = `(max-width: 700px) 50vw, 25vw`;
    return `<img src="${src}" srcset="${srcset}" sizes="${sizes}" alt="${alt}" loading="lazy" decoding="async" width="1200" height="1200">`;
  }
  return `<img src="${p.image}" alt="${alt}" loading="lazy" decoding="async" width="1200" height="1200">`;
}

// ============================
// Render de produtos (Home: 8 itens)
// ============================
(function renderProductsHome() {
  const grid = document.getElementById("product-grid");
  if (!grid) return;

  const list = products.slice(0, 8);
  const frag = document.createDocumentFragment();

  list.forEach((p) => {
    const card = document.createElement("article");
    card.className = "card";
    card.innerHTML = `
      ${cardImgHTML(p)}
      <div class="card-body">
        ${p.highlight ? '<span class="badge">Destaque</span>' : ""}
        <h3 class="title">${escapeHtml(p.name)}</h3>
        <div class="price">${fmtBRL(p.price)}</div>
        <div class="muted">Tamanhos: ${p.sizes.join(", ")}</div>
        <div class="cta-row" style="margin-top:10px">
          <a class="btn" href="./produto.html?sku=${encodeURIComponent(p.sku)}">Detalhes</a>
          <button class="btn btn-accent js-buy" type="button">Comprar no WhatsApp</button>
        </div>
      </div>
    `;

    // Botão comprar (card)
    const btn = card.querySelector(".js-buy");
    btn.addEventListener("click", () => {
      const payload = {
        nome: p.name,
        cor: p.color || "-",
        tamanho: p.sizes?.[0] || "-",
        preco: p.price,
        url: `${BUSINESS.baseUrl}/produto.html?sku=${encodeURIComponent(p.sku)}`,
        campaign: "produto",
        content: `card_${p.sku}`
      };
      logEvent("cta_whatsapp_clicked", { sku: p.sku, price: p.price, placement: "card" });
      openWhats(payload);
    });

    frag.appendChild(card);
  });

  grid.appendChild(frag);
})();

// ============================
// Contador 48h (Oferta de lançamento)
// ============================
(function countdown48h() {
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

// exporta para outras páginas (produto/coleções)
window.PRODUCTS = products;

// ============================
// Mini-tutorial (mostra 1x por dispositivo)
// ============================
(function tourSetup(){
  const MODAL_ID = "tour-modal";
  const KEY = "gm_seen_tour_v1"; // troque se mudar o conteúdo do tour
  const modal   = document.getElementById(MODAL_ID);
  const btnFab  = document.getElementById("help-fab");
  if (!modal || !btnFab) return; // HTML do tour não está na página

  const btnClose = document.getElementById("tour-close");
  const btnPrev  = document.getElementById("tour-prev");
  const btnNext  = document.getElementById("tour-next");
  const btnDone  = document.getElementById("tour-done");
  const chkAgain = document.getElementById("tour-show-again");
  const steps    = Array.from(modal.querySelectorAll(".tour-step"));

  let idx = 0;

  function setOpen(open){
    modal.hidden = !open;
    document.body.style.overflow = open ? "hidden" : "";
  }

  function render(){
    steps.forEach((el, i) => el.hidden = i !== idx);
    const last = idx === steps.length - 1;
    btnPrev.disabled = idx === 0;
    btnNext.hidden = last;
    btnDone.hidden = !last;
  }

  function rememberSeen(){
    // Se marcar "Mostrar novamente", NÃO grava como visto
    if (chkAgain && chkAgain.checked) {
      localStorage.removeItem(KEY);
    } else {
      localStorage.setItem(KEY, "1");
    }
  }

  function openTour(source="auto"){
    idx = 0;
    render();
    setOpen(true);
    document.getElementById("tour-title")?.focus?.();
    logEvent?.("tour_open", { source });
  }

  function closeTour(action="close"){
    setOpen(false);
    rememberSeen();
    logEvent?.("tour_close", { action, show_again: !!(chkAgain && chkAgain.checked) });
  }

  // Navegação
  btnPrev?.addEventListener("click", () => { if (idx > 0) { idx--; render(); } });
  btnNext?.addEventListener("click", () => {
    if (idx < steps.length - 1) { idx++; render(); }
    else { closeTour("next_end"); } // segurança extra
  });
  btnDone?.addEventListener("click", () => closeTour("done"));
  btnClose?.addEventListener("click", () => closeTour("x"));

  // ESC e clique no backdrop
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modal.hidden) closeTour("esc");
  });
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeTour("backdrop");
  });

  // Botão flutuante abre a qualquer momento
  btnFab.addEventListener("click", () => openTour("fab"));

  // Abre automático só na 1ª visita
  const firstVisit = !localStorage.getItem(KEY);
  if (firstVisit) setTimeout(() => openTour("auto"), 800);
})();
