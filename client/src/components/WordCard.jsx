import React from "react";

const words = [
  "crate",
  "leg",
  "rabbit",
  "daffy",
  "connection",
  "premium",
  "spot",
  "enormous",
  "shop",
  "many",
  "irritating",
  "hard-to-find",
  "space",
  "open",
  "sip",
  "quarter",
  "muddle",
  "huge",
  "hour",
  "fence",
  "roof",
  "mean",
  "letters",
  "flow",
  "discovery",
];

const WordCard = ({ red, blue, yellow }) => {
  return words.map((word, index) => (
    <div
      className={`word-card ${
        red.includes(index)
          ? "red"
          : blue.includes(index)
          ? `blue`
          : yellow.includes(index)
          ? "yellow"
          : "black"
      }`}
    >
      {word}
    </div>
  ));
};

export default WordCard;
