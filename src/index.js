"use strict";

const recorder = require("./utils/timestamp");
const translator = require("./utils/base");
const { customAlphabet: randomizer } = require("nanoid");

const BASE = {
  "48": "    34 6789ABCDEFGH JKLMN PQR TUVWXY  abcdefghijk mn pqr t  wxyz".replace(
    /\s/g,
    "",
  ),
  "58": "  123456789ABCDEFGH JKLMN PQRSTUVWXYZ abcdefghijk mnopqrstuvwxyz".replace(
    /\s/g,
    "",
  ),
  "60": " 0123456789ABCDEFGHIJKLMN PQRSTUVWXYZ abcdefghijk mnopqrstuvwxyz".replace(
    /\s/g,
    "",
  ),
  "62": " 0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz".replace(
    /\s/g,
    "",
  ),
  "64": "-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz".replace(
    /\s/g,
    "",
  ),
};

const generator = (
  size = 22,
  alphabet = BASE["58"],
  offset = 1500000000000,
  divider = 1000,
) => {
  size = size < 8 ? 8 : size > 32 ? 32 : size;
  alphabet = alphabet;
  alphabet =
    alphabet.length > 64
      ? BASE["64"]
      : alphabet.length < 48
      ? BASE["48"]
      : alphabet.length % 2
      ? BASE[alphabet.length - (alphabet.length % 2)]
      : alphabet;
  offset = offset > Date.now() ? Date.now() : offset;
  divider = divider < 100 ? 100 : divider > 3600000 ? 3600000 : divider;

  const time = recorder(offset, divider);
  const base = translator(alphabet);
  const payload = randomizer(alphabet, size - 6);
  const header = () => {
    return base.encode(time.tick()).padStart(6, alphabet[0]);
  };

  return () => {
    return header() + payload();
  };
};

module.exports = { flexid: generator(), generator, BASE };
