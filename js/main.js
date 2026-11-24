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
    // Usa api.whatsapp.com em vez de wa.me: o redirecionamento do wa.me
    // corrompe emojis (aparecem como "�"), principalmente no WhatsApp Web/Desktop.
    return `https://api.whatsapp.com/send?phone=${numero}${texto ? `&text=${texto}` : ""}`;
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

  // Aceita o formato antigo ({ foto: "..." }) e o novo ({ midias: [...] })
  function midiasDo(bolo) {
    if (Array.isArray(bolo.midias) && bolo.midias.length) return bolo.midias;
    return bolo.foto ? [{ tipo: "foto", src: bolo.foto }] : [];
  }

  function htmlMidia(m, nome, n, total) {
    const foco = m.foco ? ` style="object-position:${escapar(m.foco)}"` : "";
    const rotulo = total > 1 ? `${nome} (${n} de ${total})` : nome;
    if (m.tipo === "video") {
      // "#t=0.1" faz o navegador mostrar o primeiro quadro como capa
      return `<video src="${escapar(m.src)}#t=0.1" muted loop playsinline controls preload="metadata"${foco}
                aria-label="Vídeo: ${escapar(rotulo)}"></video>`;
    }
    return `<img src="${escapar(m.src)}" alt="${escapar(rotulo)}" loading="lazy"${foco} />`;
  }

  (cfg.bolos || []).forEach((bolo, i) => {
    const card = document.createElement("article");
    card.className = "card reveal";
    const msg = `Olá, LeBi Doces! Tenho interesse no bolo "${bolo.nome}". Pode me passar mais informações? 🎂`;
    const midias = midiasDo(bolo);
    const varias = midias.length > 1;

    const slides = midias.length
      ? midias.map((m, n) => `<div class="card__slide">${htmlMidia(m, bolo.nome, n + 1, midias.length)}</div>`).join("")
      : `<div class="card__slide"><div class="card__placeholder">${emojis[i % emojis.length]}</div></div>`;

    card.innerHTML = `
      <div class="card__media">
        <div class="card__track" ${varias ? `tabindex="0" aria-label="Fotos de ${escapar(bolo.nome)}"` : ""}>${slides}</div>
        ${bolo.categoria ? `<span class="card__badge">${escapar(bolo.categoria)}</span>` : ""}
        ${varias ? `
          <button class="card__nav card__nav--prev" type="button" aria-label="Foto anterior">‹</button>
          <button class="card__nav card__nav--next" type="button" aria-label="Próxima foto">›</button>
          <div class="card__dots">${midias.map((m, n) =>
            `<button type="button" class="card__dot${n === 0 ? " is-active" : ""}" aria-label="Ver ${m.tipo === "video" ? "vídeo" : "foto"} ${n + 1}"></button>`).join("")}
          </div>` : ""}
      </div>
      <div class="card__body">
        <h3 class="card__title">${escapar(bolo.nome)}</h3>
        <p class="card__desc">${escapar(bolo.descricao)}</p>
        <a class="card__link" href="${linkWhatsApp(msg)}" target="_blank" rel="noopener">Quero esse! →</a>
      </div>`;

    // Se o arquivo ainda não foi adicionado, mostra um cartão ilustrado
    card.querySelectorAll(".card__slide img, .card__slide video").forEach((el) => {
      el.addEventListener("error", () => {
        const ph = document.createElement("div");
        ph.className = "card__placeholder";
        ph.textContent = emojis[i % emojis.length];
        el.replaceWith(ph);
      }, { once: true });
    });

    if (varias) iniciarCarrossel(card);
    gallery.appendChild(card);
  });

  // Carrossel: arrasta no celular (scroll-snap), setas e bolinhas no computador
  function iniciarCarrossel(card) {
    const track = card.querySelector(".card__track");
    const slides = [...track.children];
    const dots = [...card.querySelectorAll(".card__dot")];
    let atual = 0;

    const irPara = (n) => {
      const alvo = (n + slides.length) % slides.length;
      track.scrollTo({ left: alvo * track.clientWidth, behavior: "smooth" });
    };

    card.querySelector(".card__nav--prev").addEventListener("click", () => irPara(atual - 1));
    card.querySelector(".card__nav--next").addEventListener("click", () => irPara(atual + 1));
    dots.forEach((d, n) => d.addEventListener("click", () => irPara(n)));
    track.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") { e.preventDefault(); irPara(atual - 1); }
      if (e.key === "ArrowRight") { e.preventDefault(); irPara(atual + 1); }
    });

    // Atualiza a bolinha ativa e toca/pausa vídeos conforme o slide visível
    let raf;
    track.addEventListener("scroll", () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const n = Math.round(track.scrollLeft / track.clientWidth);
        if (n === atual) return;
        atual = n;
        dots.forEach((d, k) => d.classList.toggle("is-active", k === n));
        slides.forEach((s, k) => {
          const v = s.querySelector("video");
          if (!v) return;
          if (k === n) v.play().catch(() => {});
          else v.pause();
        });
      });
    }, { passive: true });
  }

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
