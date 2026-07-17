# Jamieson Group Laboratory Handbook

## Volume 0 — Laboratory Operations Handbook

**School of Chemistry**  
**University of Glasgow**

---

## Overview

A modular laboratory documentation system developed for the Jamieson Group.

The handbook will provide structured laboratory operations documentation through a GitHub Pages website.

---

## Technology

Built using:

- HTML
- CSS
- JavaScript
- GitHub Pages

No frameworks are used.

---

## Project Structure

```
Jamieson-Lab-Handbook/
├── index.html                 ← Volume 0 landing page
├── changelog.md
├── README.md
├── chapters/
│   ├── chapter-template.html  ← blank chapter shell — copy this to start a new chapter
│   └── ...                    ← one HTML file per chapter (see nav-data.js for the full list)
├── assets/
│   ├── css/
│   │   ├── style.css          ← shared design system (screen)
│   │   └── print.css          ← print stylesheet
│   └── js/
│       ├── nav-data.js        ← chapter manifest — sidebar/home nav is generated from this
│       └── nav.js             ← sidebar, scrollspy, progress bar, search, print button
└── documentation/
    ├── handbook-design-tool.md          ← AI role, philosophy, writing style
    ├── laboratory-handbook-project-prompt.md  ← project scope, audience, chapter list
    └── handbook-maintenance-guide.md    ← how the handbook is updated over time
```

To add a new chapter: copy `chapters/chapter-template.html`, fill it in following the interview-first workflow in `documentation/handbook-maintenance-guide.md`, then add its entry to `assets/js/nav-data.js` (flip `status` to `"live"`) so it appears in navigation.

## Status

Foundation scaffold only — no chapters have been written yet. See `assets/js/nav-data.js` for the full planned chapter list (24 chapters across Laboratory, Equipment, and Procedures).
