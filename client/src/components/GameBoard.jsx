import { useEffect, useState, useRef } from "react";
import { useParams, useHistory } from "react-router-dom";
import socket from "socket.io-client";
import EndModal from "./EndModal";
import SpyMaster from "./SpyMaster";

const SOCKET_SERVER = "http://localhost:4000";

const GameBoard = () => {
  const { id } = useParams();
  const history = useHistory();
  const socketRef = useRef();
  const [data, setData] = useState(null);
  const [end, setEnd] = useState(false);
  const player = window.sessionStorage.getItem("playerName");
  const spyMaster = window.sessionStorage.getItem("spyMaster");

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
      <div className="container content-center">
        <div className=" flex flex-wrap justify-between mb-3 ">
          <div className=" bg-red-100 p-3">
            <h3 className="sm:text-lg">Team RED score</h3>
            <p className="font-bold sm:text-lg text-center">
              {data && data.scores.red}
            </p>
          </div>
          <div className={`bg-${data.currentTeam}-100 p-3`}>
            <h3 className="sm:text-lg">Current Player {data.currentTeam}</h3>
          </div>
          <div className=" bg-blue-100 p-3">
            <h3 className="sm:text-lg">Team BLUE score</h3>
            <p className="font-bold sm:text-lg text-center">
              {data && data.scores.blue}
            </p>
          </div>
        </div>
        <h3 className="text-center text-xl mb-3 sm:text-2xl">
          when ever you ready please click on the words to submit your choice
        </h3>
        <div className="w-full">
          <div className="flex justify-between flex-wrap">
            {data &&
              data.words.map((word, index) => (
                <p
                  className={
                    word.colour
                      ? ` bg-${word.colour}-400 sm:m-2 sm:p-3 w-1/6 sm:text-base text-center m-1 mb-3 text-sm `
                      : ` sm:m-2 sm:p-3 w-1/6 sm:text-base text-center m-1 mb-3 text-sm transition-all duration-500 bg-gray-100 hover:bg-gray-500 hover:text-white `
                  }
                  key={word.id}
                  id={index}
                  onClick={(e) => handleClick(e.target.id)}
                >
                  {word.word}
                </p>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default GameBoard;
