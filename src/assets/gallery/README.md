# Put photos here

Drop tournament photos into this folder (`.jpg`, `.jpeg`, `.png`, `.webp`).
Astro automatically optimizes and resizes them — originals can be full size.

Naming doesn't matter technically, but a `year-something.jpg` pattern keeps
things tidy, e.g. `2017-belly-bump.jpg`, `2024-fireworks.jpg`.

Then list each photo in `../../data/gallery.json` so it appears in the gallery:

```json
{ "src": "2017-belly-bump.jpg", "year": 2017, "caption": "A championship belly bump." }
```

- `src` must match the filename here exactly.
- `year` powers the year filter.
- `caption` is optional.

If you'd rather just dump all the files in and hand me the list, that's fine —
I can build the manifest for you.
