# Champions photos

Put photos of the winners / champions here (`.jpg`, `.jpeg`, `.png`, `.webp`) —
kept separate from the general gallery photos in the parent folder.

To show one in the gallery, add it to `../../../data/gallery.json` with the
`champions/` prefix on `src`:

```json
{ "src": "champions/2017-poopsie-pat.jpg", "year": 2017, "caption": "2017 champions: Poopsie & Pat." }
```

(Photos in this folder are picked up automatically; the `src` in the manifest
just needs to match the path relative to `src/assets/gallery/`.)
