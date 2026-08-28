/* ===========================================================
   Landing pinned walk — index.html only.
   A short, four-stage pinned scroll (one per category) between the
   hero and "recently updated", built live from HANDBOOK_CHAPTERS so
   counts/status never drift from the sidebar. Motif card grids use
   assets/js/motifs.js. Depends on nav-data.js being loaded first.
   Design-exploration "tweaks" (pace/accent/mesh/rail) from the
   Claude Design draft are intentionally not shipped — the values
   below are the chosen defaults (100vh pace, terracotta accent, full
   mesh, rail on the left).
   =========================================================== */
(function () {
  "use strict";
  if (typeof HANDBOOK_CHAPTERS === "undefined") return;
  var mount = document.getElementById("trackMount");
  if (!mount) return;

  var COLS = { Laboratory: 3, Equipment: 5, Procedures: 6, Computation: 3 };
  var SLUG = { Laboratory: "laboratory", Equipment: "equipment", Procedures: "procedures", Computation: "computation" };

  // Card label only — short enough not to overflow the motif grid.
  // Full title is still what the motif lookup, tooltip and link use.
  var SHORT = {
    "Syro II Peptide Synthesiser": "Syro II",
    "Alstra Peptide Synthesiser": "Alstra",
    "Microwave Synthesiser": "Microwave",
    "Analytical HPLC": "Analytical HPLC",
    "Preparative HPLC": "Prep HPLC",
    "Semi-Preparative HPLC": "Semi-Prep HPLC",
    "Rotary Evaporator": "Rotary Evap",
    "Rotavap Cleaning": "Rotavap Clean",
    "Freeze Drying": "Freeze Drying",
    "Laboratory Rules": "Lab Rules",
    "Machine Solvents": "Machine Solvents",
    "Chemical Waste": "Chem Waste",
    "Making Solutions": "Solutions",
    "AlphaFold3 — full guide": "AlphaFold3"
  };

  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) { return ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]; }); }

  function items(sec) {
    var out = sec.items.map(function (it) { return { t: it.title, s: it.status, m: metaFor(it), href: it.file }; });
    if (sec.category === "Computation") {
      out.push({ t: "AlphaFold3 — full guide", s: "draft", m: "Documentation", href: "documentation/alphafold3-full-guide.html" });
    }
    return out;
  }
  function metaFor(it) {
    var v = it.version ? "v" + it.version : "";
    var label = it.status === "live" ? "Live" : it.status === "draft" ? "Draft" : "Planned";
    return v && it.updated ? label + " · " + v + " · " + it.updated : label;
  }
  function counts(list) {
    var c = { live: 0, draft: 0, planned: 0 };
    list.forEach(function (it) { c[it.s]++; });
    return c;
  }
  function noteFor(c, total) {
    if (c.live) return total + " chapters · " + c.live + " live";
    if (c.draft) return total + " chapters · " + c.draft + " in draft";
    return total + " chapters · planned";
  }

  function render() {
    var steps = "", frames = "";
    HANDBOOK_CHAPTERS.forEach(function (sec, i) {
      var list = items(sec), total = list.length, c = counts(list);
      var no = ("0" + (i + 1)).slice(-2);
      steps += '<div class="step" data-i="' + i + '"><div class="no">' + no + '</div><div><h3>' + esc(sec.category) + '</h3><p>' + esc(noteFor(c, total)) + '</p></div></div>';

      var cols = COLS[sec.category] || 4;
      var cards = list.map(function (it, ii) {
        return '<a href="' + esc(it.href) + '" title="' + esc(it.t) + '" style="transition-delay:' + (140 + ii * 60) + 'ms">' + window.moBox(it.t) +
          '<div class="nm">' + esc(SHORT[it.t] || it.t) + '</div></a>';
      }).join("");

      var mkeys = [];
      if (c.live) mkeys.push('<span><i class="dot-live"></i>' + c.live + ' live</span>');
      if (c.draft) mkeys.push('<span><i class="dot-draft"></i>' + c.draft + ' draft</span>');
      if (c.planned) mkeys.push('<span><i class="dot-planned"></i>' + c.planned + ' planned</span>');
      var meterBits = ["live", "draft", "planned"].map(function (k) {
        var pct = total ? (c[k] / total * 100) : 0;
        return pct ? '<i class="dot-' + k + '" style="width:' + pct + '%"></i>' : "";
      }).join("");

      frames += '<div class="frame"><div class="fill"></div>' +
        '<div class="f-head"><div><h2 class="f-title">' + esc(sec.category) + '</h2><p class="f-blurb">' + esc(sec.blurb || "") + '</p></div><div class="no">' + no + '</div></div>' +
        '<div class="f-body"><div class="gfx"><div class="cgrid" data-c="' + cols + '">' + cards + '</div></div></div>' +
        '<div class="cap">' + esc(noteFor(c, total)) + '</div>' +
        '<div class="f-foot"><div><div class="meter">' + meterBits + '</div><div class="mkeys">' + mkeys.join("") + '</div></div>' +
        '<a class="go" href="' + (SLUG[sec.category] ? "sections.html#" + SLUG[sec.category] : "contents.html") + '">Open ' + esc(sec.category) + ' →</a></div></div>';
    });

    mount.innerHTML = '<div class="stage"><div class="steps"><div class="rail-label">Browse by section</div>' + steps + '</div><div class="canvas glass">' + frames + '</div></div>';

    var frameEls = [].slice.call(mount.querySelectorAll(".frame"));
    var stepEls = [].slice.call(mount.querySelectorAll(".step"));
    var N = frameEls.length;
    var reduce = document.documentElement.getAttribute("data-motion") === "reduce" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      window.matchMedia("(max-width: 960px)").matches;

    if (reduce) {
      frameEls.forEach(function (f) { f.classList.add("on"); f.style.setProperty("--lp", 1); });
      stepEls.forEach(function (s) { s.classList.add("on"); });
      return;
    }

    mount.style.height = (N * 100) + "vh";
    var pbar = document.getElementById("progressBar");
    var raf = null, cur = -1;
    function tick() {
      raf = null;
      var r = mount.getBoundingClientRect(), len = mount.offsetHeight - window.innerHeight;
      var prog = Math.min(1, Math.max(0, (-r.top) / (len || 1)));
      var f = prog * N, i = Math.min(N - 1, Math.floor(f)), lp = Math.min(1, f - i);
      if (i !== cur) {
        cur = i;
        frameEls.forEach(function (el, ix) { el.classList.toggle("on", ix === i); });
        stepEls.forEach(function (el, ix) { el.classList.toggle("on", ix === i); });
      }
      if (frameEls[i]) frameEls[i].style.setProperty("--lp", lp.toFixed(3));
      if (pbar) {
        var doc = document.documentElement;
        pbar.style.width = (window.scrollY / (doc.scrollHeight - window.innerHeight || 1) * 100).toFixed(2) + "%";
      }
    }
    function onScroll() { if (!raf) raf = requestAnimationFrame(tick); }
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    stepEls.forEach(function (s, ix) {
      s.addEventListener("click", function () {
        var top = mount.offsetTop + (mount.offsetHeight - window.innerHeight) * (ix + 0.5) / N;
        window.scrollTo({ top: top, behavior: "smooth" });
      });
    });
    tick();
  }

  document.addEventListener("DOMContentLoaded", render);
})();
