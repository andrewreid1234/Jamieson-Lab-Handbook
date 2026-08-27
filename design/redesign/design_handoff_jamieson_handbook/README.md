# Handoff: Jamieson Group Laboratory Handbook — Web Redesign

## Overview
A four-page web redesign of the Jamieson Group (School of Chemistry, University of Glasgow) laboratory handbook: a landing page, a contents dashboard, a chapter reading page, and a scroll-driven narrative page for the Computation section. The handbook is a living internal reference — equipment guides, procedures, lab conventions and computational pipelines — intended to be read at the bench, on laptops and tablets, in both bright and dim lab lighting (hence the light/dark themes).

## About the Design Files
The files in this bundle are **design references created in HTML** — prototypes showing intended look and behaviour, not production code to copy directly. The task is to **recreate these designs in the target codebase's existing environment** (React/Next, Vue, Astro, a static site generator, etc.) using its established patterns, component library and routing. If no environment exists yet, choose an appropriate stack — these pages are content-first and mostly static, so a static site generator or Next.js with MDX for chapter content is a good fit — and implement the designs there.

The CSS custom properties in each file are duplicated per page for standalone previewing. In production, lift them into one global stylesheet (`styles.css` in this bundle is that consolidated token file) and delete the per-page copies.

## Fidelity
**High-fidelity.** Colours, typography, spacing, radii, shadows, transitions and interaction behaviour are all final-intent and should be matched closely. Two exceptions, both content rather than design:

- All body copy, chapter titles, statistics, compound IDs and docking scores are **placeholder content** standing in for real handbook material. Do not ship the placeholder text.
- The five illustrations in the Computation scroll story are **abstract geometric stand-ins** (dot grids, bar columns, scatter points). They convey the intended motion and composition. The client's stated next step is to replace each one with a real visual for that pipeline stage — see "Open items" below.

## Screens / Views

### 1. Landing / Hero — `hero.html`
**Purpose:** entry point; orient a new group member, offer search, show what changed recently.

**Layout**
- Sticky glass topbar, full width, `padding:14px 40px`, bottom border only (`1px solid var(--glass-border)`), `z-index:50`.
- Hero block: `max-width:900px`, centred, `margin:8vh auto 0`, `padding:0 40px`, text-align centre.
- Body block: `max-width:1080px`, centred, `padding:0 40px 90px`.
- Fixed background layers behind everything: `.mesh` (`z-index:0`) and `.grain` (`z-index:1`); all content sits at `z-index:2`.

**Components**
- **Brand** — `Jamieson` in Fraunces 600/16px, followed by `Chem · Gla · Vol. 0` in IBM Plex Mono 10px, `letter-spacing:.16em`, uppercase, `--muted`.
- **Nav** — flex, `gap:26px`; links IBM Plex Sans 500/13.5px, `--muted`, active/hover `--ink`.
- **Theme toggle** — pill (`border-radius:999px`, `padding:5px`) containing two buttons, Plex Mono 600/11px, `padding:5px 11px`; active button `background:var(--accent)`, `color:var(--accent-ink)`. Sets `data-theme="light|dark"` on `<html>`.
- **Kicker** — glass pill, Plex Mono 500/11px, `letter-spacing:.18em`, uppercase, `--accent`, `padding:7px 16px`, `border-radius:999px`, with a 6px `--accent` dot via `::before`.
- **H1** — Fraunces 500, `clamp(34px,5.4vw,58px)`, `line-height:1.08`, `letter-spacing:-.01em`. Italic span coloured `--accent`. Copy: "The Jamieson Group lab, / documented properly."
- **Lede** — 16.5px, `line-height:1.6`, `--muted`, `max-width:560px`.
- **Search** — glass pill, `max-width:520px`, `padding:6px 6px 6px 20px`; transparent borderless input (14.5px), placeholder "Search chapters, instruments, procedures…"; submit button `background:var(--accent)`, `color:var(--accent-ink)`, 600/13px, `padding:11px 22px`, `border-radius:999px`, `hover:transform:scale(1.03)`.
- **Stat strip** — 4-column grid, `gap:14px`. Each glass card `border-radius:var(--radius)`, `padding:20px 22px`; number Fraunces 600/30px; label Plex Mono 500/10px, `letter-spacing:.1em`, uppercase, `--muted`. Values: 37 Chapters · 4 Sections · 15 Instruments · v0.1 Revision.
- **Section label** — Plex Mono 500/11px, `letter-spacing:.16em`, uppercase, `--muted`, with a flex-filling 1px `--glass-line` rule after it.
- **Category cards** — 4-column grid, `gap:16px`; glass, `padding:24px 22px`, `border-radius:var(--radius)`, cursor pointer. Contains a 38×38 `border-radius:11px` letter badge (`background: --accent at 16%`, colour `--accent`, Fraunces 600/17px), a mono count top-right, name Fraunces 500/19px, description 12.5px `--muted`, and a 3px progress bar (`background:var(--glass-line)`, fill `linear-gradient(90deg,var(--accent),var(--accent-2))`). Cards: Laboratory 4 (80%), Equipment 15 (95%), Procedures 9 (60%), Computation 2 (40%).
- **Recently updated list** — glass card, rows `padding:16px 22px`, separated by `1px solid var(--glass-line)`, last row none. Each row: 7px status dot (live `#4FA876`, draft `--accent`), name 600/14px, category Plex Mono 11px `--muted`, right-aligned relative time. Row hover `background: --accent at 6%`.
- **Footer** — Plex Mono 10.5px, `--muted-2`, `letter-spacing:.04em`, centred.

