import { defineCollection, z } from "astro:content";
import { glob, file } from "astro/loaders";

/**
 * champions/ — one Markdown file per tournament year.
 * Frontmatter holds the structured record; the body is an optional recap.
 * To add a year: copy any file in src/content/champions/, rename to YYYY.md,
 * and edit the frontmatter. Everything else (timeline, leaderboards, map,
 * defending champ) updates automatically.
 */
const champions = defineCollection({
  loader: glob({ pattern: "*.md", base: "./src/content/champions" }),
  schema: z.object({
    year: z.number(),
    lake: z.string(), // must match an `id` in src/data/lakes.json
    dates: z.string().optional(),
    winners: z.array(z.string()).min(1), // player names, e.g. ["Poopsie", "Pat"]
    runnersUp: z.array(z.string()).default([]),
    recap: z.string().optional(), // one or two sentences about the year
    photoTag: z.string().optional(), // ties gallery photos to this year
    // Optional bracket. When omitted, the year shows a "winners only" summary.
    bracket: z
      .array(
        z.object({
          round: z.string(),
          matches: z.array(
            z.object({
              team1: z.string(),
              team2: z.string(),
              score1: z.number().optional(),
              score2: z.number().optional(),
              winner: z.union([z.literal(1), z.literal(2)]).optional(),
            }),
          ),
        }),
      )
      .optional(),
  }),
});

/** players.json — roster + bios. Career stats are DERIVED from champions. */
const players = defineCollection({
  loader: file("./src/data/players.json"),
  schema: z.object({
    id: z.string(),
    name: z.string(),
    nickname: z.string().optional(),
    bio: z.string().optional(),
  }),
});

/** lakes.json — host venues, with % coordinates on the Minnesota map. */
const lakes = defineCollection({
  loader: file("./src/data/lakes.json"),
  schema: z.object({
    id: z.string(),
    name: z.string(),
    region: z.string().optional(),
    blurb: z.string(),
    x: z.number(), // 0–100, horizontal % on the MN svg
    y: z.number(), // 0–100, vertical % on the MN svg
  }),
});

/** awards.json — authored, playful-roast superlatives for the Stats page. */
const awards = defineCollection({
  loader: file("./src/data/awards.json"),
  schema: z.object({
    id: z.string(),
    emoji: z.string(),
    title: z.string(),
    recipient: z.string(),
    blurb: z.string(),
  }),
});

export const collections = { champions, players, lakes, awards };
