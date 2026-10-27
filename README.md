# Four Seasons of Canada

An interactive, storybook-style page that teaches the four seasons through a bulletin-board map of Canada. Pick a season and its page transforms, then hover or click the thumbtacks to learn what is unique to Canada in that season.

Built with React, TypeScript and Vite. Desktop browser with a mouse; nothing is saved and there is no server.

## Run it

You need a current Node.js LTS.

```
npm install
npm run dev
```

Open the address it prints (usually http://localhost:5173).

## Where things live

- `src/data/seasons.ts` holds every tack: its season, map position, and card text and pictures. Change content there.
- `src/components/` holds the pieces of the page (buttons, intro pop-up, map board, tacks, cards, season decor).
- `src/styles/` holds the looks: `themes.css` (colors per season), `animations.css` (motion), `global.css` (layout).
- `public/images/` holds the pictures and the map.

## Credits

Pictures and the map come from Wikimedia Commons; see `public/images/SOURCES.md` for each file's page and licence. This is a learning project, so check those licences before publishing it anywhere.
