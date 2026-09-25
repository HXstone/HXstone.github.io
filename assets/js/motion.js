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
  }

  /* ---------- 滚动入场 ---------- */

  var revealEls = document.querySelectorAll(".reveal");

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

  /* ---------- 顶部进度条 + 导航玻璃化 ---------- */

  var header = document.querySelector(".site-header");

  if (header) {
    var bar = document.createElement("div");
    bar.className = "scroll-progress";
    bar.setAttribute("aria-hidden", "true");
    header.appendChild(bar);

    var pending = false;

    var onScroll = function () {
      var max = document.documentElement.scrollHeight - window.innerHeight;
      var percent = max > 0 ? (window.scrollY / max) * 100 : 0;

      bar.style.setProperty("--progress", percent.toFixed(2) + "%");
      header.classList.toggle("is-stuck", window.scrollY > 24);

      pending = false;
    };

    window.addEventListener(
      "scroll",
      function () {
        if (pending) return;
        pending = true;
        requestAnimationFrame(onScroll);
      },
      { passive: true }
    );

    window.addEventListener("resize", onScroll);
    onScroll();
  }
})();
