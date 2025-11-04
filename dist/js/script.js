// =====================
// MENU MOBILE
// =====================
function initializeMenu() {
  const menuIcon = document.querySelector("#menu-icon");
  const navbar = document.querySelector(".navbar");
  const navBg = document.querySelector(".nav-bg");
  const dropdowns = document.querySelectorAll(".dropdown");
  const navLinks = document.querySelectorAll(".navbar a");

  if (!menuIcon || !navbar) return;

  // === Alternar abertura/fechamento ===
  menuIcon.addEventListener("click", (e) => {
    e.stopPropagation();
    const active = navbar.classList.toggle("active");
    menuIcon.classList.toggle("bx-x", active);
    navBg?.classList.toggle("active", active);
  });

  // === Fechar ao clicar em um link ===
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      if (window.innerWidth <= 768) {
        e.stopPropagation();
        closeMobileMenu();
      }
    });
  });

  // === Dropdowns no mobile (só 1 aberto) ===
  dropdowns.forEach((dropdown) => {
    const trigger = dropdown.querySelector("a");
    if (!trigger) return;

    trigger.addEventListener("click", (e) => {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        e.stopPropagation();

        dropdowns.forEach((d) => {
          if (d !== dropdown) d.classList.remove("active");
        });

        dropdown.classList.toggle("active");
      }
    });
  });

  // === Fechar ao clicar fora ===
  document.addEventListener("click", (e) => {
    if (window.innerWidth <= 768 && !e.target.closest(".header")) {
      closeMobileMenu();
    }
  });

  // === Fechar ao redimensionar para desktop ===
  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) closeMobileMenu();
  });

  // === Função: fechar menu com suavidade ===
  function closeMobileMenu() {
    navbar.classList.remove("active");
    menuIcon.classList.remove("bx-x");
    dropdowns.forEach((d) => d.classList.remove("active"));
    navBg?.classList.remove("active");
  }
}

// =====================
// MOSAICO - Barra Laranja Animada
// =====================
function initializeMosaicScroll() {
  document.querySelectorAll(".image-mosaic").forEach((mosaic) => {
    mosaic.style.setProperty("--scroll-progress", "0%");
    mosaic.addEventListener("scroll", () => {
      const maxScroll = mosaic.scrollWidth - mosaic.clientWidth;
      const progress = (mosaic.scrollLeft / maxScroll) * 100;
      mosaic.style.setProperty("--scroll-progress", `${progress}%`);
    });
  });
}

// =====================
// SCROLL SUAVE + Ajuste visual
// =====================
function initializeSmoothScroll() {
  const header = document.querySelector(".header");
  const headerHeight = header ? header.offsetHeight : 0;

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      const targetId = anchor.getAttribute("href").substring(1);
      const target = document.getElementById(targetId);
      if (!target) return;

      e.preventDefault();
      const targetPos =
        target.getBoundingClientRect().top + window.scrollY - headerHeight;

      window.scrollTo({
        top: targetPos,
        behavior: "smooth",
      });

      // === Pequeno respiro visual ===
      setTimeout(() => {
        target.style.transition = "padding-top 0.4s ease";
        target.style.paddingTop = "80px";
        setTimeout(() => {
          target.style.paddingTop = "";
        }, 1000);
      }, 700);
    });
  });
}

// =====================
// BOTÃO WHATSAPP
// =====================
function initializeWhatsAppButton() {
  const container = document.getElementById("whatsapp-container");
  if (!container) return;
}

// =====================
// INICIALIZAÇÃO GERAL
// =====================
document.addEventListener("DOMContentLoaded", () => {
  initializeMenu();
  initializeMosaicScroll();
  initializeSmoothScroll();
  initializeWhatsAppButton();
});
