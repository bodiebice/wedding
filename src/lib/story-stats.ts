export type StoryStat = {
  headline: string;
  subtext: string;
  accent: "green" | "accent" | "cream" | "ink";
};

export const storyStats: StoryStat[] = [
  {
    headline: "",
    subtext: "The year we met — and everything changed.",
    accent: "green",
  },
  {
    headline: "First date",
    subtext: "Coffee, laughter, and a very long goodbye.",
    accent: "accent",
  },
  {
    headline: "Countless adventures",
    subtext: "Road trips, game nights, and growing together.",
    accent: "cream",
  },
  {
    headline: "Forever starts",
    subtext: "October 17, 2026 — we can't wait to celebrate with you.",
    accent: "ink",
  },
];

export const storyStatsExtended: StoryStat[] = [
  ...storyStats,
  {
    headline: "Our song",
    subtext: "The one that always makes us smile — ask us at the wedding!",
    accent: "green",
  },
  {
    headline: "Favorite tradition",
    subtext: "Sunday mornings, good food, and nowhere to be.",
    accent: "accent",
  },
  {
    headline: "What's next",
    subtext: "Building a home, making memories, and saying yes to every adventure.",
    accent: "cream",
  },
];
