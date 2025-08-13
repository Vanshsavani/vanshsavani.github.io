/* =========================
   main.js · Vansh Portfolio
   ========================= */

// 1) Footer year
(function setYear() {
  const el = document.getElementById("year");
  if (el) el.textContent = new Date().getFullYear();
})();

// 2) Theme handling (dark/light)
//    - Respects localStorage('theme')
//    - Falls back to system preference
(function initTheme() {
  const stored = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const shouldDark = stored ? stored === "dark" : prefersDark;
  document.documentElement.classList.toggle("dark", shouldDark);
})();

// 3) Toggle creator (if your HTML lacks a #themeToggle button)
(function ensureToggle() {
  const existing = document.getElementById("themeToggle");
  if (existing) {
    existing.addEventListener("click", toggleTheme);
    return;
  }

  // Create a minimal toggle in header right side if possible
  const header = document.querySelector("header .flex, header div, header");
  if (!header) return;

  const btn = document.createElement("button");
  btn.id = "themeToggle";
  btn.type = "button";
  btn.setAttribute("aria-label", "Toggle dark mode");
  btn.textContent = "🌓";
  Object.assign(btn.style, {
    padding: "0.5rem",
    borderRadius: "0.5rem",
    border: "1px solid #e2e8f0",
    background: "transparent",
    cursor: "pointer",
    marginLeft: "0.5rem"
  });

  btn.addEventListener("click", toggleTheme);
  header.appendChild(btn);
})();

function toggleTheme() {
  const isDark = document.documentElement.classList.toggle("dark");
  localStorage.setItem("theme", isDark ? "dark" : "light");
}

// 4) Respect reduced motion users (remove non-essential transitions)
(function reduceMotionRespect() {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (mq.matches) {
    try {
      const style = document.createElement("style");
      style.textContent = `*{animation:none!important;transition:none!important;scroll-behavior:auto!important}`;
      document.head.appendChild(style);
    } catch {}
  }
})();
