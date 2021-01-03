import { useState, useRef, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import socket from "socket.io-client";
import EndModal from "./EndModal";
import Board from "./Board";
const SOCKET_SERVER = "http://localhost:4000";

const SpyMaster = () => {
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
    socketRef.current.on("SPAY_MASTER", (check) => {
      if (!check || check.lendth === 0) {
        history.push("/game");
        return;
      }

      if (check.slecteAssassin) {
        setEnd(true);
      } else {
        setData(check);
      }

      if (
        player !== check.redTeamSpyMaster &&
        player !== check.blueTeamSpyMaster
      ) {
        history.push(`/playing/${id}`);
      }
    });

    socketRef.current.emit("SPAY_MASTER", {
      body: {
        spyMaster: true,
      },
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

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
          currentTeam={data.currentTeam}
          words={data.solved}
          scores={data.scores}
        />
      )}
    </>
  );
};

export default SpyMaster;
