import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Modal from "./Modal";
import useSocket from "../hooks/useSocket";
import randomString from "../helpers/random-string";

const Game = () => {
  const history = useHistory();
  const [joinRoom, setJoinRoom] = useState("");
  const [roomId, setRoomId] = useState("");
  const [playerName, setPlayerName] = useState("");
  const [roomData, sendEvent] = useSocket(joinRoom, "ADD_PLAYER");

  const joinActiveRoom = () => {
    sendEvent(playerName);
    history.push(`/dashboard/${joinRoom}`);
  };

  const createNewGame = () => {
    const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
    const random = randomString(alphabet);
    setJoinRoom(random);
    sendEvent(playerName);
    history.push(`/dashboard/${joinRoom}`);
  };

  return (
    <>
      {!roomId && (
        <Modal
          gameRoom={joinRoom}
          getInput={setJoinRoom}
          getGameRoom={createNewGame}
          joinGameRoom={joinActiveRoom}
          playerName={playerName}
          setPlayerName={setPlayerName}
        />
      )}
    </>
  );
};

export default Game;
