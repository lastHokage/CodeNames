const randomString = require("../utils/random-string");
const words = require("../utils/words");
const { addId } = require("../utils/addId");
const { randomNumbers } = require("../utils/randomNumbers");

const gameRooms = [];

exports.createRandomeRoom = (req, res) => {
  const wordsWithId = addId(words);
  const random = randomNumbers(wordsWithId);
  const selectedWords = wordsWithId.filter(
    (item, index) => random.includes(index) && item
  );
  const roomId = randomString();
  gameRooms.push({ roomId, words: selectedWords });
  console.log({ gameRooms });
  res.status(200).json({ roomId });
};

exports.joinRoom = (req, res) => {
  const { id } = req.params;
  const roomToJoin = gameRooms.filter((item) => item.roomId === id)[0];
  if (roomToJoin) {
    res.status(200).json(roomToJoin);
  } else {
    res.status(400).json({ error: "I couldn't find your room" });
  }
};

exports.getAll = (req, res) => res.status(200).json(gameRooms);
