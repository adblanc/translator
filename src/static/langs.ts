export interface Lang {
  name: string;
  value: string;
  alias: string;
  flag?: string;
}

const langs: Lang[] = [
  { name: "Français", value: "FR", flag: "🇫🇷", alias: "French" },
  { name: "Anglais", value: "EN", flag: "🇬🇧", alias: "English" },
  { name: "Allemand", value: "DE", flag: "🇩🇪", alias: "German" },
  { name: "Espagnol", value: "ES", flag: "🇪🇸", alias: "Spanish" },
  { name: "Portugais", value: "PT", flag: "🇵🇹", alias: "Portuguese" },
  { name: "Italien", value: "IT", flag: "🇮🇹", alias: "Italian" },
  { name: "Néerlandais", value: "NL", flag: "🇳🇱", alias: "Dutch" },
  { name: "Polonais", value: "PL", flag: "🇵🇱", alias: "Polish" },
  { name: "Russe", value: "RU", flag: "🇷🇺", alias: "Russian" }
];

export default langs;
