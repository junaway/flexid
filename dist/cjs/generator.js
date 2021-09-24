"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nanoid_1 = require("nanoid");
const recorder_js_1 = __importDefault(require("./recorder.js"));
const translator_js_1 = __importDefault(require("./translator.js"));
const YEAR_IN_MS = 31557600000; // 365.25 * 24 * 60 * 60 * 1000
const generator = (alphabet, opts = {}) => {
    const params = {
        alphabet: alphabet.length > 64
            ? Error()
            : alphabet.length < 32
                ? Error()
                : alphabet.length % 2
                    ? Error()
                    : alphabet,
        size: opts.size
            ? opts.size < 8
                ? 8
                : opts.size > 32
                    ? 32
                    : opts.size
            : 16,
        horizon: opts.horizon
            ? opts.horizon < 1
                ? 1
                : opts.horizon > 1000
                    ? 1000
                    : opts.horizon
            : 100,
        origin: opts.origin
            ? opts.origin < 0
                ? 0
                : opts.origin > Date.now()
                    ? Date.now()
                    : opts.origin
            : 1500000000000,
        resolution: opts.resolution
            ? opts.resolution < 1
                ? 1
                : opts.resolution > YEAR_IN_MS
                    ? YEAR_IN_MS
                    : opts.resolution
            : 1000,
        prefix: opts.prefix ? opts.prefix : "",
        timestamp: opts.timestamp === undefined ? true : !!opts.timestamp,
        namespace: opts.namespace ? opts.namespace : "",
        delimiter: opts.prefix ? (opts.delimiter ? opts.delimiter : "_") : "",
    };
    const base = (0, translator_js_1.default)(params.alphabet);
    const time = params.timestamp
        ? (0, recorder_js_1.default)(params.origin, params.resolution)
        : "";
    const tsize = params.timestamp
        ? Math.ceil(Math.log(params.horizon * (YEAR_IN_MS / params.resolution)) /
            Math.log(params.alphabet.length))
        : 0;
    const timestamp = params.timestamp
        ? () => base.encode(time.tick()).padStart(tsize, params.alphabet[0])
        : () => "";
    const nsize = params.namespace.length;
    const rsize = params.size - tsize - nsize;
    if (rsize < 2)
        Error();
    const randomness = (0, nanoid_1.customAlphabet)(params.alphabet, rsize);
    return () => params.prefix +
        params.delimiter +
        timestamp() +
        params.namespace +
        randomness();
};
exports.default = generator;
