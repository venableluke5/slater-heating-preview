const menuToggle = document.querySelector("[data-menu-toggle]");
const siteNav = document.querySelector("[data-site-nav]");
const yearTarget = document.querySelector("[data-current-year]");
const revealItems = document.querySelectorAll("[data-reveal]");
const faqButtons = document.querySelectorAll("[data-faq-toggle]");

if (yearTarget) {
  yearTarget.textContent = new Date().getFullYear();
}

if (menuToggle && siteNav) {
  const closeMenu = () => {
    siteNav.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
    document.body.classList.remove("menu-open");
  };

  menuToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    document.body.classList.toggle("menu-open", isOpen);
  });

  siteNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth >= 980) {
      closeMenu();
    }
  });
}

faqButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const answer = button.nextElementSibling;
    const icon = button.querySelector(".faq-icon");
    const isOpen = button.getAttribute("aria-expanded") === "true";

    button.setAttribute("aria-expanded", String(!isOpen));

    if (answer) {
      answer.hidden = isOpen;
    }

    if (icon) {
      icon.textContent = isOpen ? "+" : "-";
    }
  });
});

if (revealItems.length) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.14,
      rootMargin: "0px 0px -40px 0px",
    },
  );

  revealItems.forEach((item) => {
    revealObserver.observe(item);
  });
}
