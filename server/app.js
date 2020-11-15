const express = require("express");
const bodyParser = require("body-parser");
const { showWrods } = require("../controller/wordController");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("<h1>Hi from backed 👋</h1>");
});

app.get("/words", showWrods);

module.exports = app;
