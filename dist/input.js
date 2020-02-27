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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var langs_1 = __importDefault(require("./langs"));
var inquirer_1 = __importDefault(require("inquirer"));
var fs_1 = __importDefault(require("fs"));
var chalk_1 = __importDefault(require("chalk"));
var clear_1 = __importDefault(require("clear"));
var checkIfFileExists = function (path) {
    return fs_1.default.existsSync(path);
};
var checkIfJSON = function (path) {
    if (path.length < 5)
        return false;
    var extension = path.substring(path.length - 5, path.length);
    if (extension !== ".json")
        return false;
    return true;
};
var askInputLang = function () {
    var questions = [
        {
            name: "INPUT_LANG",
            type: "list",
            choices: __spreadArrays([
                { name: "n'importe quelle langue", value: "auto" }
            ], langs_1.default.map(function (l) { return l.name; })),
            message: "Please, select the input language",
            filter: function (val) {
                var lang = langs_1.default.find(function (l) { return l.name === val; });
                return lang ? lang : { name: "n'importe quelle langue", value: "auto" };
            }
        }
    ];
    return inquirer_1.default.prompt(questions);
};
var askOutPutLang = function () {
    var questions = [
        {
            name: "OUTPUT_LANG",
            type: "list",
            choices: langs_1.default.map(function (l) { return l.name; }),
            message: "Please, select the output language",
            filter: function (val) {
                var lang = langs_1.default.find(function (l) { return l.name === val; });
                return lang ? lang : langs_1.default.find(function (l) { return l.value === "EN"; });
            }
        }
    ];
    return inquirer_1.default.prompt(questions);
};
var askPath = function () {
    var questions = [
        {
            name: "PATH",
            type: "input",
            message: "Please, type in the relative path to the json file you want to translate",
            validate: function (path) {
                if (!checkIfFileExists(path))
                    return "Please enter a valid path";
                if (!checkIfJSON(path))
                    return "Please enter a .json file";
                return true;
            },
            default: "./default.json"
        }
    ];
    return inquirer_1.default.prompt(questions);
};
var askAll = function () { return __awaiter(void 0, void 0, void 0, function () {
    var INPUT_LANG, OUTPUT_LANG, PATH;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, askInputLang()];
            case 1:
                INPUT_LANG = (_a.sent()).INPUT_LANG;
                return [4 /*yield*/, askOutPutLang()];
            case 2:
                OUTPUT_LANG = (_a.sent()).OUTPUT_LANG;
                if (INPUT_LANG === OUTPUT_LANG) {
                    clear_1.default();
                    console.log(chalk_1.default.red.bold("Input and output should be different, please try again."));
                    return [2 /*return*/, askAll()];
                }
                return [4 /*yield*/, askPath()];
            case 3:
                PATH = (_a.sent()).PATH;
                return [2 /*return*/, {
                        INPUT_LANG: INPUT_LANG,
                        OUTPUT_LANG: OUTPUT_LANG,
                        PATH: PATH
                    }];
        }
    });
}); };
exports.askProperties = function () {
    var questions = [
        {
            name: "PROPERTIES",
            type: "input",
            message: "Please, type in the properties name of your object's array fields you want to translate separated by a comma ,",
            filter: function (val) {
                return val.split(",").map(function (c) { return c.trim(); });
            }
        }
    ];
    return inquirer_1.default.prompt(questions);
};
exports.askResultOption = function () {
    var questions = [
        {
            name: "RESULT_OPTION",
            type: "list",
            choices: ["Console", "JSON file"],
            message: "Where the result should be printed out ?",
            default: "JSON file"
        }
    ];
    return inquirer_1.default.prompt(questions);
};
exports.askResultPath = function () { return __awaiter(void 0, void 0, void 0, function () {
    var questions, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                questions = [
                    {
                        name: "RESULT_PATH",
                        type: "input",
                        message: "Please, type in the path you want for your result file",
                        default: "./result.json"
                    }
                ];
                return [4 /*yield*/, inquirer_1.default.prompt(questions)];
            case 1:
                result = _a.sent();
                return [2 /*return*/, result.RESULT_PATH];
        }
    });
}); };
exports.default = askAll;
