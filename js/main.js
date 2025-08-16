// ============================
// Grife Moda — main.js (sem parse.html)
// ============================

// ============================
// Config do negócio (personalize fácil)
// ============================
const BUSINESS = {
  wppNumber: "5524998236007",
  baseUrl: "https://grife-moda-teste.vercel.app",
};


// Substitua TODO o bloco do Array.from(...) por isto:
const products = [
  {
    sku: "GM-001",
    name: "Bermuda Sarja",
    price: 74.99,                 // número (sem "R$")
    sizes: ["38, 40, 42, 44, 46, 48"],
    color: "-",
    image: encodeURI("./assets/fotos/bermuda-sarja.webp"),
    highlight: true,
    // quando tiver versões otimizadas: imageBase: "./assets/products/camiseta-logo-preta"
  },
  {
    sku: "GM-002",
    name: "Bermuda Cargo",
    price: 89.99,
    sizes: ["M, G"],
    color: "-",
    image: encodeURI("./assets/fotos/bermuda-cargo.webp"),
    highlight: true
  },
  {
    sku: "GM-003",
    name: "Bermuda Dri Fit",
    price: 44.99, // preço da unidade, conferir depois uma funcionalidade para colocar uma condição especial
    //03 bermudas por 99,99
    sizes: ["-"],
    color: "-",
    image: encodeURI("./assets/fotos/bermuda-dri-fit.webp"),
    highlight: false
  },
  {
    sku: "GM-004",
    name: "Camisas 30.1 penteada",
    price: 44.99, //03 por 109,99
    sizes: ["-"],
    color: "-",
    image: encodeURI("./assets/fotos/camisas-30.1.webp"),
    highlight: true
  },
  {
    sku: "GM-005",
    name: "Polos Nike",
    price: 69.99,
    sizes: ["M","G","GG"],
    color: "-",
    image: encodeURI("./assets/fotos/polos-nike.webp"),
    highlight: false
  },
  {
    sku: "GM-006",
    name: "Polos da Lacoste Picket",
    price: 69.99,
    sizes: ["-"],
    color: "-",
    image: encodeURI("./assets/fotos/polos-lacoste-picket.webp"),
    highlight: false
  },
    {
    sku: "GM-007",
    name: "Camisas Plus Size",
    price: 69.99,
    sizes: ["G1", "G2", "G3"],
    color: "-",
    image: encodeURI("./assets/fotos/camisas-plus-size.webp"),
    highlight: false
  },
    {
    sku: "GM-008",
    name: "Camisas Oversized",
    price: 99.99,
    sizes: ["-"],
    color: "-",
    image: encodeURI("./assets/fotos/camisas-oversized.webp"),
    highlight: false
  },
    {
    sku: "GM-009",
    name: "Peruana Legítima",
    price: 99.99,
    sizes: ["-"],
    color: "-",
    image: encodeURI("./assets/fotos/peruana-legitima.webp"),
    highlight: false
  },
    {
    sku: "GM-010",
    name: "Peruana Tradicional",
    price: 99.99,
    sizes: ["-"],
    color: "-",
    image: encodeURI("./assets/fotos/peruana-tradicional.webp"),
    highlight: false
  },
    {
    sku: "GM-011",
    name: "Camisas Polo Peruana",
    price: 99.99,
    sizes: ["-"],
    color: "-",
    image: encodeURI("./assets/fotos/camisas-polo-peruana.webp"),
    highlight: false
  },
    {
    sku: "GM-012",
    name: "Camisas Polo Sport",
    price: 99.99,
    sizes: ["-"],
    color: "-",
    image: encodeURI("./assets/fotos/camisas-polo-sport.webp"),
    highlight: false
  },
    {
    sku: "GM-013",
    name: "Camisas Sport da Lacoste",
    price: 99.99,
    sizes: ["-"],
    color: "-",
    image: encodeURI("./assets/fotos/camisas-sport-lacoste.webp"),
    highlight: false
  },
    {
    sku: "GM-014",
    name: "Calça Original Levva Jogador",
    price: 149.99,
    sizes: ["-"],
    color: "-",
    image: encodeURI("./assets/fotos/calça-original-levva-jogador.webp"),
    highlight: false
  },
    {
    sku: "GM-015",
    name: "Camisas de Time",
    price: 69.99,
    sizes: ["-"],
    color: "-",
    image: encodeURI("./assets/fotos/camisas-time.webp"),
    highlight: false
  },
    {
    sku: "GM-016",
    name: "Bermuda Jeans",
    price: 69.99,
    sizes: ["-"],
    color: "-",
    image: encodeURI("./assets/fotos/bermuda-jeans.webp"),
    highlight: false
  },
    {
    sku: "GM-017",
    name: "Tenis diversos",
    price: 69.99,
    sizes: ["-"],
    color: "-",
    image: encodeURI("./assets/fotos/tenis-diversos.webp"),
    highlight: false
  },
    {
    sku: "GM-018",
    name: "5 Cuecas Calvin Klein",
    price: 49.99,
    sizes: ["Tradicional"], //infantil e adulto
    //5 cuecas tamanho plus size 69,99
    color: "-",
    image: encodeURI("./assets/fotos/polos-lacoste-picket.webp"),
    highlight: false
  }
];


