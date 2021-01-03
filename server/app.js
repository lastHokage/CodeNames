const express = require("express");
const bodyParser = require("body-parser");
const { showWrods } = require("../controller/wordController");
const {
  createRandomeRoom,
  joinRoom,
  getAll,
  getRoomData,
} = require("../controller/gameController");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("<h1>Hi from backed 👋</h1>");
});

app.get("/words", showWrods);
app.post("/new-game", createRandomeRoom);
app.get("/new-game/:id", getRoomData);
// app.post("/join-game/:id", joinRoom);
app.get("/all", getAll);

module.exports = app;
