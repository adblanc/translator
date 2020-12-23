export interface Lang {
  name: string;
  inputValue: string;
  outputValue: string;
  alias: string;
  flag?: string;
}

const langs: Lang[] = [
  {
    name: "anglais",
    inputValue: "en",
    outputValue: "en-US",
    flag: "🇬🇧",
    alias: "English",
  },
  {
    name: "français",
    inputValue: "fr",
    outputValue: "fr-FR",
    flag: "🇫🇷",
    alias: "French",
  },
  {
    name: "allemand",
    inputValue: "de",
    outputValue: "de-DE",
    flag: "🇩🇪",
    alias: "German",
  },
  {
    name: "espagnol",
    inputValue: "es",
    outputValue: "es-ES",
    flag: "🇪🇸",
    alias: "Spanish",
  },
  {
    name: "portugais",
    inputValue: "pt",
    outputValue: "pt-PT",
    flag: "🇵🇹",
    alias: "Portuguese",
  },
  {
    name: "italien",
    inputValue: "it",
    outputValue: "it-IT",
    flag: "🇮🇹",
    alias: "Italian",
  },
  {
    name: "néerlandais",
    inputValue: "nl",
    outputValue: "nl-NL",
    flag: "🇳🇱",
    alias: "Dutch",
  },
  {
    name: "polonais",
    inputValue: "pl",
    outputValue: "pl-PL",
    flag: "🇵🇱",
    alias: "Polish",
  },
  {
    name: "russe",
    inputValue: "ru",
    outputValue: "ru-RU",
    flag: "🇷🇺",
    alias: "Russian",
  },
];

export default langs;
