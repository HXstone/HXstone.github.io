/* =========================================================
   HX STONE · motion.js
   文字分裂 · Hero 入场时间线 · 滚动入场 · 视差 · 进度条
   有 GSAP + ScrollTrigger 时用它们;没有则优雅降级。
   ========================================================= */

(function () {
  "use strict";

  var root = document.documentElement;
  var reduce =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var gsap = window.gsap;
  var ScrollTrigger = window.ScrollTrigger;
  var useGsap = !!(gsap && ScrollTrigger && !reduce);

  if (useGsap) {
    gsap.registerPlugin(ScrollTrigger);
    root.classList.add("gsap");
  }

  /* ---------- 文字分裂 ---------- */

  function splitChars(el) {
    var text = el.textContent;
    el.textContent = "";

    var frag = document.createDocumentFragment();

    text.split("").forEach(function (ch) {
      var outer = document.createElement("span");
      var inner = document.createElement("span");

      outer.className = ch === " " ? "ch ch-space" : "ch";
      inner.className = "ch-in";
      inner.textContent = ch === " " ? "\u00a0" : ch;

      outer.appendChild(inner);
      frag.appendChild(outer);
    });

    el.appendChild(frag);
    return el.querySelectorAll(".ch-in");
  }

  function splitWords(el) {
    var words = el.textContent.trim().split(/\s+/);
    el.textContent = "";

    var frag = document.createDocumentFragment();

    words.forEach(function (word, i) {
      var outer = document.createElement("span");
      var inner = document.createElement("span");

      outer.className = "w";
      inner.className = "w-in";
      inner.textContent = word;

      outer.appendChild(inner);
      frag.appendChild(outer);

      if (i < words.length - 1) frag.appendChild(document.createTextNode(" "));
    });

    el.appendChild(frag);
    return el.querySelectorAll(".w-in");
  }

  /* ---------- Hero 入场 ---------- */

  var titleEl = document.querySelector("[data-split='chars']");
  var statementEl = document.querySelector("[data-split='words']");

  if (useGsap && (titleEl || statementEl)) {
    var tl = gsap.timeline({ defaults: { ease: "expo.out" } });

    if (titleEl) {
      var chars = splitChars(titleEl);
      gsap.set(chars, { yPercent: 118 });
      tl.to(chars, { yPercent: 0, duration: 1.15, stagger: 0.05 }, 0.08);
    }

    if (statementEl) {
      var words = splitWords(statementEl);
      gsap.set(words, { yPercent: 118, opacity: 0 });
      tl.to(words, { yPercent: 0, opacity: 1, duration: 0.95, stagger: 0.04 }, 0.42);
    }

    tl.to(
      "[data-intro]",
      { opacity: 1, y: 0, duration: 1, stagger: 0.09 },
      0.55
    );

    /* 球体并入同一条时间线,避免它自己的 reveal 与文字抢跑 */
    var orbEl = document.querySelector("[data-intro-orb]");
    if (orbEl) {
      tl.to(
        orbEl,
        { opacity: 1, y: 0, scale: 1, filter: "blur(0px)", duration: 1.2 },
        0.5
      );
    }
  }

  /* 语言切换后重建文字分裂(直接呈现终态,不重播入场) */
  window.__splitHero = function () {
    if (!useGsap) return;

    if (titleEl) {
      gsap.set(splitChars(titleEl), { yPercent: 0 });
    }

    if (statementEl) {
      gsap.set(splitWords(statementEl), { yPercent: 0, opacity: 1 });
    }
  };

  /* ---------- 滚动入场 ---------- */

  // 由 hero 时间线接管的元素不参与普通 reveal
  var revealEls = Array.prototype.filter.call(
    document.querySelectorAll(".reveal"),
    function (el) {
      return !el.hasAttribute("data-intro-orb");
    }
  );

  if (useGsap) {
    revealEls.forEach(function (el) {
      var rawDelay = parseFloat(el.style.getPropertyValue("--rd"));
      var delay = isNaN(rawDelay) ? 0 : rawDelay / 1000;

      gsap.to(el, {
        opacity: 1,
        y: 0,
        x: 0,
        scale: 1,
        filter: "blur(0px)",
        duration: 0.95,
        delay: delay,
        ease: "expo.out",
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
          once: true
        }
      });
    });
  } else if ("IntersectionObserver" in window && !reduce) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -60px 0px" }
    );

    revealEls.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }

  /* ---------- 视差 ---------- */

  var parallaxEls = Array.prototype.slice.call(
    document.querySelectorAll("[data-parallax]")
  );

  if (!reduce && parallaxEls.length && window.innerWidth > 720) {
    if (useGsap) {
      parallaxEls.forEach(function (el) {
        var speed = parseFloat(el.getAttribute("data-parallax")) || 0.06;

        gsap.to(el, {
          yPercent: -speed * 100,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.6
          }
        });
      });
    } else {
      var ticking = false;

      var update = function () {
        var y = window.scrollY || 0;

        parallaxEls.forEach(function (el) {
          var speed = parseFloat(el.getAttribute("data-parallax")) || 0.06;
          el.style.transform =
            "translate3d(0," + (y * speed).toFixed(1) + "px,0)";
        });

        ticking = false;
      };

      window.addEventListener(
        "scroll",
        function () {
          if (ticking) return;
          ticking = true;
          requestAnimationFrame(update);
        },
        { passive: true }
      );

      update();
    }
  }

  /* ---------- 状态栏 ----------
     整页唯一的「读数」装置。它取代了通用的顶部进度条,并兼作区块指示:
     滚动时报告当前区块,悬停作品/笔记时报告那一条。 */

  var rail = document.createElement("div");
  rail.className = "rail";
  rail.setAttribute("aria-hidden", "true");

  var railSec = document.createElement("span");
  railSec.className = "rail-sec";

  var railTrack = document.createElement("span");
  railTrack.className = "rail-track";

  var railFill = document.createElement("span");
  railFill.className = "rail-fill";
  railTrack.appendChild(railFill);

  var railVal = document.createElement("span");
  railVal.className = "rail-val";

  rail.appendChild(railSec);
  rail.appendChild(railTrack);
  rail.appendChild(railVal);
  document.body.appendChild(rail);

  /* 小屏上进度条收成细线(见 site.css),始终可见,不遮挡正文 */

  function tidy(text) {
    return (text || "").replace(/\s+/g, " ").trim();
  }

  /* 区块名优先取区块自己的 h2;没有 h2 就退回当前页名(取自导航的 aria-current,
     这样中英文都能自动对上,不用再维护一份词表)。 */
  var railSections = Array.prototype.slice.call(
    document.querySelectorAll("main > section")
  );

  /* 页名取自导航的 aria-current,所以中英文都能自动对上,不用再维护一份词表 */
  function railPageName() {
    var cur = document.querySelector('.site-nav a[aria-current="page"]');
    if (cur) return tidy(cur.textContent);
    /* 404 这类没有「当前页」的页面,退回 <title> 的第一段 */
    return tidy((document.title || "").split("·")[0]);
  }

  function railName(el) {
    if (!el) return "";

    var explicit = el.querySelector("[data-rail]");
    if (explicit) return tidy(explicit.textContent);

    /* 取区块自己的标题;作品/笔记卡片内部的标题不算 */
    var heads = el.querySelectorAll("h2");

    for (var i = 0; i < heads.length; i++) {
      if (!heads[i].closest(".work, .note")) return tidy(heads[i].textContent);
    }

    return "";
  }

  var railScrollSec = "";
  var railHoverSec = "";

  function renderRailSection() {
    railSec.textContent = railHoverSec || railScrollSec || railPageName() || "—";
  }

  function updateRailSection() {
    if (railHoverSec) return;

    var best = null;

    railSections.forEach(function (s) {
      if (s.getBoundingClientRect().top <= window.innerHeight * 0.45) best = s;
    });

    railScrollSec = railName(best);
    renderRailSection();
  }

  /* 指针停在作品 / 笔记上时,状态栏改报那一条 */
  document.addEventListener(
    "pointerover",
    function (e) {
      var item = e.target.closest && e.target.closest(".work, .note");
      if (!item) return;

      var title = item.querySelector("h2, h3");
      if (!title) return;

      railHoverSec = tidy(title.textContent);
      renderRailSection();
    },
    { passive: true }
  );

  document.addEventListener(
    "pointerout",
    function (e) {
      var item = e.target.closest && e.target.closest(".work, .note");
      if (!item) return;
      if (item.contains(e.relatedTarget)) return;

      railHoverSec = "";
      renderRailSection();
    },
    { passive: true }
  );

  /* ---------- 滚动量 + 导航玻璃化 ---------- */

  var header = document.querySelector(".site-header");
  var rootEl = document.documentElement;
  var pending = false;

  /* 把导航栏的实测高度写进 --header-h(含刘海安全区),
     供 scroll-padding-top / :target 使用 —— 不写死高度 */
  function syncHeaderHeight() {
    if (!header) return;

    var h = Math.round(header.getBoundingClientRect().height);
    if (h > 0) rootEl.style.setProperty("--header-h", h + "px");
  }

  function onScroll() {
    var max = document.documentElement.scrollHeight - window.innerHeight;
    var percent = max > 0 ? (window.scrollY / max) * 100 : 0;

    railFill.style.setProperty("--rp", percent.toFixed(2) + "%");
    railVal.textContent = Math.round(percent) + "%";

    if (header) header.classList.toggle("is-stuck", window.scrollY > 24);

    updateRailSection();

    pending = false;
  }

  window.addEventListener(
    "scroll",
    function () {
      if (pending) return;
      pending = true;
      requestAnimationFrame(onScroll);
    },
    { passive: true }
  );

  window.addEventListener("resize", function () {
    syncHeaderHeight();
    onScroll();
  });

  syncHeaderHeight();
  window.addEventListener("load", syncHeaderHeight);

  /* 语言切换后重新取一次区块名(标题文字会变) */
  window.__railRefresh = onScroll;

  renderRailSection();
  onScroll();
})();