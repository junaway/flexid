"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const translator = (alphabet) => {
    const size = alphabet.length;
    const encr = {};
    // let decr = {};
    for (let i = 0, c = ""; i < size; i++) {
        c = alphabet[i];
        encr[i] = c;
        // decr[c] = i;
    }
    const encode = (decoded) => {
        let decd = decoded;
        let encd = decd === 0 ? encr[decd] : "";
        while (decd > 0) {
            encd = encr[decd % size] + encd;
            decd = Math.floor(decd / size);
        }
        return encd;
    };
    // const decode = (encoded) => {
    //    let encd = encoded
    //    let decd = 0;
    //    for (let i = 0; i < encd.length; i++) {
    //        decd *= size;
    //        decd += decr[encd[i]];
    //    }
    //    return decd;
    // }
    return { encode };
};
exports.default = translator;
