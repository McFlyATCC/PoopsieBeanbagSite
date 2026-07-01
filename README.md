# Poopsie Beanbag Invitational

A memorial and celebration site for the **Poopsie Beanbag Invitational** — a
July 4th–weekend bean bag tournament on the lakes of Minnesota, held in honor of
Dennis "Poopsie" Burski.

It's part tribute, part living archive of every champion and photo, and part
home base for each summer's tournament.

## Pages

- **Home** — the crest, a countdown to July 4th, and the defending champions.
- **Poopsie** — the tribute to Grandpa Burski.
- **Champions** — an animated timeline of every year, brackets, and a map of the three host lakes.
- **Gallery** — photos by year, with a lightbox.
- **Stats** — playful-roast awards and leaderboards derived from the records.
- **2026** — this year's date, location, and rules.

## Tech

- [Astro](https://astro.build) (static site) + Tailwind CSS v4
- Self-hosted fonts: Zilla Slab · Spectral · Oswald
- Deploys to GitHub Pages via GitHub Actions

## Develop

```bash
npm install
npm run dev      # http://localhost:4321/PoopsieBeanbagSite/
npm run build    # production build → dist/
```

## Updating the site

See **[MAINTENANCE.md](./MAINTENANCE.md)** — adding a champion, photos, or
updating this year's tournament is a one-file edit. Content still needed is
marked with `TODO(content)` comments throughout.

---

*In loving memory of Dennis "Poopsie" Burski. Still smiling over every toss.*
