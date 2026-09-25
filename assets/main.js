/* =========================================================
   全站交互:语言切换、手机菜单、滚动进度、入场动效、
             卡片光晕、视差、页脚年份、打印
   ========================================================= */

(function () {
  "use strict";

  document.documentElement.setAttribute("data-enhanced", "1");

  var STORAGE_KEY = "site-lang";
  var reduceMotion =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

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

  /* ---------- 滚动进度条 ---------- */

  if (header) {
    var bar = document.createElement("div");
    bar.className = "scroll-progress";
    bar.setAttribute("aria-hidden", "true");
    header.appendChild(bar);

    var progressTicking = false;

    var updateProgress = function () {
      var doc = document.documentElement;
      var max = doc.scrollHeight - window.innerHeight;
      var percent = max > 0 ? (window.scrollY / max) * 100 : 0;
      bar.style.setProperty("--progress", percent.toFixed(2) + "%");
      progressTicking = false;
    };

    window.addEventListener(
      "scroll",
      function () {
        if (!progressTicking) {
          progressTicking = true;
          requestAnimationFrame(updateProgress);
        }
      },
      { passive: true }
    );

    window.addEventListener("resize", updateProgress);
    updateProgress();
  }

  /* ---------- 错峰入场(给 [data-stagger] 里的 .reveal 排队) ---------- */

  document.querySelectorAll("[data-stagger]").forEach(function (container) {
    var i = 0;
    Array.prototype.forEach.call(container.children, function (child) {
      if (child.classList && child.classList.contains("reveal")) {
        child.style.setProperty("--rd", i * 90 + "ms");
        i++;
      }
    });
  });

  /* ---------- 入场动效 ---------- */

  var revealEls = document.querySelectorAll(".reveal");

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
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );

    revealEls.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }

  /* ---------- 卡片光晕(跟随鼠标) ---------- */

  var canHover =
    window.matchMedia && window.matchMedia("(hover: hover)").matches;

  if (!reduceMotion && canHover) {
    document.querySelectorAll(".card, .post-card").forEach(function (card) {
      card.addEventListener("pointermove", function (e) {
        var rect = card.getBoundingClientRect();
        card.style.setProperty("--mx", (e.clientX - rect.left).toFixed(0) + "px");
        card.style.setProperty("--my", (e.clientY - rect.top).toFixed(0) + "px");
      });
    });
  }

  /* ---------- 视差滚动 ---------- */

  var parallaxEls = Array.prototype.slice.call(
    document.querySelectorAll("[data-parallax]")
  );

  if (!reduceMotion && parallaxEls.length && window.innerWidth > 720) {
    var ticking = false;

    var updateParallax = function () {
      var y = window.scrollY || window.pageYOffset || 0;

      parallaxEls.forEach(function (el) {
        var speed = parseFloat(el.getAttribute("data-parallax")) || 0.05;
        el.style.transform =
          "translate3d(0," + (y * speed).toFixed(1) + "px,0)";
      });

      ticking = false;
    };

    window.addEventListener(
      "scroll",
      function () {
        if (!ticking) {
          ticking = true;
          requestAnimationFrame(updateParallax);
        }
      },
      { passive: true }
    );

    updateParallax();
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
})();
