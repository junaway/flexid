"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = __importDefault(require("crypto"));
const TYPICAL_ID_SIZE = 16;
const POOL_SIZE_MULTIPLIER = 64;
const POOL_SIZE = TYPICAL_ID_SIZE * POOL_SIZE_MULTIPLIER;
const PARTITION_SIZE = POOL_SIZE / 2;
const OVERFLOW = POOL_SIZE + 1;
const MASK = 63;
let pool;
let idx;
const refresh = (partition) => {
    crypto_1.default.randomFillSync(pool, partition * PARTITION_SIZE, PARTITION_SIZE);
};
const reset = () => {
    pool = Buffer.allocUnsafe(POOL_SIZE);
    refresh(0);
    idx = 0;
};
const pop = () => {
    const decd = pool[idx++]; // eslint-disable-line no-plusplus
    if (idx === OVERFLOW) {
        idx = 0;
        refresh(1);
    }
    else if (idx === PARTITION_SIZE) {
        refresh(0);
    }
    return decd;
};
const randomizer = (alphabet, size) => {
    const generate = () => {
        let encd = "";
        while (encd.length < size) {
            encd += alphabet[pop() & MASK] || ""; // eslint-disable-line no-bitwise
        }
        return encd;
    };
    return { generate };
};
reset();
exports.default = randomizer;