### 2. Contents dashboard — `dashboard.html`
**Purpose:** browse and filter the full chapter list.
**Layout:** flex app shell, `min-height:100vh` — persistent left sidebar plus a scrolling main column. Same token set, same mesh backdrop, fixed theme toggle at `top:16px; right:20px`. Reuses the reveal-on-scroll and hover-tilt behaviours from the hero. Refer to the file for the section list, filter chips and chapter rows.

### 3. Chapter page — `chapter.html`
**Purpose:** read one chapter (worked example: an instrument SOP).
**Layout:** `max-width:1100px`, `grid-template-columns:1fr 220px`, `gap:40px` — article plus a sticky on-this-page rail. Topbar is non-sticky here; theme toggle is fixed.

**Chapter-specific components**
- **Eyebrow** — Plex Mono 600/11px, `letter-spacing:.16em`, uppercase, `--accent`.
- **H1** Fraunces 600/36px; **H2** Fraunces 600/21px with `scroll-margin-top:80px` for anchor jumps.
- **Body copy** 15.5px, `line-height:1.75`; lists `line-height:1.8`; lede 17px `--muted`.
- **Chips** — status/metadata pills, Plex Mono 500/11px, `border-radius:20px`, `padding:4px 12px`; live variant uses `--good` / `--good-bg` / `--good-line`.
- **Inline code** — Plex Mono 500/13px on `--glass`, `border-radius:5px`, `padding:1px 7px`.
- **Callouts** — `border-left:4px solid`, `border-radius:0 14px 14px 0`, `padding:18px 22px`. Three semantic variants (summary/`--good`, warning/`--danger`, note/`--info`), each with a tinted background, a coloured label row (700/11.5px) and an 8px square marker.

### 4. Computation scroll story — `computation.html` ★ the key screen
**Purpose:** explain the whole computational pipeline in one scroll before the reader dives into command-level chapters. The client specifically wants this pattern kept and extended.

**Structure (top to bottom)**
1. Fixed 2px scroll-progress line at `top:0`, `z-index:70`, `linear-gradient(90deg,var(--accent),var(--accent-2))`, width = document scroll fraction.
2. Sticky glass topbar (as hero).
3. **Intro** — `max-width:900px`, `margin:14vh auto 18vh`, centred: kicker "Section 04 · Computation", H1 Fraunces 500 `clamp(34px,5.2vw,56px)` ("From a library of macrocycles / to a shortlist worth making."), lede, and a "Scroll" hint whose 1px 40px vertical rule runs a 2.2s looping `drop` keyframe.
4. **`.track`** — a tall scroll container whose height is set in JS to `N × 100vh` (N = 5 stages).
5. **`.stage`** — `position:sticky; top:0; height:100vh`, `display:grid; grid-template-columns:300px 1fr; gap:48px; align-items:center; max-width:1180px; padding:0 40px`.
   - **Left: step list.** Five `.step` rows, `grid-template-columns:26px 1fr`, `gap:14px`, `padding:14px 0`, separated by 1px `--glass-line`. Inactive `opacity:.32`; active `opacity:1` (`transition:opacity .5s`). Number Plex Mono 500/10.5px `--accent`; title Fraunces 500/18px; description 12.5px `--muted` collapsed to `max-height:0; opacity:0` and expanded to `max-height:80px; opacity:1` when active.
   - **Right: `.canvas`.** Glass panel, `border-radius:22px`, `height:min(72vh,620px)`, `overflow:hidden`. Holds five absolutely-positioned `.frame` layers (`inset:0`, flex column centred, `padding:38px`), a bottom-left caption (Plex Mono 500/10px, `letter-spacing:.14em`, uppercase, `--muted`) and a top-right 34px progress ring built from `conic-gradient(var(--accent) calc(var(--p)*360deg), var(--glass-line) 0)` with a 26px `--base-0` inner disc.
6. **Outro** — `max-width:760px`, centred, H2 Fraunces 500 `clamp(26px,3.4vw,36px)`, plus two pill CTAs (filled → chapter page, ghost → hero).

