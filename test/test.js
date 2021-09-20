const { v1: uuidv1 } = require('uuid');
const { v4: uuidv4 } = require('uuid');
const uuid = require('uuid-random');
const base_x = require('base-x');
const short = require('short-uuid');
const crypto = require('crypto');
const { nanoid, customAlphabet } = require('nanoid');
const ksuid = require('ksuid');
const { generator, BASE } = require('../');

const Benchmarkify = require('benchmarkify');

//--------------------------------------------------------------------/
const benchmark = new Benchmarkify("UUID Benchmark").printHeader();
const bench = benchmark.createSuite("UUID Benchmark");

let name = undefined;
let func = undefined;
let pads = 40;

let ref = (name, func) => {
    console.log(name.padStart(pads), func())
    bench.ref(name, () => { func() })
}

let add = (name, func) => {
    console.log(name.padStart(pads), func())
    bench.add(name, () => { func() })
}

//--------------------------------------------------------------------/
const ALPHABET = BASE['58']
const buf_enc = base_x(ALPHABET)

//--------------------------------------------------------------------/
console.log(''.padStart(pads), 'RFC4122 compliant UUID in UUID format')
console.log(''.padStart(pads), '-------------------------------------')

name = 'uuidv1'
func = uuidv1
add(name, func)

name = 'uuidv4'
func = uuidv4
add(name, func)

name = 'uuid-random'
func = uuid
ref(name, func)

//--------------------------------------------------------------------/
console.log(''.padStart(pads), '                                     ')
console.log(''.padStart(pads), 'RFC4122-compliant UUID in B[X] format')
console.log(''.padStart(pads), '-------------------------------------')

name = 'uuid-random.bin + base-x.encode'
func = () => { return buf_enc.encode(uuid.bin()) }
add(name, func)

name = 'short-uuid'
func = short.generate
add(name, func)

//--------------------------------------------------------------------/
console.log(''.padStart(pads), '                                     ')
console.log(''.padStart(pads), 'Random                 in B[X] format')
console.log(''.padStart(pads), '-------------------------------------')

name = 'crypto.randomBytes + base-x.encode'
func = () => { return buf_enc.encode(crypto.randomBytes(16)) }
add(name, func)

name = 'nanoid [21]'
func = nanoid
add(name, func)

name = 'nanoid [22]'
func = customAlphabet(ALPHABET, 22)
add(name, func)

name = 'nanoid [27]'
func = customAlphabet(ALPHABET, 27)
add(name, func)

name = 'nanoid [16]'
func = customAlphabet(ALPHABET, 16)
add(name, func)

//--------------------------------------------------------------------/
console.log(''.padStart(pads), '                                     ')
console.log(''.padStart(pads), 'Timestamp & Random     in B[X] format')
console.log(''.padStart(pads), '-------------------------------------')

name = 'ksuid'
func = () => { return ksuid.randomSync().string}
add(name, func)

name = 'flexid [22]'
func = generator()
add(name, func)

name = 'flexid [27]'
func = generator(27)
add(name, func)

name = 'flexid [16]'
func = generator(16)
add(name, func)

//--------------------------------------------------------------------/
console.log(''.padStart(pads), '                                     ')

bench.run();