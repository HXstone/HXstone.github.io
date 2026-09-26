/* =========================================================
   HX STONE · background.js
   粒子场 · 网格微视差
   (跟随鼠标的柔光层已移除,其作用与网格视差 + 粒子场重叠)
   ========================================================= */

(function () {
  "use strict";

  var reduce =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var canHover =
    window.matchMedia && window.matchMedia("(hover: hover)").matches;

  var grid = document.querySelector(".bg-grid");

  /* ---------- 网格微视差 ----------
     帧率无关:每帧按 dt 计算逼近系数,120Hz / 60Hz 手感一致。 */

  if (grid && canHover && !reduce) {
    var gx = 0;
    var gy = 0;
    var tx = 0;
    var ty = 0;
    var animating = false;
    var lastT = 0;

    // 60fps 下原系数 0.08 等价于 λ = -ln(1 - 0.08) * 60 ≈ 5.0
    var LAMBDA = 5.0;
    var EPS = 0.2;

    function write() {
      grid.style.setProperty("--bgx", gx.toFixed(1) + "px");
      grid.style.setProperty("--bgy", gy.toFixed(1) + "px");
    }

    function step(now) {
      var dt = lastT ? Math.min((now - lastT) / 1000, 0.1) : 1 / 60;
      lastT = now;

      var k = 1 - Math.exp(-LAMBDA * dt);

      gx += (tx - gx) * k;
      gy += (ty - gy) * k;

      if (Math.abs(tx - gx) > EPS || Math.abs(ty - gy) > EPS) {
        write();
        requestAnimationFrame(step);
      } else {
        gx = tx;
        gy = ty;
        write();
        animating = false;
        lastT = 0;
      }
    }

    window.addEventListener(
      "pointermove",
      function (e) {
        var w = window.innerWidth;
        var h = window.innerHeight;

        tx = (e.clientX / w - 0.5) * -22;
        ty = (e.clientY / h - 0.5) * -22;

        if (!animating) {
          animating = true;
          requestAnimationFrame(step);
        }
      },
      { passive: true }
    );
  }

  /* ---------- 粒子场 ---------- */

  var canvas = document.querySelector(".bg-canvas");

  if (!canvas || reduce) return;

  var ctx = canvas.getContext("2d");
  var dpr = Math.min(window.devicePixelRatio || 1, 2);
  var w = 0;
  var h = 0;
  var parts = [];
  var running = !document.hidden;
  var rafId = 0;

  function build() {
    var count = w < 720 ? 26 : 68;
    parts = [];

    for (var i = 0; i < count; i++) {
      parts.push({
        x: Math.random() * w,
        y: Math.random() * h,
        r: 0.4 + Math.random() * 1.3,
        vx: (Math.random() - 0.5) * 0.1,
        vy: -(0.04 + Math.random() * 0.16),
        a: 0.1 + Math.random() * 0.35,
        tw: Math.random() * Math.PI * 2
      });
    }
  }

  function resize() {
    w = window.innerWidth;
    h = window.innerHeight;

    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    canvas.style.width = w + "px";
    canvas.style.height = h + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    build();
  }

  function frame() {
    rafId = 0;
    if (!running) return;

    ctx.clearRect(0, 0, w, h);

    for (var i = 0; i < parts.length; i++) {
      var p = parts[i];

      p.x += p.vx;
      p.y += p.vy;
      p.tw += 0.016;

      if (p.y < -14) {
        p.y = h + 14;
        p.x = Math.random() * w;
      }

      if (p.x < -14) p.x = w + 14;
      else if (p.x > w + 14) p.x = -14;

      var alpha = p.a * (0.55 + 0.45 * Math.sin(p.tw));

      ctx.beginPath();
      ctx.fillStyle = "rgba(212,175,55," + alpha.toFixed(3) + ")";
      ctx.arc(p.x, p.y, p.r, 0, 6.2832);
      ctx.fill();
    }

    rafId = requestAnimationFrame(frame);
  }

  /* 单循环守卫:标签页可见性来回切换时不会叠出第二条循环 */
  function start() {
    if (!rafId && running) rafId = requestAnimationFrame(frame);
  }

  document.addEventListener("visibilitychange", function () {
    running = !document.hidden;
    start();
  });

  window.addEventListener("resize", resize);

  resize();
  start();
})();
