"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const recorder = (offset, divider) => {
    const tick = () => ((Date.now() - offset) / divider) >>> 0; // eslint-disable-line no-bitwise
    return { tick };
};
exports.default = recorder;
