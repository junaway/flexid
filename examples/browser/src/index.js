import { generator, BASE } from "flexid";

function component() {
  const element = document.createElement("div");

  const alphabet = BASE["58"];
  const opts = {
    // --------------- DEFAULTS // DEFINITIONS
    size: 16, // Total ID size.
    horizon: 100, // Number of years before overflow,
    origin: 1500000000000, // starting from this epoch.
    resolution: 1000, // Time resolution, in milliseconds.
    timestamp: true, // Whether to add a timestamp at all.
    prefix: "hello_world", // ID prefix (optional),
    delimiter: "!", // and its delimiter.
    namespace: "", // ID namespace (optional).
    // ------------------------ //
  };
  const flexid = generator(alphabet, opts);

  const id = flexid();

  console.log(id);

  element.innerHTML = id;

  return element;
}

document.body.appendChild(component());
