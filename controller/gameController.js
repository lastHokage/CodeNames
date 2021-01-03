const { v4: uuidv4 } = require("uuid");
const randomString = require("../utils/random-string");
const words = require("../utils/words");
const { addId } = require("../utils/addId");
const { randomNumbers } = require("../utils/randomNumbers");
const boardGenerator = require("../utils/board-generator");

const gameRooms = [];

const createRandomeRoom = (req, res) => {
  const { playerName } = req.body;
  const wordsWithId = addId(words);
  const random = randomNumbers(wordsWithId);
  const selectedWords = wordsWithId.filter(
    (item, index) => random.includes(index) && item
  );
  const roomId = randomString();
  gameRooms.push({
    roomId,
    words: selectedWords,
    players: [playerName],
    teams: { red: [], blue: [] },
    scores: {
      red: 0,
      blue: 0,
    },
  });
  res.status(200).json({ roomId });
};

const joinRoom = (roomId, playerName) => {
  const roomToJoin = gameRooms.filter((item) => item.roomId === roomId)[0];
  if (roomToJoin) {
    roomToJoin.players.push(playerName);
    roomToJoin.teams = { red: [], blue: [] };
    return { roomId: roomToJoin.roomId, players: roomToJoin.players };
  } else {
    return createRandomeRoomSocket(roomId, playerName);
  }
};

const getRoomData = (req, res) => {
  const { id } = req.params;
  const roomToJoin = gameRooms.filter((item) => item.roomId === id)[0];
  if (roomToJoin) {
    res.status(200).json(roomToJoin);
  } else {
    res.status(400).json({ error: "I couldn't find your room" });
  }
};

const getAll = (req, res) => res.status(200).json(gameRooms);

const createRandomeRoomSocket = (roomId, playerName) => {
  const wordsWithId = addId(words);
  const random = randomNumbers(wordsWithId);
  const selectedWords = wordsWithId.filter(
    (item, index) => random.includes(index) && item
  );

  const newRoom = {
    roomId,
    words: selectedWords,
    players: [playerName],
    teams: { red: [], blue: [] },
    positions: boardGenerator(),
    slecteAssassin: false,
    scores: {
      red: 0,
      blue: 0,
    },
  };
  gameRooms.push(newRoom);
  return {
    roomId: newRoom.roomId,
    players: newRoom.players,
  };
};
module.exports = {
  getAll,
  getRoomData,
  joinRoom,
  createRandomeRoom,
  createRandomeRoomSocket,
  gameRooms,
};
