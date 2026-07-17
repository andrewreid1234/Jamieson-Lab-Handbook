# Changelog

All notable changes to the Jamieson Group Laboratory Handbook are recorded here.

## v0.1 — 2026-07-17

- Restored `documentation/` (design tool, project prompt, maintenance guide) to match the project's intended state.
- Added shared design system: `assets/css/style.css`, `assets/css/print.css`.
- Added shared navigation/runtime JS: `assets/js/nav-data.js` (chapter manifest), `assets/js/nav.js` (sidebar, scrollspy, search, progress bar, print).
- Added `chapters/chapter-template.html` — blank chapter shell matching the agreed chapter structure.
- Added `index.html` — Volume 0 landing page with lab nameplate and chapter category grid.
- No chapters written yet. Full planned scope (24 chapters) recorded in `assets/js/nav-data.js`.

## v0.2 — 2026-07-17

- Added `draft` chapter status (distinct from `planned`/`live`) with its own sidebar pill, plus a `.callout-todo` style for flagging open questions inline — accessibility pass (skip link, focus-visible, `aria-current`).
- Added first chapter: **Syro II Peptide Synthesiser** (`chapters/equipment-syro.html`), status `draft`. Built from a source SOP document plus interview — resin scale/parallel count, Syro-vs-Alstra split, and two documented content conflicts resolved (reaction time is intentionally different between the automated chemfile and manual fallback; DIC/Oxyma overshoot confirmed at 10%, correcting a "5%" typo in the source). One item still flagged inline pending confirmation (the DMF line-priming step's reservoir selection).
- Confirmed the DMF line-priming question (source document had a copy/paste error — corrected) and **published Syro II** as the handbook's first live chapter. Homepage nameplate updated to reflect 1 of 24 chapters published.
