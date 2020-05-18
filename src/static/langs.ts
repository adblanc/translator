export interface Lang {
  name: string;
  value: string;
  alias: string;
  flag?: string;
}

const langs: Lang[] = [
  { name: "français", value: "FR", flag: "🇫🇷", alias: "French" },
  { name: "anglais", value: "EN", flag: "🇬🇧", alias: "English" },
  { name: "allemand", value: "DE", flag: "🇩🇪", alias: "German" },
  { name: "espagnol", value: "ES", flag: "🇪🇸", alias: "Spanish" },
  { name: "portugais", value: "PT", flag: "🇵🇹", alias: "Portuguese" },
  { name: "italien", value: "IT", flag: "🇮🇹", alias: "Italian" },
  { name: "néerlandais", value: "NL", flag: "🇳🇱", alias: "Dutch" },
  { name: "polonais", value: "PL", flag: "🇵🇱", alias: "Polish" },
  { name: "russe", value: "RU", flag: "🇷🇺", alias: "Russian" },
];

export default langs;
