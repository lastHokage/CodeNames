import React, { useEffect, useState } from "react";
import axios from "axios";

const WordCard = ({ red, blue, yellow }) => {
  const [words, setWords] = useState([]);
  useEffect(() => {
    const fetchWords = async () => {
      const result = await axios("/words");
      setWords(result.data);
    };
    fetchWords();
  }, []);
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
      key={word.id}
    >
      {word.word}
    </div>
  ));
};

export default WordCard;
