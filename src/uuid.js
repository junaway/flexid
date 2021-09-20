"use strict";

// const BASE = {
//     '58': '  123456789ABCDEFGH JKLMN PQRSTUVWXYZ abcdefghijk mnopqrstuvwxyz'.replace(/\s/g, ''),
//     '60': ' 0123456789ABCDEFGHIJKLMN PQRSTUVWXYZ abcdefghijk mnopqrstuvwxyz'.replace(/\s/g, ''),
//     '62': ' 0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz'.replace(/\s/g, ''),
//     '64': '-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz'.replace(/\s/g, ''),
// };

import recorder from "./utils/timestamp.js";
import translator from "./utils/base.js";
import { customAlphabet as randomizer } from "nanoid";

const generator = (alphabet, size = 22, offset = 1500000000000, divider = 1000) => {
  size = size < 6 ? 6 : size > 32 ? 32 : size;
  alphabet =
    alphabet.length > 64
      ? new Error("ALPH>64!")
      : alphabet.length < 58
      ? new Error("ALPH<58!")
      : alphabet.length % 2
      ? new Error("ALPH%2!")
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

export { generator };
export default generator();
