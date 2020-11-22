const express = require("express");
const bodyParser = require("body-parser");
const { showWrods } = require("../controller/wordController");
const {
  createRandomeRoom,
  joinRoom,
  getAll,
} = require("../controller/gameController");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("<h1>Hi from backed 👋</h1>");
});

app.get("/words", showWrods);
app.get("/new-game", createRandomeRoom);
app.post("/join-game/:id", joinRoom);
app.get("/all", getAll);

module.exports = app;
