# Changelog

Single source of truth for what changed in the handbook and when — one row per commit, traceable to the real push. Chapter pages no longer carry their own "Revision history" section; this file replaces it.

Regenerate the commit list anytime with:

```
git log --pretty=format:'%h|%ad|%s' --date=format:'%Y-%m-%d %H:%M' --reverse
```

## 2026-07-17

| Time | Commit | Change |
|---|---|---|
| 17:03 | `d83345e` | Initial commit — laboratory handbook project structure. |
| 17:17 | `2790570` | Added a CNAME file for a custom GitHub Pages domain. |
| 17:18 | `0d0f144` | Removed the CNAME file, reverting to the default GitHub Pages domain. |
| 17:23 | `31ecfb4` | Added the project README. |
| 17:27 | `3e50d54` | Added project documentation: design tool notes, the original project prompt, and a maintenance guide. |
| 17:31 | `14be95a` | Built the handbook foundation — shared stylesheet, navigation script, chapter template, and home page. |
| 17:40 | `de881c9` | Added a draft-status pill, a "todo" callout style, and accessibility basics (skip link, focus-visible outlines). |
| 17:52 | `d9464d5` | Added the first chapter, Syro II Peptide Synthesiser, as a draft. |
| 17:56 | `96bde8e` | Resolved the one open question flagged in the Syro chapter (DMF line-priming reservoir). |
| 17:58 | `9d9da09` | Published the Syro II chapter as the handbook's first live chapter. |
| 18:08 | `ea9bcdd` | Added a collapsible sidebar. |
| 21:35 | `fcabd98` | Added the Laboratory Introduction chapter, as a draft. |
| 21:47 | `0a9cbb4` | Added the Laboratory Rules chapter, as a draft. |
| 23:39 | `d217d06` | Added the Laboratory Safety chapter, as a draft. |
| 23:42 | `2a3f8c6` | Added a reusable interview question bank for drafting future chapters. |
| 23:42 | `86e47fd` | Made the homepage search box also filter the category grid, not just the chapter list. |
| 23:44 | `c293803` | Removed thin "Purpose" sections from the Introduction and Safety drafts — folded their one useful line into the quick summary instead. |
| 23:48 | `cca7d7d` | Merged a background-agent worktree branch into main. |
| 23:48 | `2b72b6e` | Merged a second background-agent worktree branch into main. |

## 2026-07-18

| Time | Commit | Change |
|---|---|---|
| 10:18 | `56fc850` | Fixed the print stylesheet — hid sidebar-toggle chrome and preserved cover-page contrast when printing. |
| 10:18 | `e8176c5` | Merged a third background-agent worktree branch into main. |
| 10:18 | `b8fb91e` | Scaffolded 20 planned Equipment/Procedures chapters as empty structural shells (no invented content). |
| 10:19 | `b36d08e` | Merged a fourth background-agent worktree branch into main. |
| 10:27 | `f726d63` | Added Troubleshooting sections to the Analytical HPLC and LCMS chapters, adapted from Shimadzu's manufacturer guides. |
| 10:56 | `7d96a4a` | Shipped design system v2 — an ELN-style redesign of the shared stylesheet, navigation, landing page, and chapter template. Ported the 6 chapters with real content onto the new template. |
| 11:09 | `bf16528` | Made sidebar categories collapsible dropdowns; trimmed the HPLC/LCMS troubleshooting tables down to a 6-row summary. |
| 11:10 | `4d5fafa` | Updated the changelog to record the sidebar dropdowns and trimmed troubleshooting tables. |
| 12:39 | `bd79af3` | Pointed the HPLC/LCMS troubleshooting links at Shimadzu's hosted PDFs instead of local copies. |

## 2026-07-20

