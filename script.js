const root = document.documentElement;
const btn = document.querySelector("#theme-toggle");

function applyLabel() {
  const dark = root.dataset.theme === "dark";
  btn.textContent = dark ? "Light" : "Dark";
  btn.setAttribute("aria-pressed", dark);
}
applyLabel();

btn.addEventListener("click", () => {
  const next = root.dataset.theme === "dark" ? "light" : "dark";
  root.dataset.theme = next;
  try { localStorage.setItem("theme", next); } catch (e) {}
  applyLabel();
});