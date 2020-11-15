const words = require("../utils/words");
const { addId } = require("../utils/addId");
const { randomNumbers } = require("../utils/randomNumbers");

exports.showWrods = (req, res) => {
  const wordsWithId = addId(words);
  const random = randomNumbers(wordsWithId);
  const selectedWords = wordsWithId.filter(
    (item, index) => random.includes(index) && item
  );
  res.status(200).json(selectedWords);
};
