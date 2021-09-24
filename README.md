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

## Features

## To do

  * **Speed up the "randomness" part of the id.**
The header (or timestamp) generator runs at 6 Mops while the payload (or randomness) generator runs at 2Mops (since it is based on [nanoid](https://www.npmjs.com/package/nanoid)). And we cannot go faster than [nanoid](https://www.npmjs.com/package/nanoid) as long as we rely on [nanoid](https://www.npmjs.com/package/nanoid)...
If only we could use [uuid-random](https://www.npmjs.com/package/uuid-random) somehow and encode the .bin() output into an arbitrary base, and all that faster than [nanoid](https://www.npmjs.com/package/nanoid)...
  * **Add a proper test suite...**
  * **Add support for types.**
Typescript is all there is nowadays...

## Example Usage

### Basic setup

```javascript
const { flexid } = require('flexid')

/// 1 sec accuracy and over a 100 years before overflow
/// 6 bytes of timestamp + 16 bytes of randomness
/// human-readable encoding
// size = 22
// alphabet = BASE['58']
// offset = 15e11
// divider = 1000
console.log(flexid()) // 15pQCM9cN5AMvSW9QinRs6
```

### Fully configured

```javascript
const { generator, BASE } = require('flexid')
/// .1 sec accuracy and over a 1000 years before overflow
/// 6 bytes of timestamp + 8 bytes of randomness
/// alphanumeric encoding
// size = 14
// alphabet = BASE['62']
// offset = 1577649600000
// divider = 100
const flexid = generator(14, BASE['62'], 1577649600000, 100);
console.log(flexid()) // 0atQX4pOsjZTB4
```

## Contributing

Feel free to [open an issue](https://github.com/jchook/uuid-random/issues) or submit a [pull request](https://github.com/jchook/uuid-random/pulls).

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
                                uuidv1 8f037ee0-1d21-11ec-ac46-1753de476f7a
                                uuidv4 de38d2d4-0da9-4feb-8eb0-14f92b409ad3
                          uuid-random 7077807c-5745-426f-852b-40852084d75a
                                                                            
                                      RFC4122-compliant UUID in B[X] format
                                      -------------------------------------
      uuid-random.bin + base-x.encode YJyqXkr78GTtxCUNEGHb4L
                            short-uuid dSBkW2XoeRaMY3SkqWCZ8C
                                                                            
                                      Randomness             in B[X] format
                                      -------------------------------------
    crypto.randomBytes + base-x.encode EJHgzDg3bXVvhThJm7XbVF
                          nanoid      7qQxV1Me9DFYOA6U1Ng48
                          nanoid [22] 1WkHZwSnKm6ibzkSdjco53
                          nanoid [27] en236t1vCMmEYSP7rAhRwXiXWq1
                          nanoid [16] GsFoKfkoTFZnoQ4g
                                                                            
                                      Timestamp & Randomness in B[X] format
                                      -------------------------------------
                                ksuid 1yaREefyNgjBVbPC6mCJU1Wg2CG
                                  ulid 01FGBXFXRH9Y1PD87NCDX8M3YB
                          flexid [22] 1Ci2wzQMzWQjApyrs4sKrg
                          flexid [27] 1Ci2wzxkKWJbGyFctyCqx3WnywJ
                          flexid [16] 1Ci2wz62h3Mcvpmi
                                                                            
                                      Extra features from flexid           
                                      -------------------------------------
            flexid [prefix=user]      user_1Ci2wzVdAb5KjrJM
            flexid [namespace=qEOu9F] 1Ci2wzqEOu9FrZnS
            flexid [resolution=24h]   1TS9hfGSZSBz56Rc
            flexid [timestamp=false]  v5gf5pWEoaCeujcz

                                                                                
  Benchmark:
    uuidv1 (#)                                 0%   (1,991,316 rps)   (avg: 502ns)
    uuidv4                                -19.44%   (1,604,193 rps)   (avg: 623ns)
    uuid-random                          +175.33%   (5,482,730 rps)   (avg: 182ns)
    uuid-random.bin + base-x.encode       -55.98%     (876,568 rps)   (avg: 1μs)
    short-uuid                            -93.83%     (122,942 rps)   (avg: 8μs)
    crypto.randomBytes + base-x.encode    -81.71%     (364,160 rps)   (avg: 2μs)
    nanoid                                +29.84%   (2,585,426 rps)   (avg: 386ns)
    nanoid [22]                            -6.24%   (1,867,068 rps)   (avg: 535ns)
    nanoid [27]                           -10.52%   (1,781,793 rps)   (avg: 561ns)
    nanoid [16]                           +23.46%   (2,458,566 rps)   (avg: 406ns)
    ksuid                                 -94.82%     (103,078 rps)   (avg: 9μs)
    ulid                                  -98.49%      (30,153 rps)   (avg: 33μs)
    flexid [22]                           -22.04%   (1,552,377 rps)   (avg: 644ns)
    flexid [27]                           -34.93%   (1,295,802 rps)   (avg: 771ns)
    flexid [16]                            -5.11%   (1,889,633 rps)   (avg: 529ns)
    flexid [prefix=user]                  -10.02%   (1,791,761 rps)   (avg: 558ns)
    flexid [namespace=qEOu9F]             +22.83%   (2,445,928 rps)   (avg: 408ns)
    flexid [resolution=24h]               -10.23%   (1,787,657 rps)   (avg: 559ns)
    flexid [timestamp=false]               +8.69%   (2,164,331 rps)   (avg: 462ns)
