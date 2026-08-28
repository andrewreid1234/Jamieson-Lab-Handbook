/* ===========================================================
   Motion — Jamieson Group Laboratory Handbook (Vol 0)
   Small, purposeful glass-redesign behaviours: scroll-reveal and
   hover-tilt. Runs after nav.js (whose DOMContentLoaded handler builds
   the JS-mounted cards this file then decorates), and is a no-op
   wherever its target selectors are absent — safe to include on every
   page. Fully disabled under data-motion="reduce" or
   prefers-reduced-motion, per the reduce-motion contract already used
   by style.css.
   =========================================================== */
(function () {
  "use strict";

  function reduceMotion() {
    return document.documentElement.getAttribute("data-motion") === "reduce" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  var REVEAL_SELECTOR = ".lz-cat,.lz-stat,.dash-tile,.lz-row,.lz-resume,.ch-card,.dash-sec,.callout,.member,.grp-card";
  var TILT_SELECTOR = ".lz-cat,.ch-card";

  function initReveal() {
    var els = document.querySelectorAll(REVEAL_SELECTOR);
    if (!els.length) return;
    if (reduceMotion()) {
      els.forEach(function (el) { el.classList.add("reveal", "in"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    els.forEach(function (el, i) {
      el.classList.add("reveal");
      el.style.transitionDelay = Math.min(i % 8, 6) * 45 + "ms";
      io.observe(el);
    });
  }

  function initTilt() {
    if (reduceMotion()) return;
    var els = document.querySelectorAll(TILT_SELECTOR);
    els.forEach(function (el) {
      el.addEventListener("mousemove", function (e) {
        var r = el.getBoundingClientRect();
        var px = (e.clientX - r.left) / r.width - 0.5;
        var py = (e.clientY - r.top) / r.height - 0.5;
        el.style.setProperty("--rx", (px * 8).toFixed(2) + "deg");
        el.style.setProperty("--ry", (-py * 8).toFixed(2) + "deg");
      });
      el.addEventListener("mouseleave", function () {
        el.style.setProperty("--rx", "0deg");
        el.style.setProperty("--ry", "0deg");
      });
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    initReveal();
    initTilt();
  });

  // Pages that inject cards after DOMContentLoaded (e.g. sections.js,
  // which builds #sections from HANDBOOK_CHAPTERS) call this to reveal
  // the content that didn't exist yet on the first pass.
  window.__hbInitReveal = initReveal;

  // If reduce-motion is toggled live via the settings panel, make already
  // in-page cards visible immediately rather than waiting on scroll.
  document.addEventListener("change", function (e) {
    if (e.target && e.target.id === "motionToggle" && e.target.checked) {
      document.querySelectorAll(REVEAL_SELECTOR).forEach(function (el) {
        el.classList.add("reveal", "in");
      });
    }
  });
})();
