import puppeteer from "puppeteer";
import { Lang } from "./static/langs";
const URL = "https://www.deepl.com/fr/translator";

const LANGS_SELECTOR = {
  input: {
    button:
      "#dl_translator > div.lmt__sides_container > div.lmt__side_container.lmt__side_container--source > div.lmt__language_container > div > button",
    lang:
      "#dl_translator > div.lmt__sides_container > div.lmt__side_container.lmt__side_container--source > div.lmt__language_container > div > div > button[dl-value=${LANG}]",
    text:
      "#dl_translator > div.lmt__sides_container > div.lmt__side_container.lmt__side_container--source > div.lmt__language_container > div > button > span > strong"
  },
  output: {
    button:
      "#dl_translator > div.lmt__sides_container > div.lmt__side_container.lmt__side_container--target > div.lmt__language_container > div > button",
    lang:
      "#dl_translator > div.lmt__sides_container > div.lmt__side_container.lmt__side_container--target > div.lmt__language_container > div > div > button[dl-value=${LANG}]",
    text:
      "#dl_translator > div.lmt__sides_container > div.lmt__side_container.lmt__side_container--target > div.lmt__language_container > div > button > span > strong"
  }
};

const INPUT_SELECTOR =
  "#dl_translator > div.lmt__sides_container > div.lmt__side_container.lmt__side_container--source > div.lmt__textarea_container > div > textarea";

const OUTPUT_SELECTOR =
  "#dl_translator > div.lmt__sides_container > div.lmt__side_container.lmt__side_container--target > div.lmt__textarea_container > div.lmt__inner_textarea_container > textarea";

export default class Translate {
  //@ts-ignore
  page: puppeteer.Page;
  //@ts-ignore
  browser: puppeteer.Browser;
  input: Lang;
  output: Lang;
  constructor(headless: boolean, input: Lang, output: Lang) {
    this.input = input;
    this.output = output;
    //@ts-ignore
    return (async () => {
      this.browser = await this.initBrowser(headless);
      this.page = await this.initPage();
      return this;
    })();
  }

  private initBrowser(headless: boolean) {
    return puppeteer.launch({ headless });
  }

  public end() {
    return this.browser.close();
  }

  private async initPage() {
    const page = await this.browser.newPage();
    await page.goto(URL);

    await this.changeInputLang(page);
    await this.changeOutputLang(page);

    return page;
  }

  private async changeInputLang(page: puppeteer.Page) {
    const LANG_INPUT_SELECTOR = LANGS_SELECTOR.input.lang.replace(
      "${LANG}",
      this.input.value
    );

    await page.click(LANGS_SELECTOR.input.button);
    await page.waitForSelector(LANG_INPUT_SELECTOR, { visible: true });
    await page.click(LANG_INPUT_SELECTOR);
  }

  private async changeOutputLang(page: puppeteer.Page) {
    const LANG_OUTPUT_SELECTOR = LANGS_SELECTOR.output.lang.replace(
      "${LANG}",
      this.output.value
    );

    await page.click(LANGS_SELECTOR.output.button);
    await page.waitForSelector(LANG_OUTPUT_SELECTOR, { visible: true });
    await page.click(LANG_OUTPUT_SELECTOR);
  }

  private async clearInput(selector: string) {
    const { page } = this;

    await page.focus(selector);
    await page.keyboard.down("Control");
    await page.keyboard.press("A");
    await page.keyboard.up("Control");
    await page.keyboard.press("Backspace");
  }

  private async isTranslating() {
    const { page } = this;

    const el = (await page.$("#dl_translator")) as puppeteer.ElementHandle<
      Element
    >;
    const classEl = await el.getProperty("className");

    const className = (await classEl.jsonValue()) as string;

    return className.includes("active_translation_request");
  }

  private async waitTranslation() {
    const { page } = this;

    while (await this.isTranslating()) {
      await page.waitFor(1000);
    }
  }

  private async checkLang() {
    const { page } = this;

    const inputLang = await page.$eval(
      LANGS_SELECTOR.input.text,
      el => el.textContent
    );
    const outputLang = await page.$eval(
      LANGS_SELECTOR.output.text,
      el => el.textContent
    );

    if (inputLang !== this.input.name) await this.changeInputLang(this.page);
    if (outputLang !== this.output.name) await this.changeOutputLang(this.page);
  }

  public async getTranslation(sentence: string) {
    const { page } = this;
    let value: any = undefined;

    if (!sentence.trim()) return sentence;

    await this.checkLang();
    await this.clearInput(OUTPUT_SELECTOR);
    await this.clearInput(INPUT_SELECTOR);
    await page.type(INPUT_SELECTOR, sentence);

    while (!value) {
      await this.waitTranslation();
      await page.waitFor(1000);
      value = await page.$eval(
        OUTPUT_SELECTOR,

        (el: any, sentence: string) => {
          if (el.value && !el.value.includes("[...]")) return el.value;
          return null;
        },
        sentence
      );
    }
    return value;
  }
}
