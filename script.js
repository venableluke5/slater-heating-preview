const form = document.querySelector(".mock-form");
const statusLine = document.querySelector(".form-status");
const header = document.querySelector("[data-header]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const nav = document.querySelector("[data-nav]");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const revealTargets = document.querySelectorAll(
  ".trust-band, .family-section, .section, .area-section, .reviews-section, .contact-section"
);

if (header && menuToggle && nav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = header.classList.toggle("is-menu-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "Close navigation menu" : "Open navigation menu"
    );
  });

  nav.addEventListener("click", (event) => {
    if (event.target.closest("a")) {
      header.classList.remove("is-menu-open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation menu");
    }
  });
}

if (revealTargets.length) {
  if (reduceMotion.matches || !("IntersectionObserver" in window)) {
    revealTargets.forEach((target) => target.classList.add("is-visible"));
  } else {
    revealTargets.forEach((target) => target.classList.add("reveal"));

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
      { rootMargin: "0px 0px -12% 0px", threshold: 0.12 }
    );

    revealTargets.forEach((target) => revealObserver.observe(target));
  }
}

if (form && statusLine) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    statusLine.textContent =
      "Please call (207) 299-6895 for service while online requests are being set up.";
  });
}
