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

## v0.3 — 2026-07-18

- Added **Laboratory Introduction**, **Laboratory Rules**, and **Safety** chapters (all `draft`), built from interview. Removed thin, mostly-blank "Purpose" sections from Introduction and Safety after feedback that a section shouldn't get its own heading for one or two sentences — folded the useful content into the quick summary instead.
- Added **Troubleshooting** sections to **Analytical HPLC** and **LCMS** (both flipped `planned` → `draft`), adapted and paraphrased from Shimadzu's manufacturer troubleshooting guides (`documentation/hplc-troubleshooting-guide.pdf`, `documentation/lcms-troubleshooting-guide.pdf`) rather than copied verbatim. Purpose/safety/procedure/materials for both remain explicitly flagged as pending interview.
- Scaffolded structural placeholders (template shell only, no invented content) for the 20 remaining `planned` chapters, ready for future interview-driven content passes.
- Added `documentation/interview-question-bank.md` — reusable interview question sets by chapter type (equipment/procedure/laboratory).
- **Design system v2**: replaced the shared stylesheet, navigation JS, landing page, and chapter template with a new ELN-style design (teal-dark sidebar, amber accent, refined callouts, auto-generated "on this page" rail, prev/next, and a new `contents.html` dashboard). Ported the 6 chapters with real content (Introduction, Rules, Safety, Syro II, Analytical HPLC, LCMS) to the new template; the 20 structural placeholders remain on the old markup until they get real content and are ported alongside it — they're `planned`/non-linkable so this isn't user-visible yet. Fixed a prev/next bug in the ported `nav.js` that could link to an unported `planned` chapter; genericized a placeholder "Rowan Mercer" identity in the sidebar footer to the group itself, since the site has no auth/login.
