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
