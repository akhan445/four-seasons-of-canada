---
doc: prd
status: approved
---

# Four Seasons of Canada — Product Requirements

An interactive, storybook-style web page that teaches the four seasons through a bulletin-board map of Canada, pinned with thumbtacks marking what is unique to the country in each season. For young kids through adults.
Source: `scope.md > The Core Loop`, `scope.md > The Unique Kernel`, `scope.md > What "Working" Looks Like`.

## The Core Journey
1. Someone opens the page on a computer. An intro pop-up explains what the site is. They close it with the X.
2. The page shows the season matching today's date (October shows autumn, June shows summer). That season's theme is applied and its thumbtacks fly in and pin themselves to their map locations one by one.
3. They hover over a thumbtack. A card appears beside it, joined by a dotted line.
4. They click the thumbtack. The card locks open and the tack looks activated. They can move the mouse freely, and if the tack has several items, browse them with the next button.
5. They click anywhere outside the card to close it.
6. They click another season button. The old tacks disappear immediately, the whole theme transforms, and the new season's tacks fly in and pin themselves.
7. They repeat until they've seen all four seasons. Success: all four seasons work end to end.

(`scope.md > The Core Loop`)

## Screens and Layout
One page only; nothing navigates away. Season buttons swap what the page shows. Desktop browser with a mouse; no touch or phone layout.

- **Top left:** the page title, "Four Seasons of Canada".
- **Above the buttons:** a short blurb inviting people to explore Canada and see what makes it unique.
- **Above the map:** four large season buttons (spring, summer, autumn, winter), with the current season selected on load.
- **Center:** one map of the whole of Canada that fills most of the page, styled like a bulletin board.
- **Overlay:** the intro pop-up on first load, with an X to close.
- **Card (on demand):** a white, outlined card beside the hovered or clicked tack, joined by a dotted line.

## Look and Feel
Simple and uncluttered; show few details at once. The background is a single solid color per season. The text, buttons, and title share one playful, handwritten-looking style across the whole page. Only colors, drawings, and animations change per season. Nothing should look serious.

Each season takes the colors, mood, and drawing style of one picture book:
- **Spring:** *Step Inside a Fairy Tale*. Animated touch: light showers and wind.
- **Summer:** *Clifford*. Animated touch: flowers.
- **Autumn:** *Have You Seen My Cat?*. Animated touch: maple leaves popping out from a few spots around the map border (not the whole border), loosely scattered.
- **Winter:** *The Polar Express*. Animated touch: snowfall.

(`scope.md > Inspiration & Identity`)

## Features and Behavior

### Season Selection and Theme
- Four buttons; exactly one season is active at a time.
- On load, the active season is picked from today's date.
- Clicking a button transforms the whole page: background color, drawings, and animated touches change to that season's look. The title, blurb, button style, and handwritten lettering stay consistent.

- As a visitor, I want the page to transform when I pick a season so that each season feels different.
  - [ ] Opened in October, the page shows autumn; in June, summer.
  - [ ] Clicking each of the four buttons changes the background color and decorative animation to that season's.
  - [ ] The title, blurb, and button style do not change between seasons.

### Thumbtack Pins and Fly-In Animation
- Each season has at least 5 thumbtacks on the map (20 or more in total), each marking a location tied to something unique to that season in Canada (animals, plants, natural events such as the northern lights or long northern summer days).
- When a season is selected, its tacks fly in from the side of the page nearest to their location (the board is split into a left and a right half). Tacks may travel together, but each one stops and pins itself at its own location, one after another, so they pin at different moments rather than all at once.
- When another season is selected, the current tacks disappear immediately (no animation) and the new tacks fly in.

- As a visitor, I want tacks to fly in and pin themselves so that the map feels alive and each season feels like a new discovery.
  - [ ] Clicking a season shows at least 5 thumbtacks flying in from the left or right and pinning at their locations at staggered moments.
  - [ ] Tacks drawn from the right side that are headed to different places each stop at their own location.
  - [ ] Clicking a different season removes the old tacks right away.

### Hover Card and Click-to-Lock
- Hovering a tack shows a card with a dotted line connecting it to the tack. The card appears only on hover unless locked.
- Card contents: a picture, then a small title beneath it, then a short description. The card is white with an outline.
- Clicking a tack locks its card open and marks the tack as activated. The card stays when the mouse moves away.
- If the tack has several items, the card has a next button to browse them.
- Clicking anywhere outside the card closes it (the user doesn't have to go back to the tack).

- As a visitor, I want to read about a place without keeping my mouse still so that I can browse several items at my own pace.
  - [ ] Hovering a tack shows a card with picture, title, description, and a dotted line to the tack; moving away hides it.
  - [ ] Clicking a tack keeps the card open and shows the tack as activated after the mouse leaves.
  - [ ] On a multi-item tack, the next button changes the picture, title, and description.
  - [ ] Clicking outside the card closes it.

### Intro Pop-up
- On first load, a pop-up describes what the website is. Closing it with the X reveals the page showing the current season, and the tacks fly in at that point.

- [ ] The pop-up appears on load and closes with the X.

## States and Boundaries
- **First load:** intro pop-up over the page; the current season is selected behind it.
- **Locked card:** one card locked at a time; selecting a different season clears it. *(Assumption: opening a different tack closes the previously locked card.)*
- **Nothing is saved:** no accounts or stored progress. *(Assumption: the pop-up shows on every page load.)*
- **Out of scope input:** mouse and desktop browser only.

## Product Decisions
- One page with season tabs, not separate pages — keeps the build small and the experience seamless.
- Season chosen by date on load — makes the page feel current.
- A bulletin board with thumbtacks — makes pins feel tangible and gives the fly-in animation a purpose.
- One solid background color per season and animations only in a few spots — avoids overwhelming people with detail.
- Tacks disappear instantly on season switch; no reshuffling animation — the learner judged moving tacks around too complicated.
- Click-to-lock on cards — lets people read and browse items without holding the mouse still.
- Desktop and mouse only — the learner clarified this is a computer web app.
- Whole-country map only — province zoom was cut in `scope.md > Explicitly Cut`.

## What We're Building
- One page: title, blurb, four season buttons, bulletin-board map of Canada.
- Intro pop-up with an X.
- Date-based default season.
- Four season themes (colors, drawings, animated touches) based on the four picture books.
- At least 5 thumbtacks per season (20+ in total) with the staggered fly-in animation from the nearest side.
- Hover card with dotted line, picture, title, and description; click-to-lock; next button for multi-item tacks; click-outside to close.
- Tacks removed immediately on season switch.

## Deferred From the POC
- Province zoom (Ontario, Toronto detail) — the learner chose a whole-country map to keep the first version small.
- Tacks that move between seasons — too complicated for now.
- Touch and phone support — the learner clarified it's a desktop web app.

## Possible Later Enhancements
- More tacks per season.
- Province zoom with detailed Toronto and Ontario content.

## Non-Goals
- No accounts, saving, or sharing; nothing needs to be remembered.
- No mobile or tablet layout.
- No multiple pages.

## Open Questions
- Which locations and items go on the tacks for each season (20+ in total)? Can be worked out during the build.
- Where pictures come from (drawn, found, or generated)? Needed by `4-spec`.
