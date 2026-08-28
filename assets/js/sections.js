/* ===========================================================
   Sections — sections.html only.
   Depends on nav-data.js (HANDBOOK_CHAPTERS). Builds a static
   two-up grid of group cards per category (v2: no pinned scroll —
   that mechanic lives on the landing page instead, see
   assets/js/landing-scroll.js). Status, version and "updated" dates
   are read live from HANDBOOK_CHAPTERS on every load, so this page
   can never drift from the sidebar/dashboard — the only thing
   hand-authored below is which chapters group together under a card
   heading, plus the Computation section's two documentation quotes
   (AlphaFold3, Woody) that live outside the chapter manifest.
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

  // v2: static — no pinned scroll. Each section is an intro strip
  // (real chapter/status counts) plus a two-up grid of group cards,
  // revealed on scroll like the rest of the site (assets/js/motion.js).
  function render() {
    var host = document.getElementById("sections");
    var dots = document.getElementById("dots");
    if (!host) return;
    var DATA = buildData();
    var html = "", dotHtml = "";
    DATA.forEach(function (sec) {
      var counts = { live: 0, draft: 0, planned: 0 }, total = 0;
      sec.groups.forEach(function (g) { g.items.forEach(function (it) { counts[it.s]++; total++; }); });
      var cards = sec.groups.map(function (g) {
        var chaps = g.items.map(function (it) {
          var linkable = it.s === "live" || it.s === "draft" || !!it.file;
          var href = it.file || (it.m === "documentation/" ? "documentation/alphafold3-full-guide.html" : "#");
          var tag = linkable ? "a" : "div";
          return '<' + tag + ' class="chap"' + (tag === "a" ? ' href="' + esc(href) + '"' : "") + '>' +
            '<i class="dot-' + esc(it.s) + '"></i><div class="t">' + esc(it.t) + '</div><div class="m">' + esc(it.m) + "</div></" + tag + ">";
        }).join("");
        return '<div class="grp-card glass reveal">' +
          '<div class="gname">' + esc(g.name) + '</div>' +
          '<div class="gnote">' + esc(sec.title) + " · " + g.items.length + ' chapter' + (g.items.length === 1 ? '' : 's') + '</div>' +
          (g.quote ? '<div class="quote">' + esc(g.quote) + '</div><div class="src">' + esc(g.src || "") + '</div>' : '') +
          '<div class="chaps">' + chaps + '</div></div>';
      }).join("");
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
        '<div class="grp-grid" style="max-width:1100px;margin:0 auto 10vh;padding:0 34px;">' + cards + '</div>';
      dotHtml += '<a href="#' + sec.key + '" data-sec="' + sec.key + '" title="' + esc(sec.title) + '"></a>';
    });
    host.innerHTML = html;
    if (dots) dots.innerHTML = dotHtml;

    // Section dot-nav still tracks which section is in view, via a
    // lightweight IntersectionObserver (no scroll-linked frame math —
    // that pinned mechanic was v1-only, see CHANGES.md).
    var dotEls = dots ? [].slice.call(dots.querySelectorAll("a")) : [];
    if (dotEls.length) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            dotEls.forEach(function (a) { a.classList.toggle("on", a.getAttribute("href") === "#" + e.target.id); });
          }
        });
      }, { rootMargin: "-40% 0px -50% 0px" });
      document.querySelectorAll(".sec-intro[id]").forEach(function (el) { io.observe(el); });
    }

    // Newly-rendered .grp-card / .reveal elements need motion.js's
    // reveal pass re-run — it only ran once, before this content existed.
    if (window.__hbInitReveal) window.__hbInitReveal();
  }

  document.addEventListener("DOMContentLoaded", render);
})();
