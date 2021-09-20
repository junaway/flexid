# flexid
A tiny, fast, sortable flexible id generator.

## Install

```sh
npm i flexid
```

## Features

  * Tiny ! (1k minified + gzipped)
  * Uses nanoid for fast, secure collision-resistant ids
  * Uses Date.now + base encoding for sortable ids (like ksuid)
  * Fast ! (As fast as uuid/v1)

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
