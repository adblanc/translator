import Translation from "./translate";
import askAll, { askProperties, askResultOption, askResultPath } from "./input";
import chalk from "chalk";
import clear from "clear";
import fs from "fs";
import cliProgress from "cli-progress";

const createProgressBar = () => {
  const separator = chalk.red.bold("||");
  return new cliProgress.SingleBar({
    format: `${chalk.cyan.bold(
      "Progress"
    )} ${separator} [{bar}] ${separator} {percentage}% ${separator} {value}/${chalk.magenta.bold(
      "{total}"
    )} Chunks ${separator} ETA: {eta_formatted}`,
    hideCursor: true
  });
};

const translateData = async (
  t: Translation,
  data: any[],
  properties: string[] | undefined
) => {
  const result = [];
  const bar = createProgressBar();

  bar.start(data.length, 0);

  for (let i = 0; i < data.length; i++) {
    if (!properties) result[i] = await t.getTranslation(data[i]);
    else {
      result[i] = { ...data[i] };
      for (let property of properties)
        result[i][property] = await t.getTranslation(data[i][property]);
    }
    bar.increment();
  }

  bar.stop();

  return result;
};

async function start() {
  clear();
  const { INPUT_LANG, OUTPUT_LANG, PATH } = await askAll();
  const t = await new Translation(false, INPUT_LANG, OUTPUT_LANG);

  const rawData = fs.readFileSync(PATH as string, "utf8");
  const data = JSON.parse(rawData) as string[];

  if (!data || !Array.isArray(data)) {
    console.log(chalk.red.bold("Your file must contain a valid array."));
    await t.end();
    return;
  }

  let RESULT_PATH = "";
  const { RESULT_OPTION } = await askResultOption();
  if (RESULT_OPTION === "JSON file") RESULT_PATH = await askResultPath();

  let result = undefined;
  switch (typeof data[0]) {
    case "string":
      result = await translateData(t, data, undefined);
      break;
    case "object":
      const { PROPERTIES } = await askProperties();
      result = await translateData(t, data, PROPERTIES as string[]);
      break;
    default:
      console.log(
        chalk.red.bold("Your file must contain an array of objects or strings")
      );
      await t.end();
      return;
  }

  console.log(chalk.blue.bold("Data has been successfully loaded."));

  if (RESULT_OPTION === "Console") console.log(result);
  else {
    console.log(chalk.magenta.bold("Writing the file...."));
    fs.writeFileSync(RESULT_PATH, JSON.stringify(result));
    console.log(chalk.greenBright.bold("Done"));
  }
  await t.end();
}

start();
