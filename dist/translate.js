"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var puppeteer_1 = __importDefault(require("puppeteer"));
var URL = "https://www.deepl.com/fr/translator";
var LANGS_SELECTOR = {
    input: {
        button: "#dl_translator > div.lmt__sides_container > div.lmt__side_container.lmt__side_container--source > div.lmt__language_container > div > button",
        lang: "#dl_translator > div.lmt__sides_container > div.lmt__side_container.lmt__side_container--source > div.lmt__language_container > div > div > button[dl-value=${LANG}]",
        text: "#dl_translator > div.lmt__sides_container > div.lmt__side_container.lmt__side_container--source > div.lmt__language_container > div > button > span > strong"
    },
    output: {
        button: "#dl_translator > div.lmt__sides_container > div.lmt__side_container.lmt__side_container--target > div.lmt__language_container > div > button",
        lang: "#dl_translator > div.lmt__sides_container > div.lmt__side_container.lmt__side_container--target > div.lmt__language_container > div > div > button[dl-value=${LANG}]",
        text: "#dl_translator > div.lmt__sides_container > div.lmt__side_container.lmt__side_container--target > div.lmt__language_container > div > button > span > strong"
    }
};
var INPUT_SELECTOR = "#dl_translator > div.lmt__sides_container > div.lmt__side_container.lmt__side_container--source > div.lmt__textarea_container > div > textarea";
var OUTPUT_SELECTOR = "#dl_translator > div.lmt__sides_container > div.lmt__side_container.lmt__side_container--target > div.lmt__textarea_container > div.lmt__inner_textarea_container > textarea";
var Translate = /** @class */ (function () {
    function Translate(headless, input, output) {
        var _this = this;
        this.input = input;
        this.output = output;
        //@ts-ignore
        return (function () { return __awaiter(_this, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this.initBrowser(headless)];
                    case 1:
                        _a.browser = _c.sent();
                        _b = this;
                        return [4 /*yield*/, this.initPage()];
                    case 2:
                        _b.page = _c.sent();
                        return [2 /*return*/, this];
                }
            });
        }); })();
    }
    Translate.prototype.initBrowser = function (headless) {
        return puppeteer_1.default.launch({ headless: headless });
    };
    Translate.prototype.end = function () {
        return this.browser.close();
    };
    Translate.prototype.initPage = function () {
        return __awaiter(this, void 0, void 0, function () {
            var page;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.browser.newPage()];
                    case 1:
                        page = _a.sent();
                        return [4 /*yield*/, page.goto(URL)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.changeInputLang(page)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.changeOutputLang(page)];
                    case 4:
                        _a.sent();
                        return [2 /*return*/, page];
                }
            });
        });
    };
    Translate.prototype.changeInputLang = function (page) {
        return __awaiter(this, void 0, void 0, function () {
            var LANG_INPUT_SELECTOR;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        LANG_INPUT_SELECTOR = LANGS_SELECTOR.input.lang.replace("${LANG}", this.input.value);
                        return [4 /*yield*/, page.click(LANGS_SELECTOR.input.button)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, page.waitForSelector(LANG_INPUT_SELECTOR, { visible: true })];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, page.click(LANG_INPUT_SELECTOR)];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Translate.prototype.changeOutputLang = function (page) {
        return __awaiter(this, void 0, void 0, function () {
            var LANG_OUTPUT_SELECTOR;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        LANG_OUTPUT_SELECTOR = LANGS_SELECTOR.output.lang.replace("${LANG}", this.output.value);
                        return [4 /*yield*/, page.click(LANGS_SELECTOR.output.button)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, page.waitForSelector(LANG_OUTPUT_SELECTOR, { visible: true })];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, page.click(LANG_OUTPUT_SELECTOR)];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Translate.prototype.clearInput = function (selector) {
        return __awaiter(this, void 0, void 0, function () {
            var page;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        page = this.page;
                        return [4 /*yield*/, page.focus(selector)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, page.keyboard.down("Control")];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, page.keyboard.press("A")];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, page.keyboard.up("Control")];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, page.keyboard.press("Backspace")];
                    case 5:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Translate.prototype.isTranslating = function () {
        return __awaiter(this, void 0, void 0, function () {
            var page, el, classEl, className;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        page = this.page;
                        return [4 /*yield*/, page.$("#dl_translator")];
                    case 1:
                        el = (_a.sent());
                        return [4 /*yield*/, el.getProperty("className")];
                    case 2:
                        classEl = _a.sent();
                        return [4 /*yield*/, classEl.jsonValue()];
                    case 3:
                        className = (_a.sent());
                        return [2 /*return*/, className.includes("active_translation_request")];
                }
            });
        });
    };
    Translate.prototype.waitTranslation = function () {
        return __awaiter(this, void 0, void 0, function () {
            var page;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        page = this.page;
                        _a.label = 1;
                    case 1: return [4 /*yield*/, this.isTranslating()];
                    case 2:
                        if (!_a.sent()) return [3 /*break*/, 4];
                        return [4 /*yield*/, page.waitFor(1000)];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Translate.prototype.checkLang = function () {
        return __awaiter(this, void 0, void 0, function () {
            var page, inputLang, outputLang;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        page = this.page;
                        return [4 /*yield*/, page.$eval(LANGS_SELECTOR.input.text, function (el) { return el.textContent; })];
                    case 1:
                        inputLang = _a.sent();
                        return [4 /*yield*/, page.$eval(LANGS_SELECTOR.output.text, function (el) { return el.textContent; })];
                    case 2:
                        outputLang = _a.sent();
                        if (!(inputLang !== this.input.name)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.changeInputLang(this.page)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        if (!(outputLang !== this.output.name)) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.changeOutputLang(this.page)];
                    case 5:
                        _a.sent();
                        _a.label = 6;
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    Translate.prototype.getTranslation = function (sentence) {
        return __awaiter(this, void 0, void 0, function () {
            var page, value;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        page = this.page;
                        value = undefined;
                        return [4 /*yield*/, this.checkLang()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.clearInput(OUTPUT_SELECTOR)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.clearInput(INPUT_SELECTOR)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, page.type(INPUT_SELECTOR, sentence)];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5:
                        if (!!value) return [3 /*break*/, 9];
                        return [4 /*yield*/, this.waitTranslation()];
                    case 6:
                        _a.sent();
                        return [4 /*yield*/, page.waitFor(1000)];
                    case 7:
                        _a.sent();
                        return [4 /*yield*/, page.$eval(OUTPUT_SELECTOR, function (el, sentence) {
                                if (el.value && !el.value.includes("[...]"))
                                    return el.value;
                                return null;
                            }, sentence)];
                    case 8:
                        value = _a.sent();
                        return [3 /*break*/, 5];
                    case 9: return [2 /*return*/, value];
                }
            });
        });
    };
    return Translate;
}());
exports.default = Translate;
