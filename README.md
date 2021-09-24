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
  * Uses base encoding (58 through 64) for high-density, compact ids (similar to [nanoid](https://www.npmjs.com/package/nanoid) and [short-uuid](https://www.npmjs.com/package/short-uuid))
  * Fast ! (faster than [uuid/v4](https://www.npmjs.com/package/uuid))

## Features

## To do

  * **Speed up the "randomness" part of the id.**
The header (or timestamp) generator runs at 6 Mops while the payload (or randomness) generator runs at 2Mops (since it is based on [nanoid](https://www.npmjs.com/package/nanoid)). And we cannot go faster than [nanoid](https://www.npmjs.com/package/nanoid) as long as we rely on [nanoid](https://www.npmjs.com/package/nanoid)...
If only we could use [uuid-random](https://www.npmjs.com/package/uuid-random) somehow and encode the .bin() output into an arbitrary base, and all that faster than [nanoid](https://www.npmjs.com/package/nanoid)...
  * **Add support for variable-size headers.**
The header (or timestamp) is currently a 6-byte fixed-size block. For a given flexid size (e.g. size=22), the payload (or randomness) is a variable-size block (e.g. 22 - 6 = 16).
Within the 6-byte block, we can tune the time resolution from 100ms to 1h (e.g. 1s or divider=1000) and the time origin (e.g. offset=15E11), and the time horizon will be defined automatically (e.g. for alphabet=BASE['60'], 60^6/60/60/24/365 ~ 1500 years since 15e11).
The general equation for the time horizon in years is : alphabet\_size^block\_size)\*(divider/1000)/(60\*60\*24\*365.25).
There are two major scenarios : the baseline-horizon scenario (at least 100 years) and the robust-horizon scenario (at least a thousand years). 
If only we could dynamically define the block size depending on the horizon scenario and the divider then, for the same id size, we could have more randonmess in some case.
  * **Add a proper test suite...**
  * **Add support for types.**
Typescript is all there is nowadays...
  * **Add support for an *optional* user-defined namespace.**
We are thinking of something like :timestamp[:namespace]:randomness.
  * **Add support for an *optional* user-defined prefix.**
Similar to what the [Stripe API](https://stripe.com/docs/api) does.
We are thinking of something like [:prefix]:timestamp:randomness.

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

  Platform info:
      Linux 5.3.0-28-generic x64
      Node.JS: 14.17.3
      V8: 8.4.371.23-node.67
      CPU: Intel(R) Core(TM) i7-1065G7 CPU @ 1.30GHz × 8
      Memory: 15 GB

                                         RFC4122 compliant UUID in UUID format
                                         -------------------------------------
                                  uuidv1 8f037ee0-1d21-11ec-ac46-1753de476f7a
                                  uuidv4 de38d2d4-0da9-4feb-8eb0-14f92b409ad3
                             uuid-random 7077807c-5745-426f-852b-40852084d75a
                                                                              
                                         RFC4122-compliant UUID in B[X] format
                                         -------------------------------------
         uuid-random.bin + base-x.encode YJyqXkr78GTtxCUNEGHb4L
                              short-uuid dSBkW2XoeRaMY3SkqWCZ8C
                                                                              
                                         Random                 in B[X] format
                                         -------------------------------------
      crypto.randomBytes + base-x.encode EJHgzDg3bXVvhThJm7XbVF
                             nanoid      7qQxV1Me9DFYOA6U1Ng48
                             nanoid [22] 1WkHZwSnKm6ibzkSdjco53
                             nanoid [27] en236t1vCMmEYSP7rAhRwXiXWq1
                             nanoid [16] GsFoKfkoTFZnoQ4g
                                                                              
                                         Timestamp & Random     in B[X] format
                                         -------------------------------------
                                   ksuid 1ya9u6K2BSrqz9j4c9m9JP4zDc8
                                    ulid 01FGBNAZEH3FQVZA1EVKJW0372
                             flexid [22] 1ChzQa6apRojy1sYNdvzZh
                             flexid [27] 1ChzQahc25eWRovi5gFXeYk5Sa1
                             flexid [16] 1ChzQanzELjCZejN
                                                                                
    Suite: UUID Benchmark
    ✔ uuidv1                                     1,752,669 rps
    ✔ uuidv4                                     1,396,807 rps
    ✔ uuid-random                                4,797,963 rps
    ✔ uuid-random.bin + base-x.encode              846,178 rps
    ✔ short-uuid                                   124,578 rps
    ✔ crypto.randomBytes + base-x.encode           385,668 rps
    ✔ nanoid                                     2,611,657 rps
    ✔ nanoid [22]                                1,999,407 rps
    ✔ nanoid [27]                                1,660,623 rps
    ✔ nanoid [16]                                2,325,835 rps
    ✔ ksuid                                        101,129 rps
    ✔ ulid                                          29,957 rps
    ✔ flexid [22]                                1,678,424 rps
    ✔ flexid [27]                                1,483,165 rps
    ✔ flexid [16]                                2,005,624 rps
