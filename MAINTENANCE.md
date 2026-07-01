# Keeping the site up to date

This site is built with [Astro](https://astro.build) and deploys itself to
GitHub Pages whenever you push to `main`. Almost everything you'll ever change
lives in plain data files — you rarely need to touch the layout or styling.

## Running it locally

```bash
npm install      # first time only
npm run dev      # preview at http://localhost:4321/PoopsieBeanbagSite/
npm run build    # production build into dist/
```

> Requires Node 18.20+ or 20.3+ (your machine currently has Node 20).

---

## The most common jobs

### 1. Add this year's champion

Copy any file in `src/content/champions/` (e.g. `2025.md`), rename it to the new
year (`2026.md`), and edit the top section:

```yaml
---
year: 2026
lake: island               # must match an id in src/data/lakes.json
dates: "July 4th weekend, 2026"
winners: ["Name", "Name"]  # the champions
runnersUp: ["Name", "Name"]
recap: "A sentence or two about the year."
photoTag: "2026"           # ties gallery photos to this year
---
```

That's it. The **timeline**, **leaderboards**, **defending-champion** spotlight,
and the **map's year ranges** all update automatically from this file.

**Optional — add a bracket** so the year shows a "View the bracket" button:

```yaml
bracket:
  - round: "Semifinals"
    matches:
      - team1: "A & B"
        team2: "C & D"
        score1: 21
        score2: 17
        winner: 1        # 1 = team1 won, 2 = team2 won
  - round: "Final"
    matches:
      - team1: "A & B"
        team2: "E & F"
        score1: 21
        score2: 19
        winner: 1
```

### 2. Add photos

1. Drop the image files into `src/assets/gallery/` (any `.jpg/.png/.webp`).
2. List them in `src/data/gallery.json` under `photos`:

```json
{ "src": "2026-champions.jpg", "year": 2026, "caption": "The 2026 champions." }
```

Photos are automatically optimized and resized. An entry whose file isn't found
shows a tidy "Photo coming soon" placeholder instead.

### 3. Update the upcoming tournament (the "2026" page)

Edit `src/data/event.json` — date, location, format, RSVP note, and rules.
When you roll to a new year, rename `src/pages/2026.astro` to the new year and
update the nav label in `src/lib/site.ts`.

### 4. Add or edit players & their bios

Edit `src/data/players.json`. Career stats are calculated from the champion
records, so you only maintain names, nicknames, and bios here.

### 5. Edit the awards / roasts

Edit `src/data/awards.json`.

### 6. Edit Poopsie's story or the lakes

- Poopsie's tribute prose: `src/pages/poopsie.astro`
- Host lakes + map pins: `src/data/lakes.json`

---

## When the real records are ready

While the true champions and stats are being gathered, a small yellow banner
reads "Sample records shown." Once everything is real, open `src/lib/site.ts`
and set:

```ts
export const DRAFT_DATA = false;
```

The banner disappears.

## Search the code for `TODO(content)`

Anything still needing your input (Poopsie's birth year, the origin of the
"Poopsie" nickname, confirming the 2010 founding year, the official rules, the
"Agate Cup" name story) is marked with a `TODO(content)` comment.

## Deploying

Push to `main`. The GitHub Action in `.github/workflows/deploy.yml` builds and
publishes to GitHub Pages. In the repo settings, set **Settings → Pages →
Build and deployment → Source** to **GitHub Actions** (one-time setup).

The site is served at `https://mcflyatcc.github.io/PoopsieBeanbagSite/`. If you
attach a custom domain later, update `site` and `base` in `astro.config.mjs`.
