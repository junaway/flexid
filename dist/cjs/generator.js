"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nanoid_1 = require("nanoid");
const recorder_js_1 = __importDefault(require("./recorder.js"));
const translator_js_1 = __importDefault(require("./translator.js"));
const generator = (alphabet, size = 22, offset = 1500000000000, divider = 1000) => {
    const gsize = size < 8 ? 8 : size > 32 ? 32 : size;
    const galphabet = alphabet.length > 64
        ? Error()
        : alphabet.length < 32
            ? Error()
            : alphabet.length % 2
                ? Error()
                : alphabet;
    const goffset = offset > Date.now() ? Date.now() : offset;
    const gdivider = divider < 100 ? 100 : divider > 3600000 ? 3600000 : divider;
    const time = (0, recorder_js_1.default)(goffset, gdivider);
    const base = (0, translator_js_1.default)(galphabet);
    const payload = (0, nanoid_1.customAlphabet)(galphabet, gsize - 6);
    const header = () => base.encode(time.tick()).padStart(6, galphabet[0]);
    return () => header() + payload();
};
exports.default = generator;
