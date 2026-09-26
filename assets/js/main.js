/* =========================================================
   HX STONE · main.js
   语言切换 · 错峰延迟 · 手机菜单 · 年份 · 打印
   (必须在 motion.js 之前执行,好让动效读到 --rd 延迟)
   ========================================================= */

(function () {
  "use strict";

  document.documentElement.setAttribute("data-enhanced", "1");

  /* ---------- 错峰延迟 ---------- */

  document.querySelectorAll("[data-stagger]").forEach(function (container) {
    var i = 0;

    Array.prototype.forEach.call(container.children, function (child) {
      if (child.classList && child.classList.contains("reveal")) {
        child.style.setProperty("--rd", i * 90 + "ms");
        i++;
      }
    });
  });

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

      /* Hero 的文字分裂由 motion.js 重建(否则逐字/逐词结构会被 textContent 覆盖) */
      if (typeof window.__splitHero === "function") window.__splitHero();
      /* 状态栏的区块名也要跟着换语言 */
      if (typeof window.__railRefresh === "function") window.__railRefresh();
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
      if (window.innerWidth > 720) closeMenu();
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
      btn.setAttribute("aria-pressed", btn.getAttribute("data-filter") === "all" ? "true" : "false");

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

  /* ---------- 打印 ---------- */

  document.querySelectorAll("[data-print]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      window.print();
    });
  });
})();
