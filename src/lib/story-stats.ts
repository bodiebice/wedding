export type StoryStat = {
  headline: string;
  subtext: string;
  accent: "green" | "accent" | "cream" | "ink";
};

export const storyStats: StoryStat[] = [
  {
    headline: "12",
    subtext: "Seasons of TV Watched.",
    accent: "accent",
  },
  {
    headline: "3",
    subtext: "Concerts/Festivals Attended.",
    accent: "cream",
  },
  {
    headline: "1,707",
    subtext: "Miles driven moving across the country.",
    accent: "accent",
  },
  {
    headline: "6",
    subtext: "Ski day-trips taken across Minnesota.",
    accent: "cream",
  },
  {
    headline: "7",
    subtext: "Trips taken together.",
    accent: "accent",
  }
];