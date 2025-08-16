// ============================
// Grife Moda — main.js (mensagens WhatsApp por botão)
// ============================

// ============================
// Config do negócio (personalize fácil)
// ============================
const BUSINESS = {
  wppNumber: "5524998236007", // WhatsApp do Emerson
  baseUrl: "https://grife-moda-teste.vercel.app",
};

// ============================
// Produtos (lista manual)
// ============================
// Obs: para exibir promoções especiais na mensagem, adicione `promo: "3 por 99,99"` no produto.
const products = [
  { sku:"GM-001", name:"Bermuda Sarja", price:74.99, sizes:["38, 40, 42, 44, 46, 48"], color:"-", image:encodeURI("./assets/fotos/bermuda-sarja.webp"), highlight:true },
  { sku:"GM-002", name:"Bermuda Cargo", price:89.99, sizes:["M, G"], color:"-", image:encodeURI("./assets/fotos/bermuda-cargo.webp"), highlight:true },
  { sku:"GM-003", name:"Bermuda Dri Fit", price:44.99, /* promo:"3 por 99,99", */ sizes:["-"], color:"-", image:encodeURI("./assets/fotos/bermuda-dri-fit.webp"), highlight:false },
  { sku:"GM-004", name:"Camisas 30.1 penteada", price:44.99, /* promo:"3 por 109,99", */ sizes:["-"], color:"-", image:encodeURI("./assets/fotos/camisas-30.1.webp"), highlight:true },
  { sku:"GM-005", name:"Polos Nike", price:69.99, sizes:["M","G","GG"], color:"-", image:encodeURI("./assets/fotos/polos-nike.webp"), highlight:false },
  { sku:"GM-006", name:"Polos da Lacoste Picket", price:69.99, sizes:["-"], color:"-", image:encodeURI("./assets/fotos/polos-lacoste-picket.webp"), highlight:false },
  { sku:"GM-007", name:"Camisas Plus Size", price:69.99, sizes:["G1","G2","G3"], color:"-", image:encodeURI("./assets/fotos/camisas-plus-size.webp"), highlight:false },
  { sku:"GM-008", name:"Camisas Oversized", price:99.99, sizes:["-"], color:"-", image:encodeURI("./assets/fotos/camisas-oversized.webp"), highlight:false },
  { sku:"GM-009", name:"Peruana Legítima", price:99.99, sizes:["-"], color:"-", image:encodeURI("./assets/fotos/peruana-legitima.webp"), highlight:false },
  { sku:"GM-010", name:"Peruana Tradicional", price:99.99, sizes:["-"], color:"-", image:encodeURI("./assets/fotos/peruana-tradicional.webp"), highlight:false },
  { sku:"GM-011", name:"Camisas Polo Peruana", price:99.99, sizes:["-"], color:"-", image:encodeURI("./assets/fotos/camisas-polo-peruana.webp"), highlight:false },
  { sku:"GM-012", name:"Camisas Polo Sport", price:99.99, sizes:["-"], color:"-", image:encodeURI("./assets/fotos/camisas-polo-sport.webp"), highlight:false },
  { sku:"GM-013", name:"Camisas Sport da Lacoste", price:99.99, sizes:["-"], color:"-", image:encodeURI("./assets/fotos/camisas-sport-lacoste.webp"), highlight:false },
  { sku:"GM-014", name:"Calça Original Levva Jogador", price:149.99, sizes:["-"], color:"-", image:encodeURI("./assets/fotos/calça-original-levva-jogador.webp"), highlight:false },
  { sku:"GM-015", name:"Camisas de Time", price:69.99, sizes:["-"], color:"-", image:encodeURI("./assets/fotos/camisas-time.webp"), highlight:false },
  { sku:"GM-016", name:"Bermuda Jeans", price:69.99, sizes:["-"], color:"-", image:encodeURI("./assets/fotos/bermuda-jeans.webp"), highlight:false },
  { sku:"GM-017", name:"Tenis Linha Premium", price:69.99, sizes:["-"], color:"-", image:encodeURI("./assets/fotos/tenis-diversos.webp"), highlight:false },
  { sku:"GM-018", name:"5 Cuecas Calvin Klein", price:49.99, sizes:["Tradicional"], /* promo:"Plus size (5 und) por 69,99", */ color:"-", image:encodeURI("./assets/fotos/polos-lacoste-picket.webp"), highlight:false },
];

