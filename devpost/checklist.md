---
doc: checklist
status: approved
---

# Build Checklist

Build mode: fast

## Slices

- [x] **1. You can open the page, close the intro, and switch the page between four season colors**
  Becomes usable: A running page with the title, blurb, intro pop-up, four season buttons, and a solid background color per season. It opens on today's season.
  Why now: Delivers the heart of the unique kernel (the whole page transforms per season) in its simplest form, and the scaffold, `useState` and the `data-season` mechanism everything else hangs on.
  PRD ref: `prd.md > Screens and Layout`, `prd.md > Season Selection and Theme`, `prd.md > Intro Pop-up`
  Spec ref: `spec.md > Stack`, `spec.md > File Structure`, `spec.md > Components` (App, SeasonButtons, IntroModal, getCurrentSeason), `spec.md > Data Model` (State)
  Build: Scaffold Vite react-ts in the project root (checking the current scaffold command first), add the handwritten Google Font, `types.ts`, `getCurrentSeason`, `App` with `season` and `introOpen` state setting `data-season`, `SeasonButtons`, `IntroModal`, and `global.css` plus `themes.css` with one color set per season.
  Verify (mechanical): `npm run build` (TypeScript + bundle) passes; start `npm run dev` and confirm it serves; unit-check `getCurrentSeason` for months in each season; confirm the served page contains the title and buttons.
  Learner check: Run `npm run dev`, open the address, close the pop-up, and click each season button. Say whether the colors and handwritten look feel right.
  Commit: `Add season buttons, intro pop-up and per-season themes`

- [x] **2. Each season has its own animated touch**
  Becomes usable: Switching seasons now also brings trees and grass (spring), flowers (summer), maple leaves from a few border spots (autumn), and falling snowflakes (winter).
  Why now: This is the "oh, that's cool" beat of the kernel. Doing it early shows whether the transformation really feels like each season before the rest is built around it.
  PRD ref: `prd.md > Look and Feel`, `prd.md > Season Selection and Theme`
  Spec ref: `spec.md > Components` (SeasonDecor), `spec.md > Look and Feel`, `animations.css` in `spec.md > File Structure`
  Build: Add `SeasonDecor` drawing simple SVG shapes behind the board, and `animations.css` keyframes for each season, keyed to the active season.
  Verify (mechanical): `npm run build` passes; dev server renders each season's decor elements (checked by loading the page for each season and inspecting the DOM / computed animation names); no console errors.
  Learner check: Click through all four seasons and watch the background. Tell me which season feels closest to its picture book and which feels off.
  Commit: `Add animated decor for each season`

- [x] **3. The bulletin-board map of Canada appears with tacks pinned on it**
  Becomes usable: A bulletin-board map of Canada with a first set of thumbtacks pinned at their locations for the current season, and different tacks per season. Tacks appear (no fly-in yet).
  Why now: The map and the tack data file are the foundation for hover cards and the fly-in. Sourcing the map image and judging tack positions is the biggest unknown, so it comes before the interactions that depend on it.
  PRD ref: `prd.md > Screens and Layout`, `prd.md > Thumbtack Pins and Fly-In Animation`
  Spec ref: `spec.md > Components` (MapBoard, Tack), `spec.md > Data Model` (Content), `spec.md > External Services and Dependencies` (Images)
  Build: Add a Canada map image to `public/images/`, `seasons.ts` with 5 starter tacks per season at percentage coordinates, `MapBoard` (with `useRef`, tacks keyed by season) and `Tack`, plus board styling.
  Verify (mechanical): `npm run build` passes; the map image is served (HTTP 200); the page renders 5 tacks for each season when each season is selected; switching seasons replaces the tacks.
  Learner check: Look at the map and switch seasons. Say whether the tacks sit in sensible places on Canada and whether the board looks like a bulletin board.
  Commit: `Add bulletin-board map with season tacks`

- [ ] **4. Tacks fly in and pin themselves one by one**
  Becomes usable: Choosing a season (or closing the intro) makes its tacks fly in from the nearest side of the board and pin at staggered moments. Switching seasons removes the old tacks instantly.
  Why now: This is the signature motion of the product and only needs the tacks from slice 3, so it comes right after them and before the card work.
  PRD ref: `prd.md > Thumbtack Pins and Fly-In Animation`, `prd.md > The Core Journey` (steps 2 and 6)
  Spec ref: `spec.md > Components` (Tack, MapBoard), `spec.md > The Core Journey Through the System` (step 3), `spec.md > Important Failure Modes` (rapid switching)
  Build: Give each `Tack` a side (left if x < 50%) and stagger delay as CSS variables, add the fly-in keyframes to `animations.css`, and start the animation when the intro closes.
  Verify (mechanical): `npm run build` passes; DOM check that left-side and right-side tacks get the correct side variable and increasing delays; rapidly switching seasons in the dev server leaves no stale tacks or errors.
  Learner check: Close the intro and watch the tacks fly in, then switch seasons several times quickly. Say whether the motion feels playful and whether tacks pin at different moments.
  Commit: `Add staggered tack fly-in animation`

