export type ScheduleIcon =
  | "church"
  | "cheers"
  | "fork-knife"
  | "music"
  | "dance";

export type ScheduleItem = {
  time: string;
  label: string;
  icon: ScheduleIcon;
};

export type RegistryItem = {
  name: string;
  url: string;
  displayUrl: string;
};

export type HotelArea = {
  area: string;
  hotels: string[];
};

export const weddingVenue = {
  name: "Sacred Heart Catholic Church",
  addressLines: ["111 Fourth St NW", "Waseca, Minnesota, 56093"],
  fullAddress:
    "Sacred Heart Catholic Church, 111 Fourth St NW, Waseca, Minnesota, 56093",
  mapsUrl:
    "https://maps.apple.com/?q=Sacred+Heart+Catholic+Church+Waseca+MN",
  dateLabel: "October 17th, 2026",
  timeLabel: "Saturday at 2:00 PM",
  dateISO: "2026-10-17T14:00:00-05:00",
} as const;

export const weddingSchedule: ScheduleItem[] = [
  { time: "2:00", label: "Ceremony", icon: "church" },
  { time: "3:30", label: "Cocktail hour", icon: "cheers" },
  { time: "5:00", label: "Dinner and toasts", icon: "fork-knife" },
  { time: "6:30", label: "Special dances", icon: "music" },
  { time: "10:50", label: "Private last dance and send off", icon: "dance" },
];

export const weddingMenu = {
  vendor: "SMOAK — Rochester",
  items: [
    "Pulled pork and brisket sandwiches",
    "Pit beans, mac & cheese, and salad",
  ],
} as const;

export const weddingRegistries: RegistryItem[] = [
  {
    name: "Amazon",
    url: "https://www.amazon.com/wedding/share/Bice26",
    displayUrl: "www.amazon.com/wedding/share/Bice26",
  },
  {
    name: "Target",
    url: "https://www.target.com/gift-registry/gift/bicewedding2026",
    displayUrl: "www.target.com/gift-registry/gift/bicewedding2026",
  },
];

export const weddingHotels = {
  intro:
    "We did not block any rooms at hotels, but below are some recommendations around the area.",
  areas: [
    {
      area: "Mankato",
      hotels: [
        "AmericInn by Wyndham Mankato Event Center",
        "Holiday Inn Express Hotel and Suites Mankato East by IHG",
      ],
    },
    {
      area: "Owatonna",
      hotels: [
        "Baymont by Wyndham Owatonna",
        "DoubleTree by Hilton Owatonna",
      ],
    },
  ] satisfies HotelArea[],
} as const;

export const contactEmail = "bodieandabbybice@gmail.com";
