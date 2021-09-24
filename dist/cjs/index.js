"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BASE = exports.translator = exports.recorder = exports.generator = void 0;
const generator_js_1 = __importDefault(require("./generator.js"));
exports.generator = generator_js_1.default;
const recorder_js_1 = __importDefault(require("./recorder.js"));
exports.recorder = recorder_js_1.default;
const translator_js_1 = __importDefault(require("./translator.js"));
exports.translator = translator_js_1.default;
const base_js_1 = __importDefault(require("./base.js"));
exports.BASE = base_js_1.default;
