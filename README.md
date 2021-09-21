# flexid
A tiny, fast, sortable, flexible id generator.

## Install

```sh
npm i flexid
```

## Features

  * Tiny ! (only one dependency : [nanoid](https://www.npmjs.com/package/nanoid))
  * Uses [nanoid](https://www.npmjs.com/package/nanoid) for fast, secure collision-resistant ids
  * Uses Date.now + base encoding for sortable ids (similar to [ksuid](https://www.npmjs.com/package/ksuid) and [ulid](https://www.npmjs.com/package/ulid))
  * Fast ! (faster than [uuid/v4](https://www.npmjs.com/package/uuid))

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
                                  uuidv1 bdb66120-1a43-11ec-931e-53ddb440e9e9     2,044,359 rps
                                  uuidv4 95d851bc-6a53-47af-9d74-fe2b99c701a6     1,457,434 rps
                             uuid-random b3093e93-397d-4e69-94d3-6ad947756911    14,055,521 rps
                                                                              
                                         RFC4122-compliant UUID in B[X] format
                                         -------------------------------------
         uuid-random.bin + base-x.encode NGm7TZEnt7QLm7BNs7W2A4                   1,024,056 rps
                              short-uuid htUe8uejao8Ktvrw5orKLW                     148,893 rps
                                                                              
                                         Random                 in B[X] format
                                         -------------------------------------
      crypto.randomBytes + base-x.encode 7DaFyNkK3itL4M4XzDhSid                     412,692 rps
                             nanoid [21] sB5vuxTsHQnDXQojyweeF                    2,722,121 rps
                             nanoid [22] EakGZteU4KgWkEd3bvHHkR                   2,125,235 rps
                             nanoid [27] 3v1tvPb3hnvRqfTqSWMafS4LkxE              1,933,086 rps
                             nanoid [16] 4dgUsEztfsk7mvtP                         2,695,503 rps
                                                                              
                                         Timestamp & Random     in B[X] format
                                         -------------------------------------
                                   ksuid 1yPr5HBV2LtDmEmSSULXa2vx8nU                106,245 rps
                             flexid [22] 15pQCM9cN5AMvSW9QinRs6                   1,686,482 rps
                             flexid [27] 15pQCMP5XQwUCFwewUsf9ritT9W              1,484,647 rps
                             flexid [16] 15pQCM1b6sm2jgWy                         2,123,531 rps
