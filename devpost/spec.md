---
doc: spec
status: approved
---

# Four Seasons of Canada — Technical Spec

## How This Works, In Plain Language
The whole app is one web page that runs in the browser. There is no server, no database and no accounts, because nothing is saved (`prd.md > States and Boundaries`).

- **React** builds the screen out of small pieces called components: a title, four season buttons, a bulletin-board map, thumbtacks, and a card. Each piece draws itself from the data it is handed.
- **State** is the page's memory while it is open: which season is selected, which tack is hovered, which card is locked open, and whether the intro pop-up is showing. When a piece of state changes, React redraws only what depends on it. Most of the app's behavior is "change one piece of state, and the screen follows."
- **Hooks** are React's built-in tools for components. `useState` holds a piece of memory. `useEffect` runs code when something changes or appears, such as listening for clicks outside the card. `useRef` points at a real element on the page, such as the map board.
- **A data file** (`seasons.ts`) holds every tack: its season, where it sits on the map, and its card text and pictures. Changing the content means editing this file, not the components.
- **CSS** does all the looks and motion: one set of colors per season, falling leaves and snow, and the tack fly-in. Choosing a season sets `data-season="autumn"` on the page, and CSS swaps the whole look from that.
- **Vite and Node** are the toolbox. Node runs Vite, Vite shows the page at `localhost` while you work, and TypeScript warns about mistakes (such as a tack missing a title) before you see them in the browser.

Why this shape: it is the smallest setup that proves the idea (a page that transforms per season, with interactive pins) and gives you real practice with components, state and hooks, which is your stated goal.

## The Core Journey Through the System
PRD ref: `prd.md > The Core Journey`.

1. **Open the page.** React starts `App`. `App` creates its state: `season` begins as today's season (`getCurrentSeason()` reads `new Date().getMonth()`), `introOpen` is `true`, and the hovered and locked tack are both empty. `IntroModal` is drawn over the page.
2. **Close the pop-up with X.** `introOpen` becomes `false`. The `MapBoard` is now revealed and draws the tacks for the current season, and each tack plays its fly-in animation.
3. **Tacks fly in.** `MapBoard` filters the tack list to the current season. Each `Tack` gets a side (left if its map x is under 50%, otherwise right) and a delay based on its position in the list. CSS reads these and animates each tack from its side edge to its own spot, one after another.
4. **Hover a tack.** `onMouseEnter` sets `hoveredTackId`. `TackCard` appears beside the tack with a dotted line (an SVG line) back to it. `onMouseLeave` clears the hover.
5. **Click the tack.** `lockedTackId` is set and the tack is drawn as "activated". The card now shows because the tack is locked, not because of the hover. The next button changes `itemIndex`, which swaps the picture, title and text.
6. **Click outside the card.** A custom hook, `useClickOutside`, has a `useEffect` listening on the document. A click outside the card clears `lockedTackId`.
7. **Click another season.** `season` changes and `lockedTackId` and `itemIndex` reset. The tack list is re-keyed by season, so React throws away the old tacks instantly and mounts the new ones, which play their fly-in. `data-season` changes on the page and CSS swaps colors, drawings and the animated touch.
8. **Repeat for all four seasons.**

```
 click season button ──► setSeason() ──► App re-renders
                                          │
          ┌───────────────────────────────┼─────────────────────────┐
          ▼                               ▼                         ▼
   <html data-season>              <SeasonDecor>              <MapBoard>
   CSS swaps colors/fonts          leaves / snow / grass      tacks for this season
                                   / flowers                  fly in (CSS animation)
                                                                     │ hover / click
                                                                     ▼
                                                             hoveredTackId / lockedTackId
                                                                     ▼
                                                               <TackCard>
```

## Stack
- **TypeScript + React.** Chosen by the learner. React is the main learning goal, as a refresher with hooks as the weak spot. Docs: https://react.dev
- **Vite** as the dev server and bundler, recommended by the agent and accepted by the learner ("react/typescript and node if needed"). Docs: https://vite.dev/guide/
- **Node.js and npm** run Vite and install libraries. There is no backend. Docs: https://nodejs.org
- **Plain CSS** (one stylesheet, CSS variables and keyframes), no animation library. Chosen by the learner. The tradeoff is hand-written timing for the staggered fly-in, which is small. Docs: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_animations
- **Handwritten font:** a Google Font such as Patrick Hand or Gaegu, with a `cursive` fallback. Docs: https://fonts.google.com
- **No other libraries.** There is no router, state library or UI kit, and no test framework unless the build adds one.

**Unverified (check at the start of the build):** the current Vite and React versions and the exact scaffold command. The expected command is `npm create vite@latest four-seasons -- --template react-ts`. I could not look this up, so check the Vite docs link above.

