/* =========================================================
   HX STONE · transition.js
   页面转场:
   · 支持 View Transitions 的浏览器 → 交给 CSS 跨文档转场
   · 其他浏览器 → 黑金遮罩:进场揭开、点击链接时覆盖
   ========================================================= */

(function () {
  "use strict";

  var root = document.documentElement;
  var reduce =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var veil = document.querySelector(".page-veil");
  var supportsVT =
    "startViewTransition" in document &&
    window.CSS &&
    CSS.supports &&
    CSS.supports("view-transition-name: none");

  var http = location.protocol === "http:" || location.protocol === "https:";

  if (!veil) return;

  /* ---------- 进场:揭开遮罩 ---------- */

  if (reduce || supportsVT || !http) {
    root.classList.remove("veil-prep");
  } else {
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        root.classList.remove("veil-prep");
        root.classList.add("veil-out");
      });
    });
  }

  /* ---------- 离场:拦截站内链接 ---------- */

  if (reduce || supportsVT || !http) return;

  document.addEventListener("click", function (e) {
    if (e.defaultPrevented) return;
    if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

    var a = e.target.closest && e.target.closest("a");
    if (!a) return;

    var href = a.getAttribute("href");
    if (!href) return;
    if (href.charAt(0) === "#") return;
    if (a.target && a.target !== "_self") return;
    if (a.hasAttribute("download")) return;
    if (/^(mailto:|tel:|https?:|javascript:)/i.test(href)) return;

    e.preventDefault();

    root.classList.remove("veil-out");
    root.classList.add("veil-in");

    window.setTimeout(function () {
      window.location.href = a.href;
    }, 520);
  });
})();
