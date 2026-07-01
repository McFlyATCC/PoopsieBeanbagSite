/**
 * Site-wide constants and helpers.
 * The `base` (for GitHub Pages project hosting) is baked in via Astro's
 * import.meta.env.BASE_URL — always build internal links with withBase().
 */

const BASE = import.meta.env.BASE_URL; // e.g. "/PoopsieBeanbagSite/"

/** Prefix an app-absolute path with the configured base path. */
export function withBase(path = "/"): string {
  const b = BASE.endsWith("/") ? BASE.slice(0, -1) : BASE;
  const p = path.startsWith("/") ? path : `/${path}`;
  const joined = `${b}${p}`;
  return joined === "" ? "/" : joined;
}

export const site = {
  title: "Poopsie Beanbag Invitational",
  short: "Poopsie Invitational",
  // TODO(content): confirm the founding year — user to verify (believed 2010).
  estYear: 2010,
  tagline: "A July 4th tradition on the lakes of Minnesota",
  honoree: 'Dennis "Poopsie" Burski',
  description:
    "The memorial home of the Poopsie Beanbag Invitational — honoring Dennis “Poopsie” Burski and celebrating every champion, every summer, on the lakes of Minnesota.",
} as const;

/**
 * While the real champion/competitor records are being gathered, seeded
 * sample results are shown and a small notice is displayed. Flip to false
 * once src/content/champions and src/data are filled with real records.
 */
export const DRAFT_DATA = true;

export const nav: { label: string; href: string }[] = [
  { label: "Home", href: withBase("/") },
  { label: "Poopsie", href: withBase("/poopsie") },
  { label: "Champions", href: withBase("/champions") },
  { label: "Gallery", href: withBase("/gallery") },
  { label: "Stats", href: withBase("/stats") },
  { label: "2026", href: withBase("/2026") },
];

/**
 * The next July 4th at or after the given date (uses the 4th itself all day).
 * Deterministic + timezone-naive (local) so SSR and client agree closely.
 */
export function nextIndependenceDay(from: Date = new Date()): Date {
  const year = from.getFullYear();
  const julyFourth = new Date(year, 6, 4, 0, 0, 0);
  // If we're past this year's celebration window, roll to next year.
  const endOfHoliday = new Date(year, 6, 5, 0, 0, 0);
  return from >= endOfHoliday ? new Date(year + 1, 6, 4, 0, 0, 0) : julyFourth;
}
