import { getCollection, type CollectionEntry } from "astro:content";

export type ChampionEntry = CollectionEntry<"champions">;

/** All tournament years, oldest → newest. */
export async function getChampions(): Promise<ChampionEntry[]> {
  const all = await getCollection("champions");
  return all.sort((a, b) => a.data.year - b.data.year);
}

export interface PlayerRecord {
  name: string;
  championships: number;
  runnerUps: number;
  finals: number; // total finals reached (wins + runner-up)
  titleYears: number[];
}

/** Roll up every finalist across all years into per-player records. */
export function playerRecords(champs: ChampionEntry[]): PlayerRecord[] {
  const map = new Map<string, PlayerRecord>();
  const ensure = (name: string): PlayerRecord => {
    let r = map.get(name);
    if (!r) {
      r = { name, championships: 0, runnerUps: 0, finals: 0, titleYears: [] };
      map.set(name, r);
    }
    return r;
  };
  for (const c of champs) {
    for (const w of c.data.winners) {
      const r = ensure(w);
      r.championships++;
      r.finals++;
      r.titleYears.push(c.data.year);
    }
    for (const w of c.data.runnersUp) {
      const r = ensure(w);
      r.runnerUps++;
      r.finals++;
    }
  }
  return [...map.values()];
}

/** Leaderboard by championships, then finals reached, then name. */
export function topChampions(champs: ChampionEntry[], limit = 8): PlayerRecord[] {
  return playerRecords(champs)
    .sort(
      (a, b) =>
        b.championships - a.championships ||
        b.finals - a.finals ||
        a.name.localeCompare(b.name),
    )
    .slice(0, limit);
}

export interface DuoRecord {
  players: [string, string];
  titles: number;
  years: number[];
}

/** Winning duos, ranked by titles won together. */
export function topDuos(champs: ChampionEntry[], limit = 5): DuoRecord[] {
  const map = new Map<string, DuoRecord>();
  for (const c of champs) {
    const w = [...c.data.winners].sort((a, b) => a.localeCompare(b));
    if (w.length < 2) continue;
    const pair: [string, string] = [w[0], w[1]];
    const key = pair.join("|");
    let d = map.get(key);
    if (!d) {
      d = { players: pair, titles: 0, years: [] };
      map.set(key, d);
    }
    d.titles++;
    d.years.push(c.data.year);
  }
  return [...map.values()]
    .sort((a, b) => b.titles - a.titles || b.years[0] - a.years[0])
    .slice(0, limit);
}

/** The most recent champions — the ones defending the Cup this year. */
export function defendingChampion(champs: ChampionEntry[]): ChampionEntry | null {
  return champs.length ? champs[champs.length - 1] : null;
}

/** Quick headline numbers for the site. */
export function summary(champs: ChampionEntry[]) {
  const years = champs.map((c) => c.data.year);
  const lakes = new Set(champs.map((c) => c.data.lake));
  return {
    tournaments: champs.length,
    firstYear: Math.min(...years),
    lastYear: Math.max(...years),
    lakeCount: lakes.size,
    uniqueFinalists: playerRecords(champs).length,
  };
}
