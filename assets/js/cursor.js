/* =========================================================
   HX STONE · cursor.js
   自定义光标(圆点 + 延迟圆环)· 磁吸按钮
   仅在「有鼠标 + 支持 hover」的桌面设备启用。
   ========================================================= */

(function () {
  "use strict";

  var reduce =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var fine =
    window.matchMedia &&
    window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  if (reduce || !fine) return;

  var root = document.documentElement;

  var dot = document.createElement("div");
  dot.className = "cursor-dot";
  dot.setAttribute("aria-hidden", "true");

  var ring = document.createElement("div");
  ring.className = "cursor-ring";
  ring.setAttribute("aria-hidden", "true");

  document.body.appendChild(dot);
  document.body.appendChild(ring);
  root.classList.add("has-cursor");

  var mx = window.innerWidth / 2;
  var my = window.innerHeight / 2;
  var rx = mx;
  var ry = my;

  var magnetics = Array.prototype.slice.call(
    document.querySelectorAll("[data-magnetic]")
  );

  function resetMagnetics(exclude) {
    magnetics.forEach(function (el) {
      if (el !== exclude) el.style.transform = "";
    });
  }

  document.addEventListener(
    "pointermove",
    function (e) {
      mx = e.clientX;
      my = e.clientY;

      dot.style.transform = "translate3d(" + mx + "px," + my + "px,0)";

      magnetics.forEach(function (el) {
        var r = el.getBoundingClientRect();
        var cx = r.left + r.width / 2;
        var cy = r.top + r.height / 2;
        var dx = e.clientX - cx;
        var dy = e.clientY - cy;
        var dist = Math.sqrt(dx * dx + dy * dy);
        var radius = Math.max(r.width, r.height) * 0.85 + 70;

        if (dist < radius) {
          var falloff = 1 - dist / radius;
          var shiftX = dx * falloff * 0.3;
          var shiftY = dy * falloff * 0.3;

          shiftX = Math.max(-10, Math.min(10, shiftX));
          shiftY = Math.max(-8, Math.min(8, shiftY));

          el.style.transform =
            "translate3d(" + shiftX.toFixed(1) + "px," + shiftY.toFixed(1) + "px,0)";
        } else {
          el.style.transform = "";
        }
      });
    },
    { passive: true }
  );

  document.addEventListener(
    "pointerleave",
    function () {
      resetMagnetics(null);
    },
    { passive: true }
  );

  (function loop() {
    rx += (mx - rx) * 0.16;
    ry += (my - ry) * 0.16;

    ring.style.transform = "translate3d(" + rx.toFixed(1) + "px," + ry.toFixed(1) + "px,0)";

    requestAnimationFrame(loop);
  })();

  var HOT = "a, button, [data-magnetic], .work, .note, .pill, .filter";

  document.addEventListener(
    "pointerover",
    function (e) {
      if (e.target.closest && e.target.closest(HOT)) root.classList.add("cursor-hot");
    },
    { passive: true }
  );

  document.addEventListener(
    "pointerout",
    function (e) {
      if (e.target.closest && e.target.closest(HOT)) root.classList.remove("cursor-hot");
    },
    { passive: true }
  );
})();