**The five stages** (each `.frame` fades/scales in at `opacity 0→1`, `transform scale(.965)→none`, `.55s/.7s var(--ease)`)
| # | Step (left rail) | Frame visual | Caption |
|---|---|---|---|
| 01 | Ligand library | 8-column grid of 48 rounded 8px tiles, `--accent` at 12% with `--glass-line` border; 6 flagged tiles solid `--accent`; staggered 14ms scale-in | Ligand library · 1,248 conformers |
| 02 | Target preparation | 380px-wide rounded box tinted `--accent-2` at 7%, containing a 9-column 63-dot lattice (3px dots, 8ms stagger) and a centred 36% dashed `--accent` circle scaling in at +.35s | Receptor · search box 22 Å |
| 03 | Docking on Woody | 14 bottom-anchored bars, `linear-gradient(180deg,var(--accent),var(--accent-2))`, each `transform:scaleY(calc(var(--lp) * var(--k)))` — **scroll-linked, not transitioned**; per-bar `--k` 0.38–0.95 | Woody · 14 array tasks |
| 04 | Scoring & clustering | 250px plot area with left/bottom 1px axes; 46 8px dots animate from scattered `--x0/--y0` to clustered `--x1/--y1` (`.9s var(--ease)`, 10ms stagger); the 7 best turn `--accent` | Score vs. RMSD · clustered |
| 05 | Shortlist | Glass table, 5 rows `grid-template-columns:26px 1fr auto auto`, `padding:13px 18px`, 1px dividers; rank (mono `--accent`), compound ID (600/13.5px), pose (mono `--muted`), score (Fraunces 600/16px); staggered 70ms rise-in | Shortlist · 5 of 1,248 |

## Interactions & Behavior

