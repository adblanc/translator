import langs from "./langs";
import inquirer from "inquirer";
import fs from "fs";
import chalk from "chalk";
import clear from "clear";

const checkIfFileExists = (path: string) => {
  return fs.existsSync(path);
};

const checkIfJSON = (path: string) => {
  if (path.length < 5) return false;
  const extension = path.substring(path.length - 5, path.length);

  if (extension !== ".json") return false;
  return true;
};

const askInputLang = () => {
  const questions = [
    {
      name: "INPUT_LANG",
      type: "list",
      choices: [
        { name: "n'importe quelle langue", value: "auto" },
        ...langs.map(l => l.name)
      ],
      message: "Please, select the input language",
      filter: (val: string) => {
        const lang = langs.find(l => l.name === val);
        return lang ? lang : { name: "n'importe quelle langue", value: "auto" };
      }
    }
  ];
  return inquirer.prompt(questions);
};

const askOutPutLang = () => {
  const questions = [
    {
      name: "OUTPUT_LANG",
      type: "list",
      choices: langs.map(l => l.name),
      message: "Please, select the output language",
      filter: (val: string) => {
        const lang = langs.find(l => l.name === val);
        return lang ? lang : langs.find(l => l.value === "EN");
      }
    }
  ];
  return inquirer.prompt(questions);
};

const askPath = () => {
  const questions = [
    {
      name: "PATH",
      type: "input",
      message:
        "Please, type in the relative path to the json file you want to translate",
      validate: (path: string) => {
        if (!checkIfFileExists(path)) return "Please enter a valid path";
        if (!checkIfJSON(path)) return "Please enter a .json file";
        return true;
      },
      default: "./default.json"
    }
  ];
  return inquirer.prompt(questions);
};

const askAll = async (): Promise<any> => {
  const { INPUT_LANG } = await askInputLang();

  const { OUTPUT_LANG } = await askOutPutLang();

  if (INPUT_LANG === OUTPUT_LANG) {
    clear();
    console.log(
      chalk.red.bold("Input and output should be different, please try again.")
    );
    return askAll();
  }

  const { PATH } = await askPath();

  return {
    INPUT_LANG,
    OUTPUT_LANG,
    PATH
  };
};

export const askProperties = () => {
  const questions = [
    {
      name: "PROPERTIES",
      type: "input",
      message:
        "Please, type in the properties name of your object's array fields you want to translate separated by a comma ,",
      filter: (val: string) => {
        return val.split(",").map(c => c.trim());
      }
    }
  ];
  return inquirer.prompt(questions);
};

export const askResultOption = () => {
  const questions = [
    {
      name: "RESULT_OPTION",
      type: "list",
      choices: ["Console", "JSON file"],
      message: "Where the result should be printed out ?",
      default: "JSON file"
    }
  ];
  return inquirer.prompt(questions);
};

export const askResultPath = async () => {
  const questions = [
    {
      name: "RESULT_PATH",
      type: "input",
      message: "Please, type in the path you want for your result file",
      default: "./result.json"
    }
  ];
  const result = await inquirer.prompt(questions);
  return result.RESULT_PATH as Promise<string>;
};

export default askAll;
