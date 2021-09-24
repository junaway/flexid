# flexid
A tiny, fast, sortable, compact, flexible id generator.

## Install

```sh
npm i flexid
```

## Features

  * Tiny ! (only one dependency : [nanoid](https://www.npmjs.com/package/nanoid))
  * Uses [nanoid](https://www.npmjs.com/package/nanoid) for fast, secure collision-resistant ids
  * Uses Date.now as header for sortable ids (similar to [ksuid](https://www.npmjs.com/package/ksuid) and [ulid](https://www.npmjs.com/package/ulid))
  * Uses base encoding (48 through 64) for high-density, compact ids (similar to [nanoid](https://www.npmjs.com/package/nanoid) and [short-uuid](https://www.npmjs.com/package/short-uuid))
  * Fast ! (almost as fast as [uuid/v4](https://www.npmjs.com/package/uuid))

## To do 

#### Before 1.0.0
  * Add a proper public API definition.
  * Add a proper test suite.
  * Get feedback from at least 3 users.

## Example Usage

### Hybrid package

```javascript
// ESM
import { generator, BASE } from "flexid";

// CJS
const { generator, BASE } = require("flexid");

// Usage
const flexid = generator(BASE["58"]);
console.log(flexid()) // 1Ci3rcX5Zog1Cfpo

```

### Configuration

```javascript
import { generator, BASE } from "flexid";

const opts = {
  alphabet: BASE["58"],
  size: 16,
  horizon: 100,
  origin: 1500000000000,
  resolution: 1000,
  prefix: '',
  timestamp: true,
  namespace: '',
  delimiter: ''
}
const flexid = generator(opts);
console.log(flexid()) // 1Ci3rcX5Zog1Cfpo
```

## API

TBD.

## Contributing

Feel free to [open an issue](https://github.com/junaway/flexid/issues) or submit a [pull request](https://github.com/junaway/flexid/pulls).

## License

MIT.

## UUID Benchmark  

    Platform:
      Linux 5.3.0-28-generic x64
      Node.JS: 14.17.3
      V8: 8.4.371.23-node.67
      CPU: Intel(R) Core(TM) i7-1065G7 CPU @ 1.30GHz × 8
      Memory: 15 GB
  

    Samples:
                                        RFC4122 compliant UUID in UUID format
                                        -------------------------------------
      uuidv1                            cf975be0-1d38-11ec-9c39-f717c56f08fd
      uuidv4                            9f3767a6-af78-4cce-80f7-55e992ffa7be
      uuid-random                       15982054-57fb-4883-acbb-2420f8db3fe7

                                        RFC4122-compliant UUID in B[X] format
                                        -------------------------------------
      uuid-random.bin/base-x.encode     Tr7PuEBb74JEpTTKXNxATt
      short-uuid                        cCtMHpshL9hMS9dpJn3VF6

                                        Randomness             in B[X] format
                                        -------------------------------------
      crypto.randomBytes/base-x.encode  UQY48cRXyENfwiaQvgkH2y
      nanoid                            JkHorm30NZKhfhECsr2Ya
      nanoid [22]                       LR6dFn91qmzytEdzVanJbT
      nanoid [27]                       dSGYnGF8au3ZeAizTVS5v3ZstRQ
      nanoid [16]                       5F8BmPMUCssH2aPb

                                        Timestamp & Randomness in B[X] format
                                        -------------------------------------
      ksuid                             1yaU93haT1TCKyKnExxGnS3fQo9
      ulid                              01FGBYVR51C5KEP4BMRRJC6Y2Z
      flexid [22]                       1Ci3NkPsvQ84y9VBDmo9us
      flexid [27]                       1Ci3NkrcWRyYRZ8RYRYK9tsUZdo
      flexid [16]                       1Ci3NkMm6vfZZAfB

                                        Extra features         in B[X] format
                                        -------------------------------------
      flexid [prefix=user]              user_1Ci3NkicryG6vyuh
      flexid [namespace=qEOu9F]         1Ci3NkqEOu9FgSp6
      flexid [resolution=24h]           1TSDW1hD7uc2o6g7
      flexid [timestamp=false]          yNWHzb5S6ZfDKESJ


    Benchmark:
      uuidv1 (#)                                 0%   (2,000,903 rps)
      uuidv4                                -20.86%   (1,583,503 rps)
      uuid-random                          +187.05%   (5,743,586 rps)
      uuid-random.bin + base-x.encode       -49.45%   (1,011,367 rps)
      short-uuid                               -93%     (140,131 rps)
      crypto.randomBytes + base-x.encode    -80.96%     (381,015 rps)
      nanoid                                +34.93%   (2,699,724 rps)
      nanoid [22]                            +0.73%   (2,015,570 rps)
      nanoid [27]                            -4.68%   (1,907,308 rps)
      nanoid [16]                           +34.38%   (2,688,825 rps)
      ksuid                                 -94.37%     (112,722 rps)
      ulid                                  -98.46%      (30,720 rps)
      flexid [22]                           -16.51%   (1,670,565 rps)
      flexid [27]                            -28.1%   (1,438,674 rps)
      flexid [16]                            -3.48%   (1,931,189 rps)
      flexid [prefix=user]                   -6.38%   (1,873,235 rps)
      flexid [namespace=qEOu9F]             +21.57%   (2,432,503 rps)
      flexid [resolution=24h]                -6.36%   (1,873,745 rps)
      flexid [timestamp=false]              +12.95%   (2,259,942 rps)