## Where It Runs and How Someone Tries It
- **Runtime:** a desktop browser (mouse only, per the PRD), served by Vite on the learner's machine. Needs a current Node.js LTS.
- **Start:** `npm install`, then `npm run dev`, then open the printed address (usually `http://localhost:5173`).
- **What to show:** the intro pop-up closing, the tacks flying in, a hover card, a locked card with the next button, then all four seasons.
- **Submission:** this is an own project and a throwaway test, so a demo video, public repository and deployment are all optional. No deployment is planned.

## Look and Feel
Carried from `prd.md > Look and Feel` and `scope.md > Inspiration & Identity`.

- **Overall:** simple, uncluttered, playful. Nothing should look serious.
- **One font:** a handwritten font for the title, blurb, buttons and cards, the same across all seasons.
- **One solid background color per season.** The title, blurb and button style stay constant. Only colors, drawings and animations change.
- **Per-season mood, from picture books:**
  - Spring: *Step Inside a Fairy Tale*. Light greenish teal, grass sprouting and swaying, blossoming and leafing trees.
  - Summer: *Clifford*. Bright, saturated, flowers.
  - Autumn: *Have You Seen My Cat?*. Red, orange and yellow, maple leaves popping out from a few scattered spots on the map border.
  - Winter: *The Polar Express*. Whitish gray, slow falling snowflakes.
- **Board:** a bulletin-board look (cork or paper frame) around the map. Cards are white with an outline. The connector is a dotted line.
- **Honest limit:** matching the books' exact art style is not possible with CSS and found images. We aim for their colors and mood, with simple hand-drawn-looking SVG decorations.

## Components
All components live in `src/components/`. The state table is under Data Model.

### App
Owns the shared state (`season`, `introOpen`, `hoveredTackId`, `lockedTackId`, `itemIndex`) and sets `data-season` on the page. Lays out the small top-left title, the centered blurb and buttons, and the board.
PRD ref: `prd.md > Season Selection and Theme`, `prd.md > Screens and Layout`.
Hooks practiced: `useState`, `useEffect` (setting `data-season`).

### SeasonButtons
Four large buttons, with the active one highlighted. Calls back to `App` to change the season, which also clears any locked card.
PRD ref: `prd.md > Season Selection and Theme`.

### IntroModal
An overlay with a short description and an X. Shown on every load. Closing sets `introOpen` to false.
PRD ref: `prd.md > Intro Pop-up`.

### MapBoard
The bulletin-board frame with the Canada map image. Draws the tacks for the current season, positioned by percentage coordinates, and the open card. Holds a `useRef` to the board element for placing the card and line. The tack list is keyed by season so a switch replaces the tacks instantly.
PRD ref: `prd.md > Thumbtack Pins and Fly-In Animation`, `prd.md > Screens and Layout`.
Hooks practiced: `useRef`, keys.

### Tack
One thumbtack. Gets its side (left or right) and stagger delay as CSS variables. Reports hover, leave and click to `App`. Draws an "activated" look when locked.
PRD ref: `prd.md > Thumbtack Pins and Fly-In Animation`, `prd.md > Hover Card and Click-to-Lock`.

### TackCard
White outlined card with picture, small title beneath, and short description. Has a next button when the tack has several items. Opens on the side of the tack with more room. A dotted SVG line joins card to tack. If the picture fails to load, shows `PlaceholderArt` instead.
PRD ref: `prd.md > Hover Card and Click-to-Lock`.
Hooks practiced: `useClickOutside` (custom hook), `useEffect`.

### PlaceholderArt
A simple drawn SVG stand-in, in the season's colors, shown whenever an image is missing or fails to load. Labeled with the item title so the card still makes sense.
PRD ref: `prd.md > Hover Card and Click-to-Lock` (card contents). Learner decision: missing images are simply drawn in.

### SeasonDecor
The season's animated touch, drawn behind the board: trees and grass (spring), flowers (summer), maple leaves from a few border spots (autumn), falling snowflakes (winter). Pure CSS keyframes on a handful of SVG or emoji-free shapes.
PRD ref: `prd.md > Look and Feel`.

### Hooks and helpers
- `useClickOutside(ref, onOutside)` in `src/hooks/`: adds a document click listener in `useEffect` and removes it on cleanup.
- `getCurrentSeason(date)` in `src/lib/`: maps month to season (Mar–May spring, Jun–Aug summer, Sep–Nov autumn, Dec–Feb winter). Meteorological seasons are an agent-derived implementation detail, easy to change.

## Data Model
Everything is in memory; nothing is stored. Leaving or reloading the page resets it (`prd.md > States and Boundaries`).

**Content (static, in `src/data/seasons.ts`):**
```ts
type Season = 'spring' | 'summer' | 'autumn' | 'winter';
type Item  = { title: string; description: string; image: string };  // image: /images/...
type Tack  = { id: string; season: Season; x: number; y: number;     // x,y = percent of the map
               items: Item[] };                                       // 1 item, or several -> next button
const tacks: Tack[] = [ /* 20+ entries, at least 5 per season */ ];
```

