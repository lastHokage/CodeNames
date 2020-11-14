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

const WordCard = () => words.map((word) => <div className="word-card">{word}</div>);

export default WordCard;
