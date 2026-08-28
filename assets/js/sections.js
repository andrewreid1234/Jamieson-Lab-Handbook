/* ===========================================================
   Section scroll story — sections.html only.
   Depends on nav-data.js (HANDBOOK_CHAPTERS). Builds one pinned
   scroll track per category. Status, version and "updated" dates are
   read live from HANDBOOK_CHAPTERS on every load, so this page can
   never drift from the sidebar/dashboard — the only thing hand-authored
   below is which chapters group together under a stage heading, plus
   two documentation call-outs (AlphaFold3, Woody howto) that live
   outside the chapter manifest.
   =========================================================== */
(function () {
  "use strict";
  if (typeof HANDBOOK_CHAPTERS === "undefined") return;

  var EYEBROWS = { Laboratory: "Section 01", Equipment: "Section 02", Procedures: "Section 03", Computation: "Section 04" };

  // Grouping only — one entry per stage. Files not listed fall back to
  // their own single-chapter stage, so a newly added chapter always
  // shows up (ungrouped) rather than silently disappearing.
  var GROUPS = {
    Equipment: [
      { name: "Peptide synthesis", files: ["chapters/equipment-syro.html", "chapters/equipment-alstra.html", "chapters/equipment-microwave.html", "chapters/equipment-kaiser-tests.html"] },
      { name: "Chromatography & analysis", files: ["chapters/equipment-analytical-hplc.html", "chapters/equipment-lcms.html", "chapters/equipment-prep-hplc.html", "chapters/equipment-semi-prep-hplc.html", "chapters/equipment-isolera.html"] },
      { name: "Solvent removal", files: ["chapters/equipment-rotary-evaporator.html", "chapters/equipment-rotavap-cleaning.html", "chapters/equipment-chiller.html", "chapters/equipment-freeze-drying.html"] },
      { name: "Handling & measurement", files: ["chapters/equipment-desiccator.html", "chapters/equipment-nanodrop.html"] }
    ],
    Procedures: [
      { name: "Solvents", files: ["chapters/procedure-machine-solvents.html", "chapters/procedure-dry-solvents.html"] },
      { name: "Waste", files: ["chapters/procedure-chemical-waste.html"] },
      { name: "Solutions", files: ["chapters/procedure-making-solutions.html"] },
      { name: "Bench technique", files: ["chapters/procedure-balloons.html", "chapters/procedure-tlc.html"] }
    ],
    Computation: [
      { name: "Using Woody", files: ["chapters/computation-using-woody.html"], quote: "General Woody usage — connecting, storage, GPUs, environments.", src: "chapters/computation-using-woody.html" },
      { name: "Software", files: ["chapters/computation-software.html"], quote: "Short descriptions of the scientific software installed on Woody. Each tool’s full how-to guide opens as its own page.", src: "chapters/computation-software.html" },
      { name: "AlphaFold3", files: [], extra: [{ t: "AlphaFold3 — full guide", s: "draft", m: "documentation/" }], quote: "Predicts a protein’s 3D structure — or a protein bound to a peptide, macrocycle, or small molecule. Installed and verified working on Woody, including protein–macrocycle/peptidomimetic docking via SMILES.", src: "documentation/alphafold3-full-guide.html" }
    ]
  };

  function metaFor(it) {
    var v = it.version ? "v" + it.version : "";
    var label = it.status === "live" ? "Live" : it.status === "draft" ? "Draft" : "Planned";
    var parts = [label];
    if (v) parts.push(v);
    if (it.updated) parts.push(it.updated);
    return parts.join(" · ");
  }

  function buildData() {
    return HANDBOOK_CHAPTERS.map(function (sec, si) {
      var byFile = {};
      sec.items.forEach(function (it) { byFile[it.file] = it; });
      var groups = GROUPS[sec.category];
      var used = {};
      var out = [];
      if (groups) {
        groups.forEach(function (g) {
          var items = g.files.map(function (f) {
            used[f] = true;
            var it = byFile[f];
            return it ? { t: it.title, s: it.status, m: metaFor(it), file: it.file } : null;
          }).filter(Boolean);
          if (g.extra) items = items.concat(g.extra);
          out.push({ name: g.name, items: items, quote: g.quote, src: g.src });
        });
      }
      // Any chapter not claimed by a group gets its own single-item stage.
      sec.items.forEach(function (it) {
        if (used[it.file]) return;
        out.push({ name: it.title, items: [{ t: it.title, s: it.status, m: metaFor(it), file: it.file }] });
      });
      return { key: sec.category.toLowerCase(), eyebrow: EYEBROWS[sec.category] || "Section " + (si + 1), title: sec.category, blurb: sec.blurb, groups: out };
    });
  }

  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) { return ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]; }); }

  function render() {
    var host = document.getElementById("sections");
    var dots = document.getElementById("dots");
    if (!host) return;
    var DATA = buildData();
    var html = "", dotHtml = "";
    DATA.forEach(function (sec) {
      var counts = { live: 0, draft: 0, planned: 0 }, total = 0;
      sec.groups.forEach(function (g) { g.items.forEach(function (it) { counts[it.s]++; total++; }); });
      var steps = "", frames = "";
      sec.groups.forEach(function (g, gi) {
        var chaps = g.items.map(function (it, ii) {
          var linkable = it.s === "live" || it.s === "draft";
          var href = it.file ? (linkable ? it.file : "#") : (it.m === "documentation/" ? "documentation/alphafold3-full-guide.html" : "#");
          var tag = linkable || it.file || it.m === "documentation/" ? "a" : "div";
          return '<' + tag + ' class="chap" style="transition-delay:' + (140 + ii * 70) + 'ms"' + (tag === "a" ? ' href="' + esc(href) + '"' : "") + '>' +
            '<i class="dot-' + esc(it.s) + '"></i><div class="t">' + esc(it.t) + '</div><div class="m">' + esc(it.m) + "</div></" + tag + ">";
        }).join("");
        steps += '<div class="step"><div class="no">' + ("0" + (gi + 1)).slice(-2) + '</div><div><h3>' + esc(g.name) + '</h3><p>' + (g.quote ? esc(g.quote).slice(0, 60) + '…' : g.items.length + ' chapter' + (g.items.length === 1 ? '' : 's')) + '</p></div></div>';
        frames += '<div class="frame"><div class="fill"></div><div class="big">' + ("0" + (gi + 1)).slice(-2) + '</div>' +
          '<div><div class="gname">' + esc(g.name) + '</div><div class="gnote">' + esc(sec.title) + " · " + g.items.length + ' chapter' + (g.items.length === 1 ? '' : 's') + '</div></div>' +
          (g.quote ? '<div class="quote">' + esc(g.quote) + '</div><div class="src">' + esc(g.src || "") + '</div>' : '') +
          '<div class="chaps">' + chaps + '</div>' +
          '<div class="legend"><span><i class="dot-live"></i>Live</span><span><i class="dot-draft"></i>Draft</span><span><i class="dot-planned"></i>Planned</span></div></div>';
      });
      html += '<div class="sec-intro" id="' + sec.key + '">' +
        '<div><div class="eyebrow">' + esc(sec.eyebrow) + '</div><h2>' + esc(sec.title) + '</h2><p>' + esc(sec.blurb) + '</p></div>' +
        '<div class="cover glass">' +
        '<div class="row"><span>Chapters</span><b>' + total + '</b></div>' +
        '<div class="row"><span>Live</span><b>' + counts.live + '</b></div>' +
        '<div class="row"><span>Draft</span><b>' + counts.draft + '</b></div>' +
        '<div class="row"><span>Planned</span><b>' + counts.planned + '</b></div>' +
        '<div class="meter"><i style="background:var(--good);width:' + (total ? counts.live / total * 100 : 0) + '%"></i>' +
        '<i style="background:var(--amber);width:' + (total ? counts.draft / total * 100 : 0) + '%"></i>' +
        '<i style="background:var(--muted);opacity:.5;width:' + (total ? counts.planned / total * 100 : 0) + '%"></i></div>' +
        '</div></div>' +
        '<div class="track" data-sec="' + sec.key + '"><div class="stage"><div class="steps">' + steps + '</div><div class="canvas glass">' + frames + '</div></div></div>';
      dotHtml += '<a href="#' + sec.key + '" data-sec="' + sec.key + '" title="' + esc(sec.title) + '"></a>';
    });
    host.innerHTML = html;
    if (dots) dots.innerHTML = dotHtml;

    var reduce = document.documentElement.getAttribute("data-motion") === "reduce" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var tracks = [].slice.call(document.querySelectorAll(".track")).map(function (t) {
      var frames = [].slice.call(t.querySelectorAll(".frame")), steps = [].slice.call(t.querySelectorAll(".step"));
      if (!reduce) t.style.height = (frames.length * 100) + "vh";
      return { el: t, frames: frames, steps: steps, n: frames.length, cur: -1, key: t.dataset.sec };
    });
    var dotEls = dots ? [].slice.call(dots.querySelectorAll("a")) : [];
    var pbar = document.getElementById("progressBar");

    if (reduce) {
      tracks.forEach(function (tr) {
        tr.frames.forEach(function (f) { f.classList.add("on"); f.style.setProperty("--lp", 1); });
        tr.steps.forEach(function (s) { s.classList.add("on"); });
      });
      return;
    }

    var raf = null;
    function tick() {
      raf = null;
      var vh = window.innerHeight, active = null;
      tracks.forEach(function (tr) {
        var r = tr.el.getBoundingClientRect();
        if (r.bottom < 0 || r.top > vh) return;
        active = tr.key;
        var len = tr.el.offsetHeight - vh, prog = Math.min(1, Math.max(0, (-r.top) / (len || 1)));
        var f = prog * tr.n, i = Math.min(tr.n - 1, Math.floor(f)), lp = Math.min(1, f - i);
        if (i !== tr.cur) {
          tr.cur = i;
          tr.frames.forEach(function (el, ix) { el.classList.toggle("on", ix === i); });
          tr.steps.forEach(function (el, ix) { el.classList.toggle("on", ix === i); });
        }
        if (tr.frames[i]) tr.frames[i].style.setProperty("--lp", lp.toFixed(3));
      });
      dotEls.forEach(function (a) { a.classList.toggle("on", a.dataset.sec === active); });
      if (pbar) {
        var doc = document.documentElement;
        pbar.style.width = (window.scrollY / (doc.scrollHeight - vh || 1) * 100).toFixed(2) + "%";
      }
    }
    window.addEventListener("scroll", function () { if (!raf) raf = requestAnimationFrame(tick); }, { passive: true });
    window.addEventListener("resize", function () { if (!raf) raf = requestAnimationFrame(tick); });
    tick();
  }

  document.addEventListener("DOMContentLoaded", render);
})();
