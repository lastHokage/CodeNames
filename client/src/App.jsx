import React from "react";
import "./App.css";
import WordCard from "./components/WordCard";

function App() {
  return (
    <div className="App">
      This is codenames game
      <div className="word-container">
        <WordCard />
      </div>
    </div>
  );
}

export default App;
