(function () {
  "use strict";

  const cfg = window.LEBI_CONFIG || {};

  /**
   * Monta o link de "click to chat" usando a API pública do WhatsApp (wa.me).
   * Documentação: https://faq.whatsapp.com/5913398998672934
   * Funciona no celular (abre o app) e no computador (abre o WhatsApp Web/Desktop).
   */
  function linkWhatsApp(mensagem) {
    const numero = String(cfg.whatsappNumero || "").replace(/\D/g, "");
    const texto = encodeURIComponent(mensagem || cfg.whatsappMensagem || "");
    return `https://wa.me/${numero}${texto ? `?text=${texto}` : ""}`;
  }

  // Botões gerais de WhatsApp (rodapé, hero e botão flutuante)
  document.querySelectorAll(".js-whatsapp").forEach((el) => {
    el.href = linkWhatsApp();
  });

  // Instagram
  document.querySelectorAll(".js-instagram").forEach((el) => {
    el.href = `https://instagram.com/${cfg.instagram || "lebidoces"}`;
  });

  // Galeria de bolos
  const gallery = document.getElementById("gallery");
  const emojis = ["🎂", "🍰", "🧁", "🍓", "🍫", "🥕"];

  function escapar(txt) {
    const d = document.createElement("div");
    d.textContent = txt ?? "";
    return d.innerHTML;
  }

  (cfg.bolos || []).forEach((bolo, i) => {
    const card = document.createElement("article");
    card.className = "card reveal";
    const msg = `Olá, LeBi Doces! Tenho interesse no bolo "${bolo.nome}". Pode me passar mais informações? 🎂`;

    card.innerHTML = `
      <div class="card__media">
        <img src="${escapar(bolo.foto)}" alt="${escapar(bolo.nome)}" loading="lazy" />
        ${bolo.categoria ? `<span class="card__badge">${escapar(bolo.categoria)}</span>` : ""}
      </div>
      <div class="card__body">
        <h3 class="card__title">${escapar(bolo.nome)}</h3>
        <p class="card__desc">${escapar(bolo.descricao)}</p>
        <a class="card__link" href="${linkWhatsApp(msg)}" target="_blank" rel="noopener">Quero esse! →</a>
      </div>`;

    // Se a foto ainda não foi adicionada, mostra um cartão ilustrado
    const img = card.querySelector("img");
    img.addEventListener("error", () => {
      const ph = document.createElement("div");
      ph.className = "card__placeholder";
      ph.textContent = emojis[i % emojis.length];
      img.replaceWith(ph);
    }, { once: true });

    gallery.appendChild(card);
  });

  // Menu mobile
  const toggle = document.querySelector(".nav__toggle");
  const menu = document.querySelector(".nav__menu");
  toggle.addEventListener("click", () => {
    const aberto = menu.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(aberto));
  });
  menu.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => {
      menu.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    })
  );

  // Sombra no cabeçalho ao rolar
  const header = document.querySelector(".header");
  const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 10);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Animação de entrada ao rolar
  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("is-visible");
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  }

  // Corações flutuando no hero
  const hearts = document.querySelector(".hearts");
  if (hearts && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    for (let i = 0; i < 14; i++) {
      const h = document.createElement("span");
      h.className = "heart";
      h.textContent = "♥";
      h.style.left = `${Math.random() * 100}%`;
      h.style.fontSize = `${12 + Math.random() * 22}px`;
      h.style.animationDuration = `${8 + Math.random() * 10}s`;
      h.style.animationDelay = `${-Math.random() * 15}s`;
      hearts.appendChild(h);
    }
  }

  // Ano atual no rodapé
  document.getElementById("ano").textContent = new Date().getFullYear();
})();