| Time | Commit | Change |
|---|---|---|
| 22:44 | `900bdb0` | Replaced bordered Contents/Print topbar buttons with icon-only ghost buttons; added a sidebar settings popover (theme, text size, reduced motion) backed by localStorage; retired the per-chapter Revision History section in favour of this changelog. |
| 22:49 | `a70126e` | Fixed two bugs in the settings panel: it wasn't hidden on print on the landing page, and nesting it inside the sidebar meant closing the sidebar on mobile could drag the open panel along with it. |
| 22:55 | `af1cd7e` | Ported the 18 planned Equipment/Procedures chapters from the old pre-redesign markup to the design-system-v2 structure — structural port only, no content changes; still planned/non-linkable. |
| 23:24 | `fce017c` | Fixed two more settings-panel bugs found on independent QA: it rendered off-screen on the landing page (an animated ancestor created a new containing block for its `position:fixed`), and closing it while focus was inside dropped keyboard focus to `<body>` instead of returning it to the settings button. |

## 2026-07-21

| Time | Commit | Change |
|---|---|---|
| 09:36 | `78d6e9b` | Fixed the site silently switching to dark mode based on OS/browser preference alone. It now always defaults to the light theme; Dark/System remain available but only apply once explicitly chosen in settings. |
| 09:42 | `895ad58` | Removed the "Changelog" link from the landing page nav — this file is a maintainer-facing commit log, not part of the product front end. The file itself stays in the repo. |

## 2026-08-28

Handbook version bumped 0.1.0 → 0.2.0 (semantic versioning; see `HANDBOOK_META.version` in `assets/js/nav-data.js`) for the glass/gradient-mesh redesign below.

| Time | Commit | Change |
|---|---|---|
| 13:14 | `dd2bd22` | Added the glass redesign: glass surfaces on every card/panel, scroll-reveal and hover-tilt motion, and a live per-section scroll story (`sections.html`) driven from the chapter manifest. |
| 14:30 | `c7cdefa` | Added per-chapter motif icons (built from CSS primitives, no image assets) and moved the pinned scroll story onto the landing page, one stage per category; `sections.html` flattened to a static group-card grid. |
| 14:39 | `93cb484` | Fixed `.ruled` (a leftover lined-notebook-paper background from the old design) painting an opaque layer over the gradient mesh on every page. |
| 14:40 | `0ec537a` | Fixed the pinned stage's cards and "Open →" button being unclickable (`.frame.on` was missing `pointer-events:auto`); fixed the Equipment 15-chapter grid being clippable by a fixed-height container. |
| 14:42 | `bdc17a9` | Grew the pinned canvas from ~68vh to ~88vh so it uses the page properly; added short display labels for long chapter titles so card text stops overflowing. |
| 14:45 | `3d1fa8a` | Added a site-wide semver version (`HANDBOOK_META.version`), surfaced via a `#hbVersion` footer span on every page, and logged the redesign so far in this changelog. |
| 14:47 | `1d0a2fc` | Simplified motif cards to icon + title only (dropped the status-dot/date meta line); evened out grid spacing (0.2.0 → 0.2.1). |
| 14:55 | `b7f495a` | Recoloured the site to the University of Glasgow brand toolkit palette (0.2.1 → 0.3.0). |
| 14:58 | `9deff81` | Fixed inconsistent motif icon sizes within the same grid — `.cgrid{justify-items:center}` was letting card width (and so icon width) vary with title length (0.3.0 → 0.3.1). |

## 2026-08-31

| Time | Commit | Change |
|---|---|---|
| 13:36 | `bf178fb` | Swapped which UofG palette feeds which theme (Secondary Dark → dark mode, Secondary Light → light mode) per Andrew's correction; University Blue now used as a shared surface colour in both themes (0.3.1 → 0.4.0). |

## 2026-09-01

| Time | Commit | Change |
|---|---|---|
| 11:41 | `2e21a41` | Added a real favicon/app icon (a gold-rimmed compass on the brand gradient tile, replacing the browser's generated black-box "J") plus a web app manifest, so "install app"/pin-to-taskbar picks up a proper icon instead of a placeholder (0.4.0 → 0.5.0). |