**Scroll driver (`computation.html`)** — the piece to port carefully:
- `track.style.height = N * 100vh` where N = number of stages.
- On `scroll` (passive) and `resize`, coalesce work into a single `requestAnimationFrame`.
- `prog = clamp(-track.getBoundingClientRect().top / (track.offsetHeight - window.innerHeight), 0, 1)`.
- `f = prog * N`, `i = min(N-1, floor(f))`, `lp = min(1, f - i)` — `i` is the active stage, `lp` its 0→1 local progress.
- Only touch classes when `i` changes (guarded by a `cur` variable): toggle `.on` on frame `i` and step `i`.
- Every frame: write `--lp` on the active frame, `--p` on the ring, and update the top progress line width.
- Two animation techniques coexist deliberately: **CSS transitions with per-element delays** for entrance choreography (stages 1, 2, 4, 5) and **direct scroll-linked CSS variables** for continuous motion (stage 3's bars, the ring). Keep both — the mix is what makes it feel responsive rather than merely triggered.

**Other behaviours**
- **Reveal on scroll** (hero, dashboard) — `IntersectionObserver`, `threshold:.15`, adds `.in` then unobserves; `opacity 0→1` + `translateY(22px)→0` over `.7s var(--ease)`.
- **Hover tilt** (hero, dashboard cards) — `mousemove` maps cursor offset to `--rx = px*10deg` / `--ry = -py*10deg` on an inner wrapper under `perspective:900px`; reset on `mouseleave`; also raises the shadow to `--shadow`.
- **Theme toggle** — sets `data-theme` on `<html>`; body transitions `background-color`/`color` over `.3s`. Persist the choice (localStorage or a cookie) and honour `prefers-color-scheme` on first visit — the prototypes do neither.
- **Reduced motion** — `prefers-reduced-motion: reduce` must: force all `.reveal` visible, disable tilt, stop the scroll-hint keyframe, and collapse the scroll story into a static vertical stack (`.track` height auto, `.stage` static with normal padding, all frames visible and `--lp:1`). This is implemented in both CSS and JS in `computation.html`; preserve both halves.
- **Responsive** — under 900px the scroll stage becomes single-column with `padding-top:90px`, `.canvas` drops to `46vh`, and step descriptions hide. The grids on hero/dashboard need mobile column counts (not yet specified in the prototypes — 2-up at tablet, 1-up at phone is the intent).
- **Navigation** — hero and dashboard cards/rows link to chapter pages; the Computation category links to the scroll story; scroll-story CTAs link to the chapter page and back to the hero.

## State Management
Minimal — this is a content site.
- `theme`: `'light' | 'dark'`, persisted; applied as a `data-theme` attribute on the document root.
- `activeStage`: integer 0…N-1, plus `localProgress` 0…1 — derived from scroll position, held in a ref/`requestAnimationFrame` loop rather than component state (re-rendering per frame will drop frames; write CSS variables imperatively).
- `searchQuery` + results — search is non-functional in the prototypes (`onsubmit` returns false). Wire to whatever index the real site uses.
- Dashboard filters: selected section / status chip.
- Chapter content: chapter metadata (title, section, status, last updated) plus body; heading list for the on-this-page rail should be derived from the rendered content, not hand-maintained.

## Design Tokens
Consolidated in `styles.css` (light under `:root`, dark under `:root[data-theme="dark"]`).

**Light**
`--base-0:#FBF3EA` · `--base-1:#F7E9DE` · `--ink:#241C1A` · `--muted:#8A7B70` · `--muted-2:#A69485` · `--accent:#B8563E` · `--accent-ink:#fff` · `--accent-2:#4B3B63` · `--glass:rgba(255,255,255,.52)` · `--glass-strong:rgba(255,255,255,.74)` · `--glass-border:rgba(255,255,255,.65)` · `--glass-line:rgba(120,90,70,.14)`
Semantics (chapter page): `--good:#3F8A56` · `--danger:#B23F32` · `--info:#3C6FA8`, each with a 12%-alpha `-bg` and 28%-alpha `-line`.
Mesh blobs: `--blob-a:#E8A695` · `--blob-b:#E9C46A` · `--blob-c:#B98CA6`.

**Dark** (a distinct cool mood, not an inversion)
`--base-0:#0A0D14` · `--base-1:#0D1119` · `--ink:#E7EAF2` · `--muted:#8D96AC` · `--muted-2:#6E778D` · `--accent:#4FE3CC` · `--accent-ink:#06201C` · `--accent-2:#A78BFA` · glass tokens drop to `rgba(255,255,255,.045–.13)`.
Semantics: `--good:#59D68C` · `--danger:#F0806E` · `--info:#7FB0EC`. Blobs: `#2FD9C4` · `#7C6CF0` · `#E85CA0`.

**Typography** — Fraunces (display/headings, 400–600, italic 500 available), IBM Plex Sans (UI/body, 400–700), IBM Plex Mono (labels, metadata, code, 400–600). Scale in use: 58/56/36/30/21/19/18/17/16.5/15.5/14.5/14/13.5/12.5/11/10.5/10px. Mono labels always carry `letter-spacing:.1–.18em` and `text-transform:uppercase`.

**Radii** — `--radius:16px` (cards) · 22px (scroll canvas) · 14px (callouts, inner panels) · 11px (icon badges) · 8px / 5px (small tiles, inline code) · 999px (pills).

**Shadows** — `--shadow-sm: 0 1px 2px rgba(90,60,40,.08), 0 2px 8px rgba(90,60,40,.06)` · `--shadow: 0 1px 2px rgba(90,60,40,.06), 0 20px 44px -20px rgba(90,60,40,.28)`; dark equivalents in `styles.css`.

**Motion** — `--ease: cubic-bezier(.2,.7,.2,1)` throughout. Durations: 0.2s (hover/colour), 0.3s (theme), 0.35s (tilt), 0.5s (step activation), 0.55–0.7s (frame + reveal), 0.9s (scatter clustering). Stagger steps: 8–14ms (dense grids), 70ms (list rows).

**Layout widths** — 1180px (scroll stage) · 1100px (chapter) · 1080px (hero body) · 900px (hero/intro text) · 760px (outro) · gutter `40px` · sidebar rails 300px / 220px.

## Assets
No external image, icon or logo assets. Everything is CSS/DOM:
- The background mesh is layered `radial-gradient`s over `--base-1`, `filter:blur(60–80px) saturate(115–140%)`, `opacity .55` light / `.32` dark.
- The grain overlay is an inline SVG `feTurbulence` data URI, 60×60 tile, `opacity:.035`, `mix-blend-mode:overlay`.
- Fonts load from Google Fonts. For production, self-host Fraunces and both IBM Plex families and drop the `@import`.
- Category icons are single Fraunces letters (L, E, P, C) in tinted badges — swap for the codebase's icon set if it has one.

## Open items for the client
1. **Replace the five abstract scroll visuals** with real per-stage imagery — the client's stated next step. The frame contract is stable: one `.frame` layer, gets `.on` when active, receives `--lp` (0→1) for scroll-linked motion. Any medium can slot in (structure renders, screenshots, video, WebGL) as long as it honours those two inputs and the reduced-motion fallback.
2. Real handbook content throughout; the placeholder chapter list, statistics, compound IDs and scores must go.
3. Confirm mobile breakpoints for the hero and dashboard grids.
4. Theme persistence and `prefers-color-scheme` respect.
5. Working search backed by a real chapter index.

## Files
| File | Screen |
|---|---|
| `hero.html` | Landing / hero |
| `dashboard.html` | Contents dashboard |
| `chapter.html` | Chapter reading page |
| `computation.html` | Computation scroll story (key screen) |
| `styles.css` | Consolidated design tokens, both themes |
