/* =========================================================
   HX STONE · hxos.js
   HX OS 面板:进度条填充 + 数字滚动 + 日志逐行输出
   ========================================================= */

(function () {
  "use strict";

  var os = document.querySelector("[data-os]");
  if (!os) return;

  var reduce =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var bars = os.querySelectorAll(".meter-bar[data-value]");
  var lines = os.querySelectorAll(".os-log .line");
  var started = false;

  function countUp(el, target, duration) {
    if (reduce) {
      el.textContent = target + "%";
      return;
    }

    var start = null;

    function tick(now) {
      if (start === null) start = now;

      var t = Math.min(1, (now - start) / duration);
      var eased = 1 - Math.pow(1 - t, 4);

      el.textContent = Math.round(target * eased) + "%";

      if (t < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  }

  function run() {
    if (started) return;
    started = true;

    bars.forEach(function (bar, i) {
      var value = parseFloat(bar.getAttribute("data-value")) || 0;
      var meter = bar.closest(".meter");
      var out = meter ? meter.querySelector(".meter-val") : null;

      setTimeout(function () {
        bar.style.width = value + "%";
        if (out) countUp(out, value, 1500);
      }, 130 * i);
    });

    lines.forEach(function (line, i) {
      setTimeout(function () {
        line.classList.add("on");
      }, 420 + i * 300);
    });
  }

  /* 数字先归零(JS 不在时 HTML 里显示的是真实值) */
  bars.forEach(function (bar) {
    var meter = bar.closest(".meter");
    var out = meter ? meter.querySelector(".meter-val") : null;
    if (out && !reduce) out.textContent = "0%";
    if (!reduce) bar.style.width = "0%";
  });

  if (reduce || !("IntersectionObserver" in window)) {
    bars.forEach(function (bar) {
      bar.style.width = (parseFloat(bar.getAttribute("data-value")) || 0) + "%";
    });
    lines.forEach(function (line) {
      line.classList.add("on");
    });
    return;
  }

  var observer = new IntersectionObserver(
    function (entries) {
      if (entries[0].isIntersecting) {
        run();
        observer.disconnect();
      }
    },
    { threshold: 0.25 }
  );

  observer.observe(os);
})();
