# flexid
A tiny, fast, sortable, compact, flexible id generator. Think Stripe IDs, but customizable.

## Install

```sh
npm i flexid
```

## Features

  * Tiny ! (no dependencies)
  * Uses [crpyto](https://nodejs.org/api/crypto.html) for fast, secure collision-resistant ids (similar to [nanoid](https://www.npmjs.com/package/nanoid) 
  * Uses Date.now as header for sortable ids (similar to [ksuid](https://www.npmjs.com/package/ksuid) and [ulid](https://www.npmjs.com/package/ulid))
  * Uses base encoding (48 through 64) for high-density, compact ids (similar to [nanoid](https://www.npmjs.com/package/nanoid) and [short-uuid](https://www.npmjs.com/package/short-uuid))
  * Fast ! (as fast as [uuid/v4](https://www.npmjs.com/package/uuid), and 10x to 60x faster than [ksuid](https://www.npmjs.com/package/ksuid), [ulid](https://www.npmjs.com/package/ulid), [short-uuid](https://www.npmjs.com/package/short-uuid), and [auth0-id-generator](https://www.npmjs.com/package/auth0-id-generator), and also 5-6x faster than [ulid-onetable](https://github.com/sensedeep/dynamodb-onetable/blob/main/src/ULID.js))

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

### Full configuration

```javascript
import { generator, BASE } from "flexid";

const alphabet = BASE["58"];
const opts = {
// --------------- DEFAULTS // DEFINITIONS
  size:                  16,// Total ID size.
  horizon:              100,// Number of years before overflow,
  origin:     1500000000000,// starting from this epoch.
  resolution:          1000,// Time resolution, in milliseconds.
  timestamp:           true,// Whether to add a timestamp at all.
  prefix:                '',// ID prefix (optional),
  delimiter:            '_',// and its delimiter.
  namespace:             '',// ID namespace (optional).
// ------------------------ //
}
const flexid = generator(alphabet, opts);
console.log(flexid()) // 1Ci3rcX5Zog1Cfpo
```

### Provided bases

```javascript
import { BASE } from "flexid";

console.log(BASE)
// All bases are lexicographically-ordered and URL-safe.
//{
//  '48': '346789ABCDEFGHJKLMNPQRTUVWXYabcdefghijkmnpqrtwxyz',
//  '58': '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz',
//  '60': '0123456789ABCDEFGHIJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz',
//  '62': '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
//  '64': '-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz'
//}
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
                                        RFC4122-compliant UUID in UUID format
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
      auth0-id-generator [22]           r5cFsb68B2mLK3w48GhcDW
      nanoid                            JkHorm30NZKhfhECsr2Ya
      nanoid [22]                       LR6dFn91qmzytEdzVanJbT
      nanoid [27]                       dSGYnGF8au3ZeAizTVS5v3ZstRQ
      nanoid [16]                       5F8BmPMUCssH2aPb

                                        Timestamp & Randomness in B[X] format
                                        -------------------------------------
      ksuid                             1yaU93haT1TCKyKnExxGnS3fQo9
      ulid                              01FGBYVR51C5KEP4BMRRJC6Y2Z
      ulid [onetable]                   F2VVDDA510YERM1E673P9NXH74
      flexid [22]                       1Ci3NkPsvQ84y9VBDmo9us
      flexid [27]                       1Ci3NkrcWRyYRZ8RYRYK9tsUZdo
      flexid [16]                       1Ci3NkMm6vfZZAfB

                                        Extra features         in B[X] format
                                        -------------------------------------
      flexid [prefix=user]              user_1CkMeVD7qJjPS6KT
      flexid [namespace=qEOu9F]         1CkMeVqEOu9Fxp8F
      flexid [resolution=24h]           1TXa5yThgQ5yFSUn
      flexid [resolution=1ms]           117Ea5BhoE48589h
      flexid [timestamp=false]          e6U8aWYGYNTm1AvE


    Benchmark:
      uuidv1 (#)                                 0%   (2,142,841 rps)
      uuidv4                                -22.87%   (1,652,694 rps)
      uuid-random                          +141.42%   (5,173,166 rps)
      uuid-random.bin + base-x.encode       -55.83%     (946,472 rps)
      short-uuid                               -93%     (150,051 rps)
      crypto.randomBytes + base-x.encode     -81.7%     (392,123 rps)
      nanoid                                +20.82%   (2,588,993 rps)
      auth0-id-generator [22]               -98.78%      (26,242 rps)
      nanoid [22]                            -7.46%   (1,983,051 rps)
      nanoid [27]                           -12.39%   (1,877,377 rps)
      nanoid [16]                           +21.91%   (2,612,361 rps)
      ulid                                  -98.39%      (34,579 rps)
      ulid [onetable]                       -81.67%     (392,847 rps)
      ksuid                                 -95.01%     (106,915 rps)
      flexid [22]                            +0.72%   (2,158,288 rps)
      flexid [27]                              -27%   (1,564,259 rps)
      flexid [16]                            +5.93%   (2,269,990 rps)
      flexid [prefix=user]                   +2.93%   (2,205,700 rps)
      flexid [namespace=qEOu9F]             +59.42%   (3,416,113 rps)
      flexid [resolution=24h]                +1.32%   (2,171,139 rps)
      flexid [resolution=1ms]                +2.64%   (2,199,467 rps)
      flexid [timestamp=false]              +12.39%   (2,408,359 rps)
