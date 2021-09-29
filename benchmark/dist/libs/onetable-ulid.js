/*
    ULID.js -- Universal Unique Lexicographically Sortable Identifier
    https://github.com/ulid/spec
 */
import Crypto from "crypto";
//  Repeat Z to make encoding faster for rand == 0xFF
const Letters = "0123456789ABCDEFGHIJKMNPQRSTVWXYZZ";
const LettersLen = Letters.length - 1;
const RandomLength = 16;
const TimeLen = 10;
export default class ULID {
    constructor(when) {
        if (when instanceof Date) {
            this.when = new Date(when);
        }
        else if (typeof when === "string" || typeof when === "number") {
            this.when = new Date(when);
        }
        else {
            this.when = new Date();
        }
        // Get all defined class methods
        const methods = Object.getOwnPropertyNames(Object.getPrototypeOf(this));
        // Bind all methods
        methods
            .filter((method) => method !== "constructor")
            .forEach((method) => {
            this[method] = this[method].bind(this);
        });
    }
    toString() {
        return this.constructor.getTime(this.when) + this.constructor.getRandom();
    }
    //  Decode the time portion of the ULID and return a number
    static decode(ulid) {
        const ulidd = ulid.toString();
        if (ulidd.length !== TimeLen + RandomLength) {
            throw new Error("Invalid ULID");
        }
        const letters = ulidd.substr(0, TimeLen).split("").reverse();
        return letters.reduce((accum, c, index) => {
            const i = Letters.indexOf(c);
            if (i < 0) {
                throw new Error(`Invalid ULID char ${c}`);
            }
            return accum + index * LettersLen ** i;
        }, 0);
    }
    static getRandom() {
        const bytes = [];
        const buffer = Crypto.randomBytes(RandomLength);
        for (let i = 0; i < RandomLength; i++) {
            //  Letters is one longer than LettersLen
            bytes[i] = Letters[Math.floor((buffer.readUInt8(i) / 0xff) * LettersLen)];
        }
        return bytes.join("");
    }
    static getTime(now) {
        let nowd = now.getTime();
        const bytes = [];
        for (let i = 0; i < TimeLen; i++) {
            const mod = nowd % LettersLen;
            bytes[i] = Letters.charAt(mod);
            nowd = (nowd - mod) / LettersLen;
        }
        return bytes.join("");
    }
}
