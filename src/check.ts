import fs from "fs";
import chalk from "chalk";

function arrayExists(data: any[]) {
  if (!data || !Array.isArray(data)) {
    console.log(chalk.red.bold("Your file must contain a valid array."));
    return false;
  }
  return true;
}

function isValidArray(data: any[]) {
  const type = typeof data[0];

  if (type !== "string" && type !== "object") {
    console.log(
      chalk.red.bold("Array should only contains strings or objects.")
    );
    return false;
  }

  for (let i = 0; i < data.length; i++)
    if (typeof data[i] !== type) {
      console.log(
        chalk.red.bold("All array objects should have the same type.")
      );
      return false;
    }

  return true;
}

export default function checkInput(path: string) {
  const rawData = fs.readFileSync(path, "utf8");
  const data = JSON.parse(rawData) as string[];

  if (!arrayExists(data) || !isValidArray(data)) return null;

  return data;
}

export function checkProperties(data: any[], properties: string[]) {
  for (let i = 0; i < data.length; i++) {
    const keys = Object.keys(data[i]);
    for (let property of properties) {
      if (!keys.find(k => k === property)) {
        console.log(
          chalk.red.bold(`Object at index ${i} don't have those properties`)
        );
        return false;
      }
    }
  }
  return true;
}