// ============================
// Utilidades
// ============================
const fmtBRL = (n) =>
  n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

const fmtPriceSafe = (val) =>
  typeof val === "number" && Number.isFinite(val) ? fmtBRL(val) : "Sob consulta";

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
  const precoTxt =
    typeof preco === "number" && Number.isFinite(preco) ? fmtBRL(preco) : "-";
  const msg = `Oi Emerson! Quero o produto [${nome}] (${cor} / ${tamanho}). Valor: ${precoTxt}. Link: ${link}`;
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
      preco: null,
      url: BUSINESS.baseUrl,
      campaign: "atendimento",
      content: id,
    };
    logEvent("cta_whatsapp_generic", { placement: id });
    openWhats(payload);
  });
});

// ============================
// Helpers de imagem (suporta base 600/1200 quando existir)
// ============================
function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, (s) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[s]));
}

function cardImgHTML(p) {
  const alt = escapeHtml(p.name || "Produto");
  if (p.imageBase) {
    const src = `${p.imageBase}-1200.webp`;
    const srcset = `${p.imageBase}-600.webp 600w, ${p.imageBase}-1200.webp 1200w`;
    const sizes = `(max-width: 700px) 50vw, 25vw`;
    return `<img src="${src}" srcset="${srcset}" sizes="${sizes}" alt="${alt}" loading="lazy" decoding="async" width="1200" height="1200">`;
  }
  const src = p.image || "";
  return `<img src="${src}" alt="${alt}" loading="lazy" decoding="async" width="1200" height="1200">`;
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
        <div class="price">${fmtPriceSafe(p.price)}</div>
        <div class="muted">Tamanhos: ${Array.isArray(p.sizes) && p.sizes.length ? p.sizes.join(", ") : "-"}</div>
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
        content: `card_${p.sku}`,
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
(function tourSetup() {
  const MODAL_ID = "tour-modal";
  const KEY = "gm_seen_tour_v1"; // troque se mudar o conteúdo do tour
  const modal = document.getElementById(MODAL_ID);
  const btnFab = document.getElementById("help-fab");
  if (!modal || !btnFab) return; // HTML do tour não está na página

  const btnClose = document.getElementById("tour-close");
  const btnPrev = document.getElementById("tour-prev");
  const btnNext = document.getElementById("tour-next");
  const btnDone = document.getElementById("tour-done");
  const chkAgain = document.getElementById("tour-show-again");
  const steps = Array.from(modal.querySelectorAll(".tour-step"));

  let idx = 0;

  function setOpen(open) {
    modal.hidden = !open;
    document.body.style.overflow = open ? "hidden" : "";
  }

  function render() {
    steps.forEach((el, i) => (el.hidden = i !== idx));
    const last = idx === steps.length - 1;
    btnPrev.disabled = idx === 0;
    btnNext.hidden = last;
    btnDone.hidden = !last;
  }

  function rememberSeen() {
    if (chkAgain && chkAgain.checked) {
      localStorage.removeItem(KEY);
    } else {
      localStorage.setItem(KEY, "1");
    }
  }

  function openTour(source = "auto") {
    idx = 0;
    render();
    setOpen(true);
    document.getElementById("tour-title")?.focus?.();
    logEvent?.("tour_open", { source });
  }

  function closeTour(action = "close") {
    setOpen(false);
    rememberSeen();
    logEvent?.("tour_close", { action, show_again: !!(chkAgain && chkAgain.checked) });
  }

  btnPrev?.addEventListener("click", () => {
    if (idx > 0) {
      idx--;
      render();
    }
  });
  btnNext?.addEventListener("click", () => {
    if (idx < steps.length - 1) {
      idx++;
      render();
    } else {
      closeTour("next_end");
    }
  });
  btnDone?.addEventListener("click", () => closeTour("done"));
  btnClose?.addEventListener("click", () => closeTour("x"));

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modal.hidden) closeTour("esc");
  });
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeTour("backdrop");
  });

  btnFab.addEventListener("click", () => openTour("fab"));

  const firstVisit = !localStorage.getItem(KEY);
  if (firstVisit) setTimeout(() => openTour("auto"), 800);
})();
