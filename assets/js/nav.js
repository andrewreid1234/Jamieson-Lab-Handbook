/* ===========================================================
   Shared runtime — Jamieson Group Laboratory Handbook (Vol 0)
   Depends on nav-data.js (HANDBOOK_CHAPTERS + HANDBOOK_META).

   Each page includes whichever mount points it needs; every
   builder is a no-op if its mount is absent, so the same
   script drives landing, contents and chapter pages.

   Mounts:
     #sidebarMount    sidebar nav      (contents + chapters)
     #statMount       stat strip/tiles (landing + contents)
     #catMount        category cards   (landing)
     #recentMount     recently updated (landing)
     #resumeMount     continue-reading (landing)
     #dashMount       chapter cards    (contents)
     #onThisMount     on-this-page TOC (chapters)
     #prevNextMount   prev/next links  (chapters)
   =========================================================== */
(function () {
  "use strict";

  var STATUS = {
    live:    { pill: "Live",    label: "Published", cls: "live" },
    draft:   { pill: "Draft",   label: "Draft",     cls: "draft" },
    planned: { pill: "Planned", label: "Planned",   cls: "planned" }
  };

  function currentFile() {
    var p = window.location.pathname;
    return p.substring(p.lastIndexOf("/") + 1) || "index.html";
  }
  function onChapterPage() {
    return window.location.pathname.indexOf("/chapters/") !== -1;
  }
  // Resolve a manifest file path relative to the CURRENT page.
  function href(file) {
    if (!onChapterPage()) return file;                       // root page
    if (file.indexOf("chapters/") === 0) return file.substring("chapters/".length);
    return "../" + file;                                     // e.g. index.html -> ../index.html
  }
  function rootHref(file) { return onChapterPage() ? "../" + file : file; }

  function flatItems() {
    var out = [];
    HANDBOOK_CHAPTERS.forEach(function (sec) {
      sec.items.forEach(function (it) { out.push(Object.assign({ category: sec.category }, it)); });
    });
    return out;
  }
  function isLinkable(s) { return s === "live" || s === "draft"; }
  function fmtMeta(it) {
    var v = it.version ? "v" + it.version : "";
    var s = STATUS[it.status].label;
    return v ? v + " · " + s : s;
  }
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) { return ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]; }); }

  /* ---------------- sidebar ---------------- */
  function slugify(s) { return String(s).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""); }

  function getSidebarCats() {
    try { return JSON.parse(localStorage.getItem("hbSidebarCats") || "[]"); } catch (e) { return []; }
  }
  function saveSidebarCats(arr) {
    try { localStorage.setItem("hbSidebarCats", JSON.stringify(arr)); } catch (e) {}
  }

  function buildSidebar() {
    var mount = document.getElementById("sidebarMount");
    if (!mount || typeof HANDBOOK_CHAPTERS === "undefined") return;
    var active = currentFile();
    var savedCats = getSidebarCats();
    var html = "";
    var homeActive = active === "contents.html" ? " active" : "";
    html += '<a class="nav-link home' + homeActive + '" href="' + rootHref("contents.html") + '"><span class="ic">\u25A4</span><span class="nm">Home</span></a>';

    HANDBOOK_CHAPTERS.forEach(function (sec) {
      var slug = slugify(sec.category);
      var linkableCount = sec.items.filter(function (i) { return isLinkable(i.status); }).length;
      var containsActive = sec.items.some(function (it) {
        var file = it.file.indexOf("chapters/") === 0 ? it.file.substring("chapters/".length) : it.file;
        return file === active;
      });
      var open = (containsActive || savedCats.indexOf(slug) !== -1) ? " open" : "";
      html += '<button type="button" class="sb-cat' + open + '" data-cat="' + slug + '" aria-expanded="' + (containsActive ? "true" : "false") + '">' +
        '<span class="chev">\u25B8</span><span class="nm">' + esc(sec.category) + '</span>' +
        '<span class="ct">' + linkableCount + "/" + sec.items.length + "</span></button>";
      html += '<div class="sb-cat-items' + open + '" data-cat="' + slug + '">';
      sec.items.forEach(function (it) {
        var file = it.file.indexOf("chapters/") === 0 ? it.file.substring("chapters/".length) : it.file;
        var isActive = file === active;
        var linkable = isLinkable(it.status);
        var st = STATUS[it.status];
        var cls = "nav-link" + (isActive ? " active" : "") + (linkable ? "" : " disabled");
        var pill = it.status === "live" ? "" : '<span class="pill pill-' + st.cls + '">' + st.pill + "</span>";
        var attrs = linkable ? 'href="' + href(it.file) + '"' : 'href="#" tabindex="-1" aria-disabled="true"';
        html += '<a class="' + cls + '" data-title="' + esc(it.title.toLowerCase()) + '" ' + attrs + (isActive ? ' aria-current="page"' : "") +
          '><span class="nm">' + esc(it.title) + "</span>" + pill + "</a>";
      });
      html += "</div>";
    });
    mount.innerHTML = html;

    mount.querySelectorAll(".sb-cat").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var items = mount.querySelector('.sb-cat-items[data-cat="' + btn.dataset.cat + '"]');
        var willOpen = !btn.classList.contains("open");
        btn.classList.toggle("open", willOpen);
        if (items) items.classList.toggle("open", willOpen);
        btn.setAttribute("aria-expanded", willOpen ? "true" : "false");
        var cats = getSidebarCats();
        var i = cats.indexOf(btn.dataset.cat);
        if (willOpen && i === -1) cats.push(btn.dataset.cat);
        if (!willOpen && i !== -1) cats.splice(i, 1);
        saveSidebarCats(cats);
      });
    });

    var search = mount.parentNode.querySelector("#navSearch");
    if (search) {
      search.addEventListener("input", function () {
        var q = search.value.trim().toLowerCase();
        mount.classList.toggle("searching", q !== "");
        mount.querySelectorAll(".nav-link[data-title]").forEach(function (l) {
          l.style.display = l.dataset.title.indexOf(q) !== -1 ? "" : "none";
        });
      });
    }
  }

  /* ---------------- stats (landing strip + dashboard tiles) ---------------- */
  function counts() {
    var all = flatItems();
    return {
      published: all.filter(function (i) { return i.status === "live"; }).length,
      draft: all.filter(function (i) { return i.status === "draft"; }).length,
      planned: all.filter(function (i) { return i.status === "planned"; }).length,
      total: all.length,
      sections: HANDBOOK_CHAPTERS.length
    };
  }
  function buildStats() {
    var mount = document.getElementById("statMount");
    if (!mount) return;
    var c = counts();
    var tile = mount.dataset.style === "tile";
    var data = [
      { l: "Published", v: c.published }, { l: "In draft", v: c.draft },
      { l: "Planned", v: c.planned }, { l: "Sections", v: c.sections }
    ];
    mount.innerHTML = data.map(function (d) {
      return tile
        ? '<div class="dash-tile"><div class="k">' + d.l + '</div><div class="v">' + d.v + "</div></div>"
        : '<div class="lz-stat"><div class="n">' + d.v + '</div><div class="l">' + d.l + "</div></div>";
    }).join("");
  }

  /* ---------------- landing: category cards ---------------- */
  function buildCats() {
    var mount = document.getElementById("catMount");
    if (!mount) return;
    mount.innerHTML = HANDBOOK_CHAPTERS.map(function (sec) {
      var live = sec.items.filter(function (i) { return isLinkable(i.status); }).length;
      var pct = Math.max(3, Math.round((live / sec.items.length) * 100));
      return '<a class="lz-cat" href="' + rootHref("contents.html") + '#" >' +
        '<div class="top"><span class="nm">' + esc(sec.category) + '</span>' +
        '<span class="ct">' + live + " / " + sec.items.length + "</span></div>" +
        '<div class="ds">' + esc(sec.blurb || "") + "</div>" +
        '<div class="bar"><i style="width:' + pct + '%"></i></div></a>';
    }).join("");
  }

  function recencyRank(it) { return (it.status === "live" ? 2 : it.status === "draft" ? 1 : 0); }
  function byRecent(a, b) {
    if (a.updated !== b.updated) return a.updated < b.updated ? 1 : -1; // newest first
    return recencyRank(b) - recencyRank(a);                            // tie: live before draft
  }

  /* ---------------- landing: recently updated ---------------- */
  function buildRecent() {
    var mount = document.getElementById("recentMount");
    if (!mount) return;
    var rows = flatItems()
      .filter(function (i) { return i.updated; })
      .sort(byRecent)
      .slice(0, 5);
    mount.innerHTML = rows.map(function (it) {
      return '<a class="lz-row" href="' + rootHref(it.file) + '">' +
        '<span class="dot dot-' + STATUS[it.status].cls + '"></span>' +
        '<div class="t"><div class="nm">' + esc(it.title) + '</div><div class="c">' + esc(it.category) + "</div></div>" +
        '<span class="meta">v' + esc(it.version) + " · " + esc(it.updated) + "</span></a>";
    }).join("") || '<div class="lz-row"><div class="t"><div class="c">No chapters published yet.</div></div></div>';
  }

  /* ---------------- landing: continue reading (most recent live/draft) ---------------- */
  function buildResume() {
    var mount = document.getElementById("resumeMount");
    if (!mount) return;
    var last = flatItems().filter(function (i) { return i.updated && isLinkable(i.status); })
      .sort(byRecent)[0];
    if (!last) { mount.style.display = "none"; return; }
    mount.setAttribute("href", rootHref(last.file));
    mount.innerHTML =
      '<div class="b"><div class="k">Continue reading</div>' +
      '<div class="t">' + esc(last.title) + "</div>" +
      '<div class="m">' + esc(last.category) + " · v" + esc(last.version) + " · updated " + esc(last.updated) + "</div></div>" +
      '<span class="go">Open \u2192</span>';
  }

  /* ---------------- contents: chapter-card dashboard ---------------- */
  function buildDashboard() {
    var mount = document.getElementById("dashMount");
    if (!mount) return;
    mount.innerHTML = HANDBOOK_CHAPTERS.map(function (sec) {
      var live = sec.items.filter(function (i) { return isLinkable(i.status); }).length;
      var cards = sec.items.map(function (it) {
        var linkable = isLinkable(it.status);
        var st = STATUS[it.status];
        var pill = '<span class="pill pill-' + st.cls + '">' + st.pill + "</span>";
        var inner =
          '<span class="dot dot-' + st.cls + '"></span>' +
          '<div class="b"><div class="nm">' + esc(it.title) + '</div><div class="m">' + fmtMeta(it) + "</div></div>" + pill;
        return linkable
          ? '<a class="ch-card linkable" href="' + rootHref(it.file) + '">' + inner + "</a>"
          : '<div class="ch-card planned">' + inner + "</div>";
      }).join("");
      return '<div class="dash-sec"><span class="h">' + esc(sec.category) + '</span><span class="c">' + live + " / " + sec.items.length + " documented</span></div>" +
        '<div class="dash-grid">' + cards + "</div>";
    }).join("");
  }

  /* ---------------- chapter: on-this-page + scrollspy ---------------- */
  function buildOnThis() {
    var mount = document.getElementById("onThisMount");
    if (!mount) return;
    var heads = document.querySelectorAll(".article h2[id]");
    if (!heads.length) { mount.closest(".onthis") && (mount.closest(".onthis").style.display = "none"); return; }
    var html = '<div class="sticky"><div class="h">On this page</div>';
    heads.forEach(function (h) { html += '<a href="#' + h.id + '">' + esc(h.textContent) + "</a>"; });
    html += "</div>";
    mount.innerHTML = html;

    var links = mount.querySelectorAll("a");
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          links.forEach(function (l) { l.classList.toggle("active", l.getAttribute("href") === "#" + e.target.id); });
        }
      });
    }, { rootMargin: "-15% 0px -75% 0px" });
    heads.forEach(function (h) { spy.observe(h); });
  }

  /* ---------------- chapter: prev / next ---------------- */
  function buildPrevNext() {
    var mount = document.getElementById("prevNextMount");
    if (!mount) return;
    var all = flatItems();
    var active = currentFile();
    var idx = all.findIndex(function (i) {
      var f = i.file.indexOf("chapters/") === 0 ? i.file.substring("chapters/".length) : i.file;
      return f === active;
    });
    if (idx === -1) return;
    // Skip "planned" (non-linkable) neighbours so prev/next never points at an unwritten chapter.
    var prev = null;
    for (var p = idx - 1; p >= 0; p--) { if (isLinkable(all[p].status)) { prev = all[p]; break; } }
    var next = null;
    for (var n = idx + 1; n < all.length; n++) { if (isLinkable(all[n].status)) { next = all[n]; break; } }
    var html = "";
    html += prev
      ? '<a href="' + href(prev.file) + '"><div class="k">\u2190 Previous</div><div class="t">' + esc(prev.title) + "</div></a>"
      : "<span></span>";
    html += next
      ? '<a class="next" href="' + href(next.file) + '"><div class="k">Next \u2192</div><div class="t">' + esc(next.title) + "</div></a>"
      : "<span></span>";
    mount.innerHTML = html;
  }

  /* ---------------- misc ---------------- */
  function initProgress() {
    var bar = document.getElementById("progressBar");
    if (!bar) return;
    var inner = document.querySelector(".content");
    // Whichever element actually overflows is the scroller (window on most pages).
    function scroller() {
      if (inner && inner.scrollHeight > inner.clientHeight + 4) return inner;
      return document.scrollingElement || document.documentElement;
    }
    function update() {
      var el = scroller();
      var h = el.scrollHeight - el.clientHeight || 1;
      bar.style.width = (el.scrollTop / h) * 100 + "%";
    }
    window.addEventListener("scroll", update, { passive: true });
    if (inner) inner.addEventListener("scroll", update, { passive: true });
    update();
  }
  function initMobile() {
    var sb = document.getElementById("sidebar"), btn = document.getElementById("hamburgerBtn");
    if (!sb || !btn) return;
    btn.addEventListener("click", function () { sb.classList.toggle("open"); });
    sb.addEventListener("click", function (e) { if (e.target.closest(".nav-link:not(.disabled)")) sb.classList.remove("open"); });
  }
  function initSettings() {
    var btn = document.getElementById("settingsBtn");
    var panel = document.getElementById("settingsPanel");
    if (!btn || !panel) return;

    var THEME_KEY = "hbTheme", FONT_KEY = "hbFontSize", MOTION_KEY = "hbMotion";
    function get(key, def) { try { var v = localStorage.getItem(key); return v == null ? def : v; } catch (e) { return def; } }
    function set(key, val) { try { localStorage.setItem(key, val); } catch (e) {} }

    function applyTheme(v) {
      if (v === "dark" || v === "light") document.documentElement.setAttribute("data-theme", v);
      else document.documentElement.removeAttribute("data-theme");
    }
    function applyFont(v) {
      if (v && v !== "medium") document.documentElement.setAttribute("data-font", v);
      else document.documentElement.removeAttribute("data-font");
    }
    function applyMotion(v) {
      if (v === "reduce") document.documentElement.setAttribute("data-motion", "reduce");
      else document.documentElement.removeAttribute("data-motion");
    }
    function syncSeg(name, value) {
      panel.querySelectorAll('.seg[data-setting="' + name + '"] button').forEach(function (b) {
        b.classList.toggle("active", b.dataset.value === value);
      });
    }

    var theme = get(THEME_KEY, "light");
    var font = get(FONT_KEY, "medium");
    var motion = get(MOTION_KEY, "");
    syncSeg("theme", theme);
    syncSeg("font", font);
    var motionInput = panel.querySelector("#motionToggle");
    if (motionInput) motionInput.checked = motion === "reduce";

    panel.querySelectorAll('.seg[data-setting="theme"] button').forEach(function (b) {
      b.addEventListener("click", function () {
        set(THEME_KEY, b.dataset.value); applyTheme(b.dataset.value); syncSeg("theme", b.dataset.value);
      });
    });
    panel.querySelectorAll('.seg[data-setting="font"] button').forEach(function (b) {
      b.addEventListener("click", function () {
        set(FONT_KEY, b.dataset.value); applyFont(b.dataset.value); syncSeg("font", b.dataset.value);
      });
    });
    if (motionInput) {
      motionInput.addEventListener("change", function () {
        var v = motionInput.checked ? "reduce" : "";
        set(MOTION_KEY, v); applyMotion(v);
      });
    }

    // Closing via Escape or an outside click can leave focus on a now-hidden
    // (display:none) control inside the panel, which drops focus to <body>.
    // Return it to the settings button whenever that's the case.
    function closePanel() {
      if (panel.hidden) return;
      var focusWasInside = panel.contains(document.activeElement);
      panel.hidden = true;
      if (focusWasInside) btn.focus();
    }

    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      panel.hidden = !panel.hidden;
    });
    document.addEventListener("click", function (e) {
      if (!panel.hidden && !panel.contains(e.target) && e.target !== btn) closePanel();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closePanel();
    });
  }

  window.copyBlock = function (btn) {
    var code = btn.closest(".code-block").querySelector("pre code");
    navigator.clipboard.writeText(code.innerText).then(function () {
      var t = btn.textContent; btn.textContent = "Copied"; setTimeout(function () { btn.textContent = t; }, 1400);
    });
  };

  document.addEventListener("DOMContentLoaded", function () {
    buildSidebar();
    buildStats();
    buildCats();
    buildRecent();
    buildResume();
    buildDashboard();
    buildOnThis();
    buildPrevNext();
    initProgress();
    initMobile();
    initSettings();
  });
})();
