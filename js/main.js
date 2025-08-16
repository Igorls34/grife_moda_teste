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
// intent: 'product_card' | 'generic_top' | 'generic_hero' | 'generic_footer' | 'generic_default'
// ============================
function buildWhatsMessage({ intent = "generic_default", nome, cor, tamanho, preco, url, sku, promo }) {
  const precoTxt = (typeof preco === "number" && Number.isFinite(preco)) ? fmtBRL(preco) : "Sob consulta";
  const promoTxt = promo ? `\n🎁 *Promoção:* ${promo}` : "";

  // ---- Mensagens genéricas (sem produto) ----
  if (intent === "generic_top") {
    return [
      "Olá, Emerson! Vim pelo topo do site e preciso de atendimento 👋",
      "",
      "Quero tirar uma dúvida rápida sobre os produtos e tamanhos.",
      "",
      `🔗 *Site:* ${url}`
    ].join("\n");
  }

  if (intent === "generic_hero") {
    return [
      "Oi, Emerson! Acabei de ver as novidades na vitrine 🛍️",
      "",
      "Pode me indicar os destaques e melhores promoções?",
      "",
      `🔗 *Vitrine:* ${url}`
    ].join("\n");
  }

  if (intent === "generic_footer") {
    return [
      "Olá, Emerson! Quero finalizar uma compra ✅",
      "",
      "Pode me ajudar com formas de pagamento e prazo de entrega?",
      "",
      `🔗 *Página:* ${url}`
    ].join("\n");
  }

  // ---- Mensagem de produto (card) ----
  if (intent === "product_card") {
    return [
      "Olá, Emerson! Quero este produto da *Grife Moda* 👇",
      "",
      `🧾 *Produto:* ${nome}${sku ? ` (${sku})` : ""}`,
      `🎨 *Cor:* ${cor || "-"}`,
      `📏 *Tamanho:* ${tamanho || "-"}`,
      `💰 *Preço:* ${precoTxt}${promoTxt}`,
      "",
      `🔗 *Link:* ${url}`,
      "Pode confirmar disponibilidade e entrega?"
    ].join("\n");
  }

  // ---- Fallback (genérico padrão) ----
  return [
    "Olá, Emerson! Preciso de atendimento da Grife Moda 🙂",
    "",
    "Tenho dúvidas sobre produtos e tamanhos.",
    "",
    `🔗 *Site:* ${url}`
  ].join("\n");
}
// Href pronto para abrir o WhatsApp
// Monta link universal (funciona em mobile e desktop)
function whatsappHref({ nome, cor, tamanho, preco, url, campaign, content, sku, promo, intent }) {
  // Sanitiza/garante valores
  const safeUrl = url || location.href;
  const linkComUtm = withUtm(safeUrl, { campaign, content });

  const msg = buildWhatsMessage({
    intent,
    nome,
    cor,
    tamanho,
    preco,
    url: linkComUtm,
    sku,
    promo
  });

  const phone = String(BUSINESS.wppNumber || "").replace(/\D/g, ""); // só dígitos
  const text  = encodeURIComponent(msg);

  // API universal redireciona pro app no mobile e pro Web no desktop
  return `https://api.whatsapp.com/send?phone=${phone}&text=${text}`;
}

