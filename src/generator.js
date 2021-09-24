import { customAlphabet as randomizer } from "nanoid";
import recorder from "./recorder.js";
import translator from "./translator.js";

const generator = (
  alphabet,
  size = 22,
  offset = 1500000000000,
  divider = 1000
) => {
  const gsize = size < 8 ? 8 : size > 32 ? 32 : size;
  const galphabet =
    alphabet.length > 64
      ? Error()
      : alphabet.length < 32
      ? Error()
      : alphabet.length % 2
      ? Error()
      : alphabet;
  const goffset = offset > Date.now() ? Date.now() : offset;
  const gdivider = divider < 100 ? 100 : divider > 3600000 ? 3600000 : divider;

  const time = recorder(goffset, gdivider);
  const base = translator(galphabet);
  const payload = randomizer(galphabet, gsize - 6);
  const header = () => base.encode(time.tick()).padStart(6, galphabet[0]);

  return () => header() + payload();
};

export default generator;
