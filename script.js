document.addEventListener("DOMContentLoaded", function () {
  const button = document.querySelector(".menu-toggle");
  const nav = document.getElementById("main-nav");
  if (!button || !nav) return;

  button.addEventListener("click", function () {
    nav.classList.toggle("nav-open");
    const expanded = button.getAttribute("aria-expanded") === "true";
    button.setAttribute("aria-expanded", String(!expanded));
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("nav-open");
      button.setAttribute("aria-expanded", "false");
    });
  });
});
