// ============================
// Config do negócio (personalize fácil)
// ============================
const BUSINESS = {
  wppNumber: "5524998236007",
  baseUrl: "https://grife-moda-teste.vercel.app",
};

// ============================
// Produtos (auto a partir das fotos IMAGEM (1..23).webp)
// Dica pró: eventualmente renomeie os arquivos para "imagem-01.webp" (sem espaço),
// mas por ora encodeURI resolve.
// ============================
const TOTAL_FOTOS = 23; // ajuste se adicionar/remover fotos
const DEFAULT_SIZES = ["P", "M", "G"]; // personalize
const DEFAULT_PRICE = null; // defina um número ex: 79.9 quando souber

const products = Array.from({ length: TOTAL_FOTOS }, (_, i) => {
  const n = i + 1;
  const filename = `IMAGEM (${n}).webp`;
  const path = `./assets/fotos/${filename}`;
  return {
    sku: `GM-${String(n).padStart(3, "0")}`,
    name: `Produto ${String(n).padStart(2, "0")}`,
    price: DEFAULT_PRICE, // substitua por números reais por item, se quiser
    sizes: [...DEFAULT_SIZES],
    color: "-",
    image: encodeURI(path), // lida com o espaço em "IMAGEM (n).webp"
    highlight: n <= 8, // destaque nos 8 primeiros (ajuste à vontade)
    // imageBase: "./assets/products/exemplo" // quando tiver versões 600/1200
  };
});

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
