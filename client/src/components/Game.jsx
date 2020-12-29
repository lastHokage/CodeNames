import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Modal from "./Modal";
import Input from "./Input";

const Game = () => {
  const history = useHistory();
  const [joinRoom, setJoinRoom] = useState("");
  const [roomId, setRoomId] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [playerName, setPlayerName] = useState("");
  const [players, setPlayers] = useState([]);
  console.log(playerName);

  const joinActiveRoom = async (roomId) => {
    try {
      setLoading(true);
      const { data: joinRoomID } = await axios.post(`/join-game/${joinRoom}`, {
        playerName,
      });
      setRoomId(joinRoomID.roomId);
      setLoading(false);
      history.push(`/playing/${joinRoomID.roomId}`);
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  const createNewGame = async () => {
    try {
      setLoading(true);
      const { data: getRoomId } = await axios.post("/new-game", {
        playerName,
      });
      setRoomId(getRoomId.roomId);
      setLoading(false);
      history.push(`/playing/${getRoomId.roomId}`);
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
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