// ============================
// Utilidades
// ============================
const fmtBRL = (n) => n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
const fmtPriceSafe = (val) => (typeof val === "number" && Number.isFinite(val) ? fmtBRL(val) : "Sob consulta");

// Monta UTM
function withUtm(url, { campaign = "produto", content } = {}) {
  const qs = new URLSearchParams({
    utm_source: "site",
    utm_medium: "whatsapp",
    utm_campaign: campaign,
  });
  if (content) qs.set("utm_content", content);
  return url + (url.includes("?") ? "&" : "?") + qs.toString();
}

// ============================
// Templates de mensagem por intenção (botão origem)
// ============================
// intent possíveis: 'product_card', 'generic_top', 'generic_hero', 'generic_footer', 'generic_default'
function buildWhatsMessage({ intent = "generic_default", nome, cor, tamanho, preco, url, sku, promo }) {
  const precoTxt = (typeof preco === "number" && Number.isFinite(preco)) ? fmtBRL(preco) : "Sob consulta";
  const promoTxt = promo ? `\n🎁 *Promoção:* ${promo}` : "";

  // Mensagens genéricas (sem produto)
  const generic = {
    generic_top: [
      "Olá, Emerson! Vim pelo topo do site e preciso de atendimento 👋",
      "",
      "Quero tirar uma dúvida rápida sobre os produtos e tamanhos.",
      "",
      `🔗 *Site:* ${url}`,
    ],
    generic_hero: [
      "Oi, Emerson! Acabei de ver as novidades na vitrine 🛍️",
      "",
      "Pode me indicar os destaques e melhores promoções?",
      "",
      `🔗 *Vitrine:* ${url}`,
    ],
    generic_footer: [
      "Olá, Emerson! Quero finalizar uma compra ✅",
      "",
      "Pode me ajudar com formas de pagamento e prazo de entrega?",
      "",
      `🔗 *Página:* ${url}`,
    ],
    generic_default: [
      "Olá, Emerson! Preciso de atendimento da Grife Moda 🙂",
      "",
      "Tenho dúvidas sobre produtos e tamanhos.",
      "",
      `🔗 *Site:* ${url}`,
    ],
  };

  // Se não é intent genérica, monta mensagem de produto
  if (intent === "product_card") {
    const linhas = [
      "Olá, Emerson! Gostei deste produto da *Grife Moda* 👇",
      "",
      `👕 *${nome}*`,
      sku ? `🆔 SKU: ${sku}` : null,
      `🎨 Cor: ${cor}`,
      `📏 Tamanho: ${tamanho}`,
      `💰 Valor: ${precoTxt}${promoTxt}`,
      "",
      `🔗 *Detalhes:* ${url}`,
      "",
      "Pode confirmar a disponibilidade, por favor? 🙏",
    ].filter(Boolean);
    return linhas.join("\n");
  }

  // Intent genérica
  const linhas = generic[intent] || generic.generic_default;
  return linhas.join("\n");
}

