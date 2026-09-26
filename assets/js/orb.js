/* =========================================================
   HX STONE · orb.js
   头像玻璃球:鼠标跟随倾斜
   (环绕粒子已移除,与全局粒子场重复)
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
  if (!orb || reduce || !fine) return;

  /* ---------- 鼠标跟随倾斜 ----------
     JS 逐帧写入 --rx / --ry,所以 CSS 里不再对 .orb 的 transform 做过渡。
     帧率无关:每帧按 dt 计算逼近系数。 */

  var zone = orb.closest(".hero") || orb;
  var rx = 0;
  var ry = 0;
  var trx = 0;
  var try_ = 0;
  var rafId = 0;
  var lastT = 0;

  // 60fps 下原系数 0.12 等价于 λ = -ln(1 - 0.12) * 60 ≈ 7.7
  var LAMBDA = 7.7;
  var EPS = 0.05;

  function write() {
    orb.style.setProperty("--rx", rx.toFixed(2) + "deg");
    orb.style.setProperty("--ry", ry.toFixed(2) + "deg");
  }

  function tick(now) {
    rafId = 0;

    var dt = lastT ? Math.min((now - lastT) / 1000, 0.1) : 1 / 60;
    lastT = now;

    var k = 1 - Math.exp(-LAMBDA * dt);

    rx += (trx - rx) * k;
    ry += (try_ - ry) * k;

    if (Math.abs(trx - rx) > EPS || Math.abs(try_ - ry) > EPS) {
      write();
      rafId = requestAnimationFrame(tick);
    } else {
      rx = trx;
      ry = try_;
      write();
      lastT = 0;
    }
  }

  function wake() {
    if (!rafId) rafId = requestAnimationFrame(tick);
  }

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

      wake();
    },
    { passive: true }
  );
})();
