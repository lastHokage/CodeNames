import { useEffect, useState, useRef } from "react";
import { useParams, useHistory } from "react-router-dom";
import socket from "socket.io-client";
import EndModal from "./EndModal";
import Board from "./Board";

const SOCKET_SERVER = "http://localhost:4000";

const GameBoard = () => {
  const { id } = useParams();
  const history = useHistory();
  const socketRef = useRef();
  const [data, setData] = useState(null);
  const [end, setEnd] = useState(false);
  const player = window.sessionStorage.getItem("playerName");

  useEffect(() => {
    socketRef.current = socket(SOCKET_SERVER, {
      query: { roomId: id },
    });

    socketRef.current.on("GEAME_BOARD", (check) => {
      if (!check || check.lendth === 0) {
        history.push("/game");
        return;
      }

      if (check.slecteAssassin) {
        setEnd(true);
      } else {
        setData(check);
      }
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  const handleClick = (pos) => {
    socketRef.current.emit("GEAME_BOARD", {
      body: {
        position: pos,
        player,
      },
    });

    socketRef.current.on("GEAME_BOARD", (res) => {
      if (res.slecteAssassin) {
        setEnd(true);
      } else {
        setData(res);
      }
    });
  };

  return (
    <>
      {end && (
        <EndModal
          startNew={() => history.push("/game")}
          player={data.currentPlayer}
          looser={data.currentTeam}
        />
      )}
      {data && (
        <Board
          currentTeam={data.currentTeam && data.currentTeam}
          words={data.words}
          handleClick={handleClick}
          scores={data.scores}
        />
      )}
    </>
  );
};

export default GameBoard;