// Href pronto para abrir o WhatsApp
function whatsappHref({ nome, cor, tamanho, preco, url, campaign, content, sku, promo, intent }) {
  const link = withUtm(url, { campaign, content });
  const msg = buildWhatsMessage({ intent, nome, cor, tamanho, preco, url: link, sku, promo });
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
// CTA de WhatsApp genéricos — mensagem muda conforme o botão
// ============================
// Mapeia id do botão -> intent + content (utm_content)
[
  { id: "cta-wpp-top",    intent: "generic_top",    content: "cta_wpp_top" },
  { id: "cta-wpp-hero",   intent: "generic_hero",   content: "cta_wpp_hero" },
  { id: "cta-wpp-bottom", intent: "generic_footer", content: "cta_wpp_bottom" },
].forEach(({ id, intent, content }) => {
  const el = document.getElementById(id);
  if (!el) return;
  el.addEventListener("click", () => {
    const payload = {
      intent,                    // ← chave para template certo
      nome: "Atendimento",
      cor: "-",
      tamanho: "-",
      preco: null,
      url: BUSINESS.baseUrl,
      campaign: "atendimento",
      content,                   // UTM de origem do clique
      sku: null,
      promo: null,
    };
    logEvent("cta_whatsapp_generic", { placement: id, intent });
    openWhats(payload);
  });
});

// ============================
// Helpers de imagem (suporta base 600/1200 quando existir)
// ============================
function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, (s) => ({ "&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#039;" }[s]));
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

    // Botão comprar (card) — mensagem de produto
    const btn = card.querySelector(".js-buy");
    btn.addEventListener("click", () => {
      const payload = {
        intent: "product_card", // ← aqui escolhe o template de produto
        nome: p.name,
        cor: p.color || "-",
        tamanho: p.sizes?.[0] || "-",
        preco: p.price,
        url: `${BUSINESS.baseUrl}/produto.html?sku=${encodeURIComponent(p.sku)}`,
        campaign: "produto",
        content: `card_${p.sku}`, // UTM
        sku: p.sku,
        promo: p.promo || null,
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
// Tutorial leve (beacons) + modal opcional via FAB
// ============================
(function tourSetup() {
  const KEY = "gm_seen_tour_v2"; // nova chave (v2)
  const btnFab = document.getElementById("help-fab"); // botão "?" já existe no index.html
  const modal   = document.getElementById("tour-modal"); // modal continua disponível

  // Beacons: quais alvos e textos
  const targets = [
    { sel: "#cta-wpp-hero",    text: "Fale com a gente no WhatsApp",    place: "bottom" },
    { sel: '.site-nav .menu a[href="./colecoes.html"]', text: "Veja todas as categorias", place: "bottom" },
    { sel: "#product-grid",     text: "Role e veja as novidades",       place: "top" }
  ];

  // cria um beacon (tooltip + pulso) preso a um elemento
  function showBeacon(el, { text, place="top" }){
    const rect = el.getBoundingClientRect();
    const root = document.body;

    const b = document.createElement("div");
    b.className = `beacon ${place}`;
    b.textContent = text;

    const pulse = document.createElement("div");
    pulse.className = "beacon-pulse";

    // posiciona aproximadamente (viewport-based)
    const x = rect.left + (rect.width/2) + window.scrollX;
    const y = rect.top  + (rect.height/2) + window.scrollY;

    b.style.left = x + "px";
    b.style.top  = y + "px";

    // posição do pulso (no “ponto” do alvo)
    pulse.style.left = (x - 5) + "px";
    pulse.style.top  = (y - 5) + "px";

    root.appendChild(pulse);
    root.appendChild(b);

    // some depois de 6s
    setTimeout(() => {
      b.remove(); pulse.remove();
    }, 6000);
  }

  function runBeacons(){
    targets.forEach(t => {
      const el = document.querySelector(t.sel);
      if (el) showBeacon(el, { text: t.text, place: t.place });
    });
  }

  // FAB abre o modal completo (pra quem quiser ver)
  btnFab?.addEventListener("click", () => {
    if (!modal) return;
    modal.hidden = false;
    document.body.style.overflow = "hidden";
    document.getElementById("tour-title")?.focus?.();
    logEvent?.("tour_open", { source: "fab" });
  });

  // Controles do modal (mantidos do seu código)
  if (modal){
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
      if (chkAgain && chkAgain.checked) {
        localStorage.removeItem(KEY);
      } else {
        localStorage.setItem(KEY, "1");
      }
    }
    function closeTour(action="close"){
      setOpen(false);
      rememberSeen();
      logEvent?.("tour_close", { action, show_again: !!(chkAgain && chkAgain.checked) });
    }

    btnPrev?.addEventListener("click", () => { if (idx > 0) { idx--; render(); } });
    btnNext?.addEventListener("click", () => { if (idx < steps.length - 1) { idx++; render(); } else { closeTour("next_end"); } });
    btnDone?.addEventListener("click", () => closeTour("done"));
    btnClose?.addEventListener("click", () => closeTour("x"));
    document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !modal.hidden) closeTour("esc"); });
    modal.addEventListener("click", (e) => { if (e.target === modal) closeTour("backdrop"); });

    render();
  }

  // Primeira visita: só mostra os beacons (sem travar com modal)
  const firstVisit = !localStorage.getItem(KEY);
  if (firstVisit) {
    setTimeout(runBeacons, 900);
    localStorage.setItem(KEY, "1");
  }
})();