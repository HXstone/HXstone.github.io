/* =========================================================
   HX STONE · orb.js
   头像玻璃球:鼠标跟随倾斜 + 环绕粒子
   ========================================================= */

(function () {
  "use strict";

  var reduce =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var fine =
    window.matchMedia &&
    window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  var orb = document.querySelector("[data-orb]");
  if (!orb) return;

  /* ---------- 鼠标跟随倾斜 ---------- */

  if (!reduce && fine) {
    var zone = orb.closest(".hero") || orb;
    var rx = 0;
    var ry = 0;
    var trx = 0;
    var try_ = 0;
    var animating = false;

    var step = function () {
      rx += (trx - rx) * 0.12;
      ry += (try_ - ry) * 0.12;

      orb.style.setProperty("--rx", rx.toFixed(2) + "deg");
      orb.style.setProperty("--ry", ry.toFixed(2) + "deg");

      if (Math.abs(trx - rx) > 0.05 || Math.abs(try_ - ry) > 0.05) {
        requestAnimationFrame(step);
      } else {
        animating = false;
      }
    };

    zone.addEventListener(
      "pointermove",
      function (e) {
        var r = orb.getBoundingClientRect();
        var cx = r.left + r.width / 2;
        var cy = r.top + r.height / 2;

        var nx = (e.clientX - cx) / (window.innerWidth / 2);
        var ny = (e.clientY - cy) / (window.innerHeight / 2);

        trx = Math.max(-10, Math.min(10, -ny * 10));
        try_ = Math.max(-14, Math.min(14, nx * 14));

        if (!animating) {
          animating = true;
          requestAnimationFrame(step);
        }
      },
      { passive: true }
    );
  }

  /* ---------- 环绕粒子 ---------- */

  var canvas = orb.querySelector("[data-orb-particles]");
  if (!canvas || reduce || window.innerWidth < 720) return;

  var ctx = canvas.getContext("2d");
  var dpr = Math.min(window.devicePixelRatio || 1, 2);
  var size = 0;
  var ps = [];
  var running = true;

  function build() {
    size = canvas.clientWidth || 0;
    if (!size) return;

    canvas.width = Math.floor(size * dpr);
    canvas.height = Math.floor(size * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    ps = [];

    for (var i = 0; i < 26; i++) {
      ps.push({
        a: Math.random() * Math.PI * 2,
        rad: 0.5 + Math.random() * 0.17,
        sp: ((0.12 + Math.random() * 0.24) * (Math.random() < 0.5 ? -1 : 1)) / 90,
        r: 0.6 + Math.random() * 1.5,
        tw: Math.random() * Math.PI * 2
      });
    }
  }

  function frame() {
    if (!running) return;

    size = canvas.clientWidth || 0;
    if (!size) {
      requestAnimationFrame(frame);
      return;
    }

    var c = size / 2;
    ctx.clearRect(0, 0, size, size);

    for (var i = 0; i < ps.length; i++) {
      var p = ps[i];

      p.a += p.sp;
      p.tw += 0.028;

      var x = c + Math.cos(p.a) * p.rad * size;
      var y = c + Math.sin(p.a) * p.rad * size * 0.94;
      var alpha = 0.14 + 0.42 * (0.5 + 0.5 * Math.sin(p.tw));

      ctx.beginPath();
      ctx.fillStyle = "rgba(212,175,55," + alpha.toFixed(3) + ")";
      ctx.arc(x, y, p.r, 0, 6.2832);
      ctx.fill();
    }

    requestAnimationFrame(frame);
  }

  if ("IntersectionObserver" in window) {
    new IntersectionObserver(function (entries) {
      running = entries[0].isIntersecting;
      if (running) requestAnimationFrame(frame);
    }).observe(orb);
  }

  window.addEventListener("resize", build);

  build();
  requestAnimationFrame(frame);
})();
