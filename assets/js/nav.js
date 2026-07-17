/* Shared runtime behaviour for the Jamieson Group Laboratory Handbook.
   Depends on nav-data.js being loaded first (defines HANDBOOK_CHAPTERS).
   Include on every page: <div id="sidebarMount"></div> inside <nav class="sidebar" id="sidebar">. */

(function () {
  function currentFile() {
    const path = window.location.pathname;
    return path.substring(path.lastIndexOf("/") + 1) || "index.html";
  }

  function pathFromRoot(file) {
    // Chapter pages live one level down in /chapters/, so links to other
    // chapters are relative, but links back to root files need "../".
    const onChapterPage = currentFile() !== "index.html" && window.location.pathname.includes("/chapters/");
    if (!onChapterPage) return file;
    if (file === "index.html") return "../index.html";
    return file.startsWith("chapters/") ? file.substring("chapters/".length) : "../" + file;
  }

  function buildSidebar() {
    const mount = document.getElementById("sidebarMount");
    if (!mount || typeof HANDBOOK_CHAPTERS === "undefined") return;

    const active = currentFile();
    let html = '<input class="nav-search" id="navSearch" type="search" placeholder="Search chapters…" aria-label="Search chapters">';
    html += `<a class="nav-link${active === "index.html" ? " active" : ""}" href="${pathFromRoot("index.html")}"><span class="num">→</span>Home</a>`;
    html += '<div class="nav-divider"></div>';

    HANDBOOK_CHAPTERS.forEach(section => {
      html += `<div class="toc-heading">${section.category}</div>`;
      section.items.forEach(item => {
        const file = item.file.startsWith("chapters/") ? item.file.substring("chapters/".length) : item.file;
        const isActive = file === active;
        const isLinkable = item.status === "live" || item.status === "draft";
        const href = pathFromRoot(item.file);
        const classes = ["nav-link"];
        if (isActive) classes.push("active");
        if (!isLinkable) classes.push("disabled");
        const pill = item.status === "draft" ? '<span class="status-pill draft">Draft</span>'
          : item.status === "live" ? ""
          : '<span class="status-pill">Planned</span>';
        html += `<a class="${classes.join(" ")}" data-title="${item.title.toLowerCase()}" ${isLinkable ? `href="${href}"` : 'href="#" tabindex="-1" aria-disabled="true"'}${isActive ? ' aria-current="page"' : ""}>${item.title}${pill}</a>`;
      });
    });

    mount.innerHTML = html;

    const search = document.getElementById("navSearch");
    if (search) {
      search.addEventListener("input", () => {
        const q = search.value.trim().toLowerCase();
        mount.querySelectorAll(".nav-link[data-title]").forEach(link => {
          link.style.display = link.dataset.title.includes(q) ? "" : "none";
        });
      });
    }
  }

  function buildCategoryGrid() {
    const mount = document.getElementById("categoryGridMount");
    if (!mount || typeof HANDBOOK_CHAPTERS === "undefined") return;

    let html = "";
    HANDBOOK_CHAPTERS.forEach(section => {
      html += `<div class="category-card"><h3>${section.category}</h3><ul class="category-chapter-list">`;
      section.items.forEach(item => {
        const isLinkable = item.status === "live" || item.status === "draft";
        html += isLinkable
          ? `<li><a class="chapter-chip${item.status === "draft" ? " draft" : ""}" href="${pathFromRoot(item.file)}">${item.title}${item.status === "draft" ? " · Draft" : ""}</a></li>`
          : `<li><span class="chapter-chip planned">${item.title}</span></li>`;
      });
      html += "</ul></div>";
    });
    mount.innerHTML = html;
  }

  function initProgressBar() {
    const bar = document.getElementById("progressBar");
    if (!bar) return;
    function update() {
      const h = document.documentElement;
      const scrolled = (h.scrollTop) / (h.scrollHeight - h.clientHeight || 1) * 100;
      bar.style.width = scrolled + "%";
    }
    document.addEventListener("scroll", update);
    update();
  }

  function initMobileSidebar() {
    const sidebar = document.getElementById("sidebar");
    const btn = document.getElementById("hamburgerBtn");
    if (!sidebar || !btn) return;
    btn.addEventListener("click", () => sidebar.classList.toggle("open"));
    sidebar.addEventListener("click", e => {
      if (e.target.closest(".nav-link:not(.disabled)")) sidebar.classList.remove("open");
    });
  }

  function initScrollspy() {
    const sections = document.querySelectorAll("section.doc-section[id]");
    const navLinks = document.querySelectorAll(".nav-link[href^='#']");
    if (!sections.length || !navLinks.length) return;
    const spy = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");
          navLinks.forEach(l => l.classList.toggle("active", l.getAttribute("href") === "#" + id));
        }
      });
    }, { rootMargin: "-15% 0px -70% 0px" });
    sections.forEach(s => spy.observe(s));
  }

  window.copyBlock = function (btn) {
    const pre = btn.closest(".code-block").querySelector("pre code");
    const text = pre.innerText;
    navigator.clipboard.writeText(text).then(() => {
      const original = btn.textContent;
      btn.textContent = "Copied";
      setTimeout(() => (btn.textContent = original), 1400);
    });
  };

  document.addEventListener("DOMContentLoaded", () => {
    buildSidebar();
    buildCategoryGrid();
    initProgressBar();
    initMobileSidebar();
    initScrollspy();
  });
})();
