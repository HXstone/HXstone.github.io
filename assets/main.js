/* =========================================================
   全站交互:语言切换、手机菜单、页脚年份、打印、入场动效
   ========================================================= */

(function () {
  "use strict";

  var STORAGE_KEY = "site-lang";
  var header = document.querySelector(".site-header");
  var langBtn = document.querySelector(".lang-toggle");

  /* ---------- 语言切换 ---------- */

  var lang = "zh";
  try {
    var saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "zh" || saved === "en") lang = saved;
  } catch (e) {
    /* 隐私模式下 localStorage 不可用时忽略 */
  }

  function refreshLangButton() {
    if (!langBtn) return;
    langBtn.textContent = lang === "zh" ? "EN" : "中文";
    langBtn.setAttribute("aria-label", lang === "zh" ? "Switch to English" : "切换到中文");
  }

  if (typeof applyLang === "function") {
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

  var navToggle = document.querySelector(".nav-toggle");

  function closeMenu() {
    if (!header) return;
    header.classList.remove("nav-open");
    if (navToggle) navToggle.setAttribute("aria-expanded", "false");
  }

  if (navToggle && header) {
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

  /* ---------- 页脚年份 ---------- */

  var year = String(new Date().getFullYear());
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = year;
  });

  /* ---------- 打印(简历) ---------- */

  document.querySelectorAll("[data-print]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      window.print();
    });
  });

  /* ---------- 入场动效 ---------- */

  var revealEls = document.querySelectorAll(".reveal");
  var reduceMotion =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!reduceMotion && "IntersectionObserver" in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    revealEls.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }
})();
