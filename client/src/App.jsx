import React from "react";
import "./App.css";
import WordCard from "./components/WordCard";
import { generator } from "./helpers/generator";

function App() {
  const {
    redCardsPosition,
    blueCardsPosition,
    civiliansCardsPosition,
    assassinCardPosition,
  } = generator();
  return (
    <div className="App">
      This is codenames game
      <div className="word-container">
        <WordCard
          red={redCardsPosition}
          blue={blueCardsPosition}
          yellow={civiliansCardsPosition}
          black={assassinCardPosition}
        />
      </div>
    </div>
  );
}

export default App;
