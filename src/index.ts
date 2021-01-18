import chalk from "chalk";
import fs from "fs";
import cliProgress from "cli-progress";
import Translation from "./translate";
import askAll, { askProperties, askResultOption, askResultPath } from "./input";
import checkInput, { checkProperties } from "./check";
import commander, { Command, option } from "commander";
import langs from "./static/langs";

const createProgressBar = () => {
  const separator = chalk.red.bold("||");
  return new cliProgress.SingleBar({
    format: `${chalk.cyan.bold(
      "Progress"
    )} ${separator} [{bar}] ${separator} {percentage}% ${separator} {value}/${chalk.magenta.bold(
      "{total}"
    )} Chunks ${separator} ETA: {eta_formatted}`,
    hideCursor: true,
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

const program = new Command();

program
  .option("-i, --input <input>", "json file to process")
  .option("-o, --output <console|path-to-file>", "output display")
  .option(
    "-li, --lang-input <lang_input>",
    langs.map((l) => l.inputValue).join(" | ")
  )
  .option(
    "-lo, --lang-output <lang_output>",
    langs.map((l) => l.outputValue).join(" | ")
  )
  .option(
    "-pt, --properties-to-translate <property,property>",
    "specify your object properties you want to translate, separated by ,"
  )
  .option("-int, --interactive", "interactive mode");

program.parse(process.argv);

async function start() {
  const options = program.opts();

  if (options.interactive) {
    const { INPUT_LANG, OUTPUT_LANG, PATH } = await askAll();

    options.langInput = INPUT_LANG;
    options.langOutput = OUTPUT_LANG;
    options.input = PATH;
  } else {
    options.langInput = langs.find((l) => l.inputValue === options.langInput);
    options.langOutput = langs.find(
      (l) => l.outputValue === options.langOutput
    );
    if (
      !options.input ||
      !options.output ||
      !options.langInput ||
      !options.langOutput
    ) {
      program.help();
    }
  }

  const data = checkInput(options.input);
  if (!data) return;
  console.log(chalk.blue.bold("Data has been successfully loaded."));

  let properties = undefined;

  if (typeof data[0] !== "object") {
  } else {
    if (options.interactive) {
      properties = await askProperties();
    } else if (!options.propertiesToTranslate) {
      return console.log(
        chalk.red.bold(
          "use -pt or --properties-to-translate when passing an array of objects"
        )
      );
    } else {
      properties = options.propertiesToTranslate
        .split(",")
        .map((c: string) => c.trim());
    }

    if (!checkProperties(data, properties)) return;
  }

  if (options.interactive) {
    const { RESULT_OPTION } = await askResultOption();

    if (RESULT_OPTION === "JSON file") {
      options.ouput = await askResultPath();
    }
  }

  const t = await new Translation(true, options.langInput, options.langOutput);

  let result = await translateData(t, data, properties);

  if (options.ouput === "console") console.log(result);
  else {
    console.log(chalk.magenta.bold("Writing the file...."));
    fs.writeFileSync(options.output, JSON.stringify(result));
    console.log(chalk.greenBright.bold("Done"));
  }
  await t.end();
}

start();
