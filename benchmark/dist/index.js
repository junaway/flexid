import { v1 as uuidv1, v4 as uuidv4 } from "uuid";
import uuid from "uuid-random";
import base from "base-x";
import short from "short-uuid";
import crypto from "crypto";
import { nanoid, customAlphabet } from "nanoid";
import ksuid from "ksuid";
import { ulid } from "ulid";
import IdGenerator from "auth0-id-generator";
import Benchmarkify from "benchmarkify";
import console from "console";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { generator, BASE } from "../../dist/mjs/index.js";
// import { generator, BASE } from "flexid";
import ULID from "./libs/onetable-ulid.js";
const { argv } = yargs(hideBin(process.argv));
// --------------------------------------------------------------------/
const benchmark = new Benchmarkify("UUID Benchmark").printHeader();
const bench = benchmark.createSuite("UUID Benchmark");
const pads = 42;
const ref = (name, func) => {
    console.log(name.padEnd(pads), func());
    bench.ref(name, () => {
        func();
    });
};
const add = (name, func) => {
    console.log(name.padEnd(pads), func());
    bench.add(name, () => {
        func();
    });
};
// --------------------------------------------------------------------/
const ALPHABET = BASE["58"];
const encoder = base(ALPHABET);
if (!argv.flexid) {
    // --------------------------------------------------------------------/
    console.log("".padStart(pads), "RFC4122-compliant UUID in UUID format");
    console.log("".padStart(pads), "-------------------------------------");
}
ref("uuidv1", uuidv1);
if (!argv.flexid) {
    add("uuidv4", uuidv4);
    add("uuid-random", uuid);
}
if (!argv.flexid) {
    // --------------------------------------------------------------------/
    console.log("".padStart(pads), "                                     ");
    console.log("".padStart(pads), "RFC4122-compliant UUID in B[X] format");
    console.log("".padStart(pads), "-------------------------------------");
    add("uuid-random.bin + base-x.encode", () => encoder.encode(uuid.bin()));
    add("short-uuid", short.generate);
}
if (!argv.flexid) {
    // --------------------------------------------------------------------/
    console.log("".padStart(pads), "                                     ");
    console.log("".padStart(pads), "Randomness             in B[X] format");
    console.log("".padStart(pads), "-------------------------------------");
    add("crypto.randomBytes + base-x.encode", () => encoder.encode(crypto.randomBytes(16)));
    add("nanoid     ", nanoid);
    const gen = new IdGenerator({
        len: 22,
        alphabet: ALPHABET,
        prefix: "",
        separator: "",
    });
    add("auth0-id-generator [22]", () => gen.get());
}
add("nanoid [22]", customAlphabet(ALPHABET, 22));
if (!argv.flexid) {
    add("nanoid [27]", customAlphabet(ALPHABET, 27));
    add("nanoid [16]", customAlphabet(ALPHABET, 16));
}
if (!argv.flexid) {
    // --------------------------------------------------------------------/
    console.log("".padStart(pads), "                                     ");
    console.log("".padStart(pads), "Timestamp & Randomness in B[X] format");
    console.log("".padStart(pads), "-------------------------------------");
    add("ulid           ", ulid);
}
const ulidOnetable = () => {
    const myULID = new ULID();
    return myULID.toString;
};
add("ulid [onetable]", ulidOnetable());
if (!argv.flexid) {
    add("ksuid          ", () => ksuid.randomSync().string);
}
add("flexid [22]    ", generator(ALPHABET, { size: 22 }));
add("flexid [27]    ", generator(ALPHABET, { size: 27 }));
add("flexid [16]    ", generator(ALPHABET, { size: 16 }));
if (!argv.flexid) {
    // --------------------------------------------------------------------/
    console.log("".padStart(pads), "                                     ");
    console.log("".padStart(pads), "Extra features from flexid           ");
    console.log("".padStart(pads), "-------------------------------------");
    add("flexid [prefix=user]     ", generator(ALPHABET, { prefix: "user" }));
    add("flexid [namespace=qEOu9F]", generator(ALPHABET, { namespace: "qEOu9F" }));
    add("flexid [resolution=24h]  ", generator(ALPHABET, { resolution: 86400000 }));
}
add("flexid [resolution=1ms]  ", generator(ALPHABET, { resolution: 1 }));
if (!argv.flexid) {
    add("flexid [timestamp=false] ", generator(ALPHABET, { timestamp: false }));
}
// --------------------------------------------------------------------/
console.log("".padStart(pads), "                                     ");
bench.run();