// Abre o WhatsApp com fallback se o pop-up for bloqueado
function openWhats(payload) {
  const href = whatsappHref(payload);
  const win = window.open(href, "_blank", "noopener");

  // Se o navegador bloquear pop-up, faz fallback no mesmo tab
  if (!win || win.closed || typeof win.closed === "undefined") {
    window.location.href = href;
  }
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
// Tutorial interativo (coachmarks) — MOBILE + ANTI-CORTE
// ============================
(function tourInteractive(){
  const KEY = "gm_seen_tour_v5";
  const btnFab = document.getElementById("help-fab");
  const $ = (sel) => document.querySelector(sel);

  // Passos por página
  const stepsByPage = {
    index: [
      { sel: "#cta-wpp-hero",    place: "bottom", title: "Fale no WhatsApp", text: "Clique aqui pra falar direto com o Emerson. Mensagem já vai prontinha." },
      { sel: '.site-nav .menu a[href="./colecoes.html"]', place: "bottom", title: "Coleções", text: "Navegue por categorias: camisetas, bermudas, polos e mais." },
      { sel: "#product-grid", place: "top", title: "Produtos em destaque", text: "Role pra ver as novidades. No card, use “Comprar no WhatsApp”." },
      { sel: 'a[href="./lead.html"]', place: "bottom", title: "Quero desconto", text: "Deixe seu contato e receba ofertas e disponibilidade no WhatsApp." }
    ],
    colecoes: [
      { sel: "#filters", place: "bottom", title: "Filtros", text: "Filtre por categoria. O estado ativo fica realçado em dourado." },
      { sel: "#grid-colecoes", place: "top", title: "Lista da coleção", text: "Abra os detalhes ou compre direto no WhatsApp." }
    ],
    produto: [
      { sel: ".title, h1", place: "bottom", title: "Detalhes do produto", text: "Nome, preço, tamanhos e imagem maior aqui." },
      { sel: ".js-buy, #cta-wpp-hero, #cta-wpp-top", place: "top", title: "Comprar no WhatsApp", text: "Confirmamos disponibilidade e combinamos entrega/pagamento." }
    ],
    lead: [
      { sel: "#lead-form", place: "top", title: "Seu desconto", text: "Preencha rapidinho. A mensagem vai pro WhatsApp do Emerson." }
    ]
  };

  // Página atual
  const path = location.pathname;
  const pageKey =
    /colecoes\.html$/.test(path) ? "colecoes" :
    /produto\.html$/.test(path)  ? "produto"  :
    /lead\.html$/.test(path)     ? "lead"     : "index";

  // DOM base
  const overlay   = document.createElement("div"); overlay.className = "gm-tour-overlay";
  const spotlight = document.createElement("div"); spotlight.className = "gm-spotlight";
  const card      = document.createElement("div"); card.className = "gm-tour-card";
  const arrow     = document.createElement("div"); arrow.className = "gm-tour-arrow";

  const h4 = document.createElement("h4");
  const p  = document.createElement("p");
  const actions = document.createElement("div"); actions.className = "gm-tour-actions";
  const left  = document.createElement("div"); left.className = "gm-tour-left";
  const right = document.createElement("div"); right.className = "gm-tour-right";

  const btnPrev = document.createElement("button"); btnPrev.className = "gm-btn gm-btn-ghost";   btnPrev.textContent = "Voltar";
  const btnSkip = document.createElement("button"); btnSkip.className = "gm-btn gm-btn-ghost";   btnSkip.textContent = "Pular";
  const btnNext = document.createElement("button"); btnNext.className = "gm-btn gm-btn-primary"; btnNext.textContent = "Próximo";

  left.append(btnPrev, btnSkip);
  right.append(btnNext);
  actions.append(left, right);
  card.append(h4, p, actions);

  // Estado
  let steps = (stepsByPage[pageKey] || []).filter(s => $(s.sel));
  let idx = 0, running = false;
  let lastTarget = null, lastPlace = "bottom";

  // Helpers de viewport (usa visualViewport quando disponível)
  function getViewport(){
    const vv = window.visualViewport;
    if (vv) return { x: vv.pageLeft, y: vv.pageTop, w: vv.width, h: vv.height };
    return {
      x: window.scrollX, y: window.scrollY,
      w: Math.max(document.documentElement.clientWidth,  window.innerWidth  || 0),
      h: Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
    };
  }
  const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

  function scrollIntoViewIfNeeded(el){
    const r = el.getBoundingClientRect();
    const margin = 120;
    const { h } = getViewport();
    if (r.top < margin || r.bottom > (h - margin)) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }

  // Escolhe melhor lado; se não couber, “fixed-bottom”
  function chooseBestPlace(target, preferred){
    const { w, h } = getViewport();
    const rect = target.getBoundingClientRect();
    const topSpace    = rect.top;
    const bottomSpace = h - rect.bottom;
    const leftSpace   = rect.left;
    const rightSpace  = w - rect.right;

    const estH = Math.min(220, h * 0.6);
    const estW = Math.min(360, w * 0.96);
    const order = [preferred, "bottom","top","right","left"].filter((v,i,a)=>a.indexOf(v)===i);

    for (const place of order){
      if (place === "bottom" && bottomSpace >= estH) return "bottom";
      if (place === "top"    && topSpace    >= estH) return "top";
      if (place === "right"  && rightSpace  >= Math.min(estW, 280)) return "right";
      if (place === "left"   && leftSpace   >= Math.min(estW, 280)) return "left";
    }
    return "fixed-bottom";
  }

  // Posiciona spotlight e card; “encaixa” o card dentro da viewport
  function placeAround(target, place){
    const vp = getViewport();
    const r  = target.getBoundingClientRect();

    // Spotlight no alvo
    spotlight.style.left   = (window.scrollX + r.left - 8) + "px";
    spotlight.style.top    = (window.scrollY + r.top  - 8) + "px";
    spotlight.style.width  = (r.width  + 16) + "px";
    spotlight.style.height = (r.height + 16) + "px";

    // Reset
    card.classList.remove("gm-pos-top","gm-pos-right","gm-pos-bottom","gm-pos-left","gm-fixed-bottom");
    arrow.className = "gm-tour-arrow";

    if (place === "fixed-bottom"){
      card.classList.add("gm-fixed-bottom");
      lastTarget = target; lastPlace = place;
      return;
    }

    // Ponto base (centro do alvo)
    const cx = window.scrollX + r.left + r.width / 2;
    const cy = window.scrollY + r.top  + r.height / 2;

    card.style.left = cx + "px";
    card.style.top  = cy + "px";
    card.classList.add(`gm-pos-${place}`);

    // Injeta e mede
    if (!document.body.contains(card)) document.body.appendChild(card);
    const cr = card.getBoundingClientRect();
    const pad = 8;

    // Alvo “ideal” por lado
    let left = cx, top = cy;
    if (place === "bottom") top = window.scrollY + r.bottom + 14;
    if (place === "top")    top = window.scrollY + r.top    - 14;
    if (place === "right")  left = window.scrollX + r.right + 14;
    if (place === "left")   left = window.scrollX + r.left  - 14;

    // Encaixa dentro da viewport visível
    const minLeft = vp.x + pad + cr.width  * 0.5;
    const maxLeft = vp.x + vp.w - pad - cr.width * 0.5;
    const minTop  = vp.y + pad + cr.height * 0.5;
    const maxTop  = vp.y + vp.h - pad - cr.height * 0.5;

    left = clamp(left, minLeft, maxLeft);
    top  = clamp(top,  minTop,  maxTop);

    card.style.left = left + "px";
    card.style.top  = top  + "px";

    // Seta
    arrow.style.left = (window.scrollX + r.left + r.width / 2) + "px";
    arrow.style.top  = (window.scrollY + r.top  + r.height / 2) + "px";
    arrow.classList.add(
      place === "top"    ? "gm-arrow-top"    :
      place === "right"  ? "gm-arrow-right"  :
      place === "bottom" ? "gm-arrow-bottom" : "gm-arrow-left"
    );

    lastTarget = target; lastPlace = place;
  }

  function reflow(){
    if (!running || !lastTarget) return;
    const place = chooseBestPlace(lastTarget, lastPlace);
    placeAround(lastTarget, place);
  }

  function showStep(i){
    const step = steps[i];
    if (!step) { end(); return; }
    const target = $(step.sel);
    if (!target) { next(); return; }

    scrollIntoViewIfNeeded(target);

    h4.textContent = step.title || "Dica";
    p.textContent  = step.text  || "";

    if (!document.body.contains(overlay))  document.body.appendChild(overlay);
    if (!document.body.contains(spotlight))document.body.appendChild(spotlight);
    if (!document.body.contains(card))     document.body.appendChild(card);
    if (!document.body.contains(arrow))    document.body.appendChild(arrow);

    requestAnimationFrame(()=> overlay.classList.add("show"));

    const chosen = chooseBestPlace(target, step.place || "bottom");
    placeAround(target, chosen);
  }

  const next = () => { idx = Math.min(idx + 1, steps.length); showStep(idx); };
  const prev = () => { idx = Math.max(idx - 1, 0);           showStep(idx); };

  function end(action="end"){
    overlay.remove(); spotlight.remove(); card.remove(); arrow.remove();
    running = false; localStorage.setItem(KEY, "1");
    try { logEvent?.("tour_finish", { page: pageKey, action }); } catch(e){}
    overlay.style.pointerEvents = "none";
  }

  // Botões
  btnNext.addEventListener("click", () => (idx >= steps.length - 1) ? end("done") : next());
  btnPrev.addEventListener("click", () => { if (idx > 0) prev(); });
  btnSkip.addEventListener("click", () => end("skip"));

  // UX mobile: tocar no fundo avança
  overlay.addEventListener("click", () => (idx >= steps.length - 1) ? end("tap_end") : next());

  // Reposicionamento reativo
  window.addEventListener("scroll", reflow, { passive: true });
  window.addEventListener("resize", reflow);
  window.visualViewport?.addEventListener("resize", reflow);
  window.visualViewport?.addEventListener("scroll", reflow);
  window.addEventListener("orientationchange", () => setTimeout(reflow, 250));

  // Start
  function start(from="fab"){
    if (!steps.length || running) return;
    running = true; idx = 0;
    try { logEvent?.("tour_start", { page: pageKey, from }); } catch(e){}
    overlay.style.pointerEvents = "auto";
    showStep(idx);
  }

  // FAB “?” abre o tour
  btnFab?.addEventListener("click", () => start("fab"));

  // “toque” inicial discreto (não abre tour)
  const firstVisit = !localStorage.getItem(KEY);
  if (firstVisit && pageKey === "index") {
    const heroBtn = $("#cta-wpp-hero") || $("#cta-wpp-top");
    if (heroBtn?.animate) {
      heroBtn.animate(
        [{ boxShadow: "0 0 0 0 rgba(212,175,55,.55)" }, { boxShadow: "0 0 0 18px rgba(212,175,55,0)" }],
        { duration: 1300, iterations: 2 }
      );
    }
  }
})();
