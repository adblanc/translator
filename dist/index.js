"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var translate_1 = __importDefault(require("./translate"));
var input_1 = __importStar(require("./input"));
var chalk_1 = __importDefault(require("chalk"));
var clear_1 = __importDefault(require("clear"));
var fs_1 = __importDefault(require("fs"));
var cli_progress_1 = __importDefault(require("cli-progress"));
var createProgressBar = function () {
    var separator = chalk_1.default.red.bold("||");
    return new cli_progress_1.default.SingleBar({
        format: chalk_1.default.cyan.bold("Progress") + " " + separator + " [{bar}] " + separator + " {percentage}% " + separator + " {value}/" + chalk_1.default.magenta.bold("{total}") + " Chunks " + separator + " ETA: {eta_formatted}",
        hideCursor: true
    });
};
var translateData = function (t, data, properties) { return __awaiter(void 0, void 0, void 0, function () {
    var result, bar, i, _a, _b, _i, properties_1, property, _c, _d;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                result = [];
                bar = createProgressBar();
                bar.start(data.length, 0);
                i = 0;
                _e.label = 1;
            case 1:
                if (!(i < data.length)) return [3 /*break*/, 9];
                if (!!properties) return [3 /*break*/, 3];
                _a = result;
                _b = i;
                return [4 /*yield*/, t.getTranslation(data[i])];
            case 2:
                _a[_b] = _e.sent();
                return [3 /*break*/, 7];
            case 3:
                result[i] = __assign({}, data[i]);
                _i = 0, properties_1 = properties;
                _e.label = 4;
            case 4:
                if (!(_i < properties_1.length)) return [3 /*break*/, 7];
                property = properties_1[_i];
                _c = result[i];
                _d = property;
                return [4 /*yield*/, t.getTranslation(data[i][property])];
            case 5:
                _c[_d] = _e.sent();
                _e.label = 6;
            case 6:
                _i++;
                return [3 /*break*/, 4];
            case 7:
                bar.increment();
                _e.label = 8;
            case 8:
                i++;
                return [3 /*break*/, 1];
            case 9:
                bar.stop();
                return [2 /*return*/, result];
        }
    });
}); };
function start() {
    return __awaiter(this, void 0, void 0, function () {
        var _a, INPUT_LANG, OUTPUT_LANG, PATH, t, rawData, data, RESULT_PATH, RESULT_OPTION, result, _b, PROPERTIES;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    clear_1.default();
                    return [4 /*yield*/, input_1.default()];
                case 1:
                    _a = _c.sent(), INPUT_LANG = _a.INPUT_LANG, OUTPUT_LANG = _a.OUTPUT_LANG, PATH = _a.PATH;
                    return [4 /*yield*/, new translate_1.default(false, INPUT_LANG, OUTPUT_LANG)];
                case 2:
                    t = _c.sent();
                    rawData = fs_1.default.readFileSync(PATH, "utf8");
                    data = JSON.parse(rawData);
                    if (!(!data || !Array.isArray(data))) return [3 /*break*/, 4];
                    console.log(chalk_1.default.red.bold("Your file must contain a valid array."));
                    return [4 /*yield*/, t.end()];
                case 3:
                    _c.sent();
                    return [2 /*return*/];
                case 4:
                    RESULT_PATH = "";
                    return [4 /*yield*/, input_1.askResultOption()];
                case 5:
                    RESULT_OPTION = (_c.sent()).RESULT_OPTION;
                    if (!(RESULT_OPTION === "JSON file")) return [3 /*break*/, 7];
                    return [4 /*yield*/, input_1.askResultPath()];
                case 6:
                    RESULT_PATH = _c.sent();
                    _c.label = 7;
                case 7:
                    result = undefined;
                    _b = typeof data[0];
                    switch (_b) {
                        case "string": return [3 /*break*/, 8];
                        case "object": return [3 /*break*/, 10];
                    }
                    return [3 /*break*/, 13];
                case 8: return [4 /*yield*/, translateData(t, data, undefined)];
                case 9:
                    result = _c.sent();
                    return [3 /*break*/, 15];
                case 10: return [4 /*yield*/, input_1.askProperties()];
                case 11:
                    PROPERTIES = (_c.sent()).PROPERTIES;
                    return [4 /*yield*/, translateData(t, data, PROPERTIES)];
                case 12:
                    result = _c.sent();
                    return [3 /*break*/, 15];
                case 13:
                    console.log(chalk_1.default.red.bold("Your file must contain an array of objects or strings"));
                    return [4 /*yield*/, t.end()];
                case 14:
                    _c.sent();
                    return [2 /*return*/];
                case 15:
                    console.log(chalk_1.default.blue.bold("Data has been successfully loaded."));
                    if (RESULT_OPTION === "Console")
                        console.log(result);
                    else {
                        console.log(chalk_1.default.magenta.bold("Writing the file...."));
                        fs_1.default.writeFileSync(RESULT_PATH, JSON.stringify(result));
                        console.log(chalk_1.default.greenBright.bold("Done"));
                    }
                    return [4 /*yield*/, t.end()];
                case 16:
                    _c.sent();
                    return [2 /*return*/];
            }
        });
    });
}
start();