- [ ] **5. Hover a tack to preview, click to lock, and browse items**
  Becomes usable: Hovering a tack shows a white outlined card with picture, title, description and a dotted line; clicking locks it open and activates the tack; the next button browses multi-item tacks; clicking outside closes it; a broken picture shows a drawn placeholder.
  Why now: This is the main interaction and uses `useEffect` and a custom hook, the learner's stated weak spot. It builds on tacks that already exist, with starter content in place.
  PRD ref: `prd.md > Hover Card and Click-to-Lock`, `prd.md > The Core Journey` (steps 3-5), `prd.md > States and Boundaries`
  Spec ref: `spec.md > Components` (TackCard, PlaceholderArt, Hooks and helpers), `spec.md > Data Model` (State), `spec.md > Important Failure Modes`
  Build: Add `hoveredTackId`, `lockedTackId` and `itemIndex` state to `App`, `TackCard` with SVG dotted connector and roomier-side placement, `PlaceholderArt`, and `useClickOutside` with a `useEffect` that cleans up its listener. Give a couple of starter tacks several items.
  Verify (mechanical): `npm run build` passes; with a headless browser or DOM test, hover shows a card, click locks it after mouse-out, next changes the title, outside click closes it, a different tack replaces the locked card, and a bad image path renders the placeholder.
  Learner check: Hover over a tack, click it, move the mouse away, press next, then click outside the card. Say whether it behaves the way you pictured it, including near the edges of the map.
  Commit: `Add hover cards, click-to-lock and item browsing`

- [ ] **6. Every season has at least 5 real tacks with pictures and descriptions**
  Becomes usable: 20 or more tacks across the four seasons (at least 5 each), each marking something unique to Canada in that season with a title, short description and picture, plus a README that says how to run it.
  Why now: Content is last because it needs no new mechanics, and by now the structure that displays it has been checked by the learner.
  PRD ref: `prd.md > Thumbtack Pins and Fly-In Animation`, `prd.md > What We're Building`, `prd.md > Open Questions`
  Spec ref: `spec.md > Data Model` (Content), `spec.md > External Services and Dependencies` (Images), `spec.md > Decisions and Open Issues` (open items), `README.md` in `spec.md > File Structure`
  Build: Agree the locations and items with the learner, fill `seasons.ts` (at least 5 per season, some multi-item), download images by hand into `public/images/` (placeholders cover any that fail), tune tack positions, and write `README.md`.
  Verify (mechanical): A script or build-time check confirms at least 5 tacks per season and 20 or more in total, every tack has x and y between 0 and 100, and every `image` path exists on disk or is listed as a placeholder; `npm run build` passes.
  Learner check: Go through all four seasons, hover or click every tack, and note any that are in the wrong place, have wrong facts, or have a missing picture.
  Commit: `Add full tack content for all four seasons`

## Hands-on Checkpoints

- [x] Early usable behavior explored — after slice 2, when the page changes and animates per season (the kernel), before the map and cards are built
- [ ] Final kick-the-tires exploration and feedback completed

## Final Review

- [ ] Final review complete — feedback resolved and learner confirms ready to ship

## Code Tour and App Map

- [ ] Learning activity complete — guided route, focused alternative, prior practice connected, or brief recap
- [ ] Optional edit and transfer reflection addressed — offered/declined/already covered/not applicable as appropriate
- [ ] `devpost/app-map.html` generated from finished code, checked, and shown, including a project-grounded practice to reuse

Activity and evidence: [what actually happened; real document/test/code references; unfinished work if interrupted]
Route and stops: [actual paths and symbols; guided stops completed, or reference-only route]
Edit outcome: [tried/kept/reverted/declined/not applicable; verification if changed]
Reflection: [offered/answered/declined/already covered — personal answer belongs only in the ignored profile]
Activity mode: [live app and editor, explicit static fallback, focused alternative, prior practice, or recap]

## Revisions
- Spring decor is grass instead of rain and wind; winter is slow rotating snowflakes; title is a small top-left logo with centered blurb and buttons; season colors are faded pastels — learner feedback at the early checkpoint after seeing the first version of slice 2.
- Spring touch is now four standing trees (two pink blossoming, two green leafing) plus low dense grass; winter has no wind gusts, just slow straight-falling snowflakes — learner feedback on the early checkpoint. Build mode switched to fast after slice 2.
- Slice 3 used the Wikimedia Commons "Canada blank map.svg" (public/images/canada-map.svg) as the map; trees in spring moved to pairs at either side of the board so the board doesn't hide them; intro pop-up got a z-index so the board can't cover it — discovered while verifying the board.
