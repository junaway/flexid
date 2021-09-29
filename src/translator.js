const translator = (alphabet) => {
  const size = alphabet.length;
  const encr = [];

  for (let i = 0, c = ""; i < size; i++) {
    c = alphabet[i];
    encr[i] = c;
  }

  const encode = (decoded) => {
    let decd = decoded;
    let encd = decd === 0 ? encr[decd] : "";
    let modd = 0;
    while (decd > 0) {
      modd = decd % size;
      encd = encr[modd] + encd;
      decd = (decd - modd) / size;
    }
    return encd;
  };

  return { encode };
};

export default translator;
