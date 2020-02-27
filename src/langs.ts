export interface Lang {
  name: string;
  value: string;
  flag?: string;
}

const langs: Lang[] = [
  { name: "Français", value: "FR", flag: "🇫🇷" },
  { name: "Anglais", value: "EN", flag: "🇬🇧" },
  { name: "Allemand", value: "DE", flag: "🇩🇪" },
  { name: "Espagnol", value: "ES", flag: "🇪🇸" },
  { name: "Portugais", value: "PT", flag: "🇵🇹" },
  { name: "Italien", value: "IT", flag: "🇮🇹" },
  { name: "Néerlandais", value: "NL", flag: "🇳🇱" },
  { name: "Polonais", value: "PL", flag: "🇵🇱" },
  { name: "Russe", value: "RU", flag: "🇷🇺" }
];

export default langs;