**State (in `App`):**

| State | Starts as | Changes when | On reload |
|---|---|---|---|
| `season` | `getCurrentSeason(today)` | a season button is clicked | recomputed from the date |
| `introOpen` | `true` | the X is clicked | `true` again |
| `hoveredTackId` | none | mouse enters or leaves a tack | none |
| `lockedTackId` | none | a tack is clicked; click outside; season change | none |
| `itemIndex` | `0` | next is clicked; reset when a different tack opens or the season changes | `0` |

Opening a different tack closes the previously locked one (a PRD assumption, kept).

## File Structure
Created in the project root (`pack-test/`), next to `devpost/`.

```
pack-test/
├── devpost/                  # Devpost learning workspace (docs)
├── public/
│   └── images/               # downloaded pictures + canada-map image (sourced by hand)
├── src/
│   ├── main.tsx              # React entry: mounts <App/>
│   ├── App.tsx               # shared state + page layout
│   ├── components/
│   │   ├── SeasonButtons.tsx
│   │   ├── IntroModal.tsx
│   │   ├── MapBoard.tsx      # board, map, tacks, open card
│   │   ├── Tack.tsx
│   │   ├── TackCard.tsx
│   │   ├── PlaceholderArt.tsx
│   │   └── SeasonDecor.tsx   # per-season animated touches
│   ├── hooks/
│   │   └── useClickOutside.ts
│   ├── lib/
│   │   └── getCurrentSeason.ts
│   ├── data/
│   │   └── seasons.ts        # all tack + card content (the only place content lives)
│   ├── types.ts              # Season, Tack, Item
│   └── styles/
│       ├── global.css        # font, layout, shared look
│       ├── themes.css        # per-season CSS variables via [data-season]
│       └── animations.css    # fly-in, leaves, snow, grass, flowers
├── index.html
├── package.json              # generated by Vite
├── tsconfig.json             # generated by Vite
├── vite.config.ts            # generated by Vite
└── README.md                 # how to run
```

## External Services and Dependencies
- **Runtime libraries:** `react` and `react-dom`. Dev tooling: `vite`, `typescript`, `@vitejs/plugin-react` (all from the scaffold). Docs links are under Stack.
- **Google Fonts** (the handwritten font): one stylesheet link in `index.html`. Free, no key. If offline, the `cursive` fallback is used.
- **Images:** no service or API. Pictures are downloaded by hand from the web into `public/images/`. They are unlicensed and for private, throwaway use only, never for publishing (learner decision: "I am not looking to publish this and will delete it after").

## Important Failure Modes
- **An image is missing or fails to load** → the card shows `PlaceholderArt` with the item's title, and the app keeps working.
- **A card opens near the edge of the board** → the card opens on the side with more room, based on the tack's x position, so it stays on screen.
- **Rapid season switching while tacks are flying in** → tacks are re-keyed and replaced, so leftover animations never linger and no timers need cleanup.

## What Was Simplified and Why
- **Static data file** instead of a backend or database — nothing needs saving or computing. A real API would add a server for no PoC benefit.
- **Plain CSS animation** instead of an animation library — the learner chose it, and the effects are simple. A library would make the staggered fly-in easier but adds a dependency.
- **Whole-country map image with percentage-positioned tacks** instead of an interactive map library — a map library (Leaflet and similar) is far more than a decorative bulletin board needs.
- **Drawn placeholders** for missing images — the learner doesn't want to spend time on art sourcing.
- **Local only, no deployment** — nothing is published.
- Items already cut in the PRD stay cut: province zoom, moving tacks between seasons, touch support.

## Decisions and Open Issues
**Learner choices**
- React + TypeScript, with Node as tooling if needed. Why: React is the main learning goal.
- Plain CSS animation. Tradeoff accepted: some hand-written timing for the fly-in.
- Images from the web, downloaded locally; missing ones are drawn in as placeholders. Tradeoff accepted: unlicensed images, private use only.
- No deployment; nothing is published.

**Agent-recommended, accepted by the learner:** Vite as the build tool, with no backend.

**Derived implementation details (not learner decisions):** meteorological season boundaries, percentage tack coordinates, the card opening on the roomier side, an SVG dotted connector, `useClickOutside` as a custom hook.

**Learner uncertainty:** hooks, the learner's self-described weak spot after a long break from React. How it will be clarified: the build will introduce each hook in the exact spot it is needed (`useState` in `App`, `useEffect` and `useRef` in `MapBoard` and `useClickOutside`), with a one-sentence explanation of what it does and what would break without it. Evidence it worked: the learner can say what `useClickOutside` does and why its `useEffect` returns a cleanup function.

**Open, to settle during the build:**
- Which 20+ locations and items go on the tacks (from `prd.md > Open Questions`).
- Which map-of-Canada image to use, and the exact x/y of each tack on it.
- Verify the current Vite scaffold command and React version at step one.
