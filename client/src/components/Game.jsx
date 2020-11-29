import { useState, useEffect } from "react";
import axios from "axios";
import Modal from "./Modal";
import Input from "./Input";

const Game = () => {
  const [joinRoom, setJoinRoom] = useState("");
  const [roomId, setRoomId] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const joinActiveRoom = async (roomId) => {
    try {
      setLoading(true);
      const { data: joinRoomID } = await axios.post(`/join-game/${joinRoom}`);
      setRoomId(joinRoomID.roomId);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  const getAGameRoom = async () => {
    try {
      setLoading(true);
      const { data: getRoomId } = await axios.get("/new-game");
      setRoomId(getRoomId.roomId);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };
  console.log({ error });
  return (
    <>
      {!roomId && (
        <Modal
          gameRoom={joinRoom}
          getInput={setJoinRoom}
          getGameRoom={getAGameRoom}
          joinGameRoom={joinActiveRoom}
        />
      )}
      {loading && <h1>Loading ... </h1>}
      {roomId && <h1>your game room Id: {roomId}</h1>}
    </>
  );
};

export default Game;
