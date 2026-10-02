/* =========================================================
   HX STONE · main.js
   语言切换 · 手机菜单 · 笔记筛选 · 页脚年份
   ---------------------------------------------------------
   Swiss International Style:交互只做状态切换,不做位移/缩放/
   阴影/入场动画,所以这里没有滚动动效代码。
   ========================================================= */

(function () {
  "use strict";

  document.documentElement.setAttribute("data-enhanced", "1");

  /* ---------- 语言切换 ---------- */

  var STORAGE_KEY = "site-lang";
  var lang = "en";

  try {
    var saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "zh" || saved === "en") lang = saved;
  } catch (e) {
    /* 隐私模式下忽略 */
  }

  var langBtn = document.querySelector(".lang-toggle");

  function refreshLangButton() {
    if (!langBtn) return;
    langBtn.textContent = lang === "zh" ? "EN" : "中文";
    langBtn.setAttribute(
      "aria-label",
      lang === "zh" ? "Switch to English" : "切换到中文"
    );
    /* 语言按钮是切换控件,用 aria-pressed 表达当前状态(不靠颜色单独传递) */
    langBtn.setAttribute("aria-pressed", lang === "zh" ? "true" : "false");
  }

  if (typeof cacheEnglishText === "function" && typeof applyLang === "function") {
    cacheEnglishText();
    applyLang(lang);
    refreshLangButton();
  }

  if (langBtn) {
    langBtn.addEventListener("click", function () {
      lang = lang === "zh" ? "en" : "zh";

      try {
        localStorage.setItem(STORAGE_KEY, lang);
      } catch (e) {
        /* 忽略 */
      }

      applyLang(lang);
      refreshLangButton();
    });
  }

  /* ---------- 手机菜单 ---------- */

  var header = document.querySelector(".site-header");
  var navToggle = document.querySelector(".nav-toggle");

  function closeMenu() {
    if (!header) return;
    header.classList.remove("nav-open");
    if (navToggle) navToggle.setAttribute("aria-expanded", "false");
  }

  if (header && navToggle) {
    navToggle.addEventListener("click", function () {
      var open = header.classList.toggle("nav-open");
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    });

    header.addEventListener("click", function (e) {
      if (e.target.closest && e.target.closest("a")) closeMenu();
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 767) closeMenu();
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeMenu();
    });
  }

  /* ---------- 笔记分类筛选 ---------- */

  var filters = document.querySelectorAll("[data-filter]");
  var notes = document.querySelectorAll("[data-cat]");

  if (filters.length && notes.length) {
    filters.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var want = btn.getAttribute("data-filter");

        filters.forEach(function (b) {
          b.setAttribute("aria-pressed", b === btn ? "true" : "false");
        });

        notes.forEach(function (note) {
          note.hidden = !(want === "all" || note.getAttribute("data-cat") === want);
        });
      });
    });
  }

  /* ---------- 页脚年份 ---------- */

  var year = String(new Date().getFullYear());
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = year;
  });
})();
