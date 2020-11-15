exports.randomNumbers = (array) => {
  const result = [];
  while (result.length < 25) {
    const random = Math.floor(Math.random() * array.length);
    if (result.indexOf(random) === -1) result.push(random);
  }
  return result;
};
