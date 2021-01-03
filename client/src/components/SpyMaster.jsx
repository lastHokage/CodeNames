import { useState, useRef, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import socket from "socket.io-client";
import EndModal from "./EndModal";
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
      console.log({ check });
      if (check.slecteAssassin) {
        setEnd(true);
      } else {
        setData(check);
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
      <div className="container content-center">
        <div className=" flex flex-wrap justify-between mb-3 ">
          <div className=" bg-red-100 p-3">
            <h3 className="text-lg">Team RED score</h3>
            <p className="font-bold text-lg text-center">
              {data && data.scores.red}
            </p>
          </div>
          <div className=" bg-blue-100 p-3">
            <h3 className="text-lg">Team BLUE score</h3>
            <p className="font-bold text-lg text-center">
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
              data.solved.map((word, index) => (
                <p
                  className={
                    word.colour
                      ? ` bg-${word.colour}-400 sm:m-2 sm:p-3 w-1/6 sm:text-base text-center m-1 mb-3 text-sm `
                      : ` sm:m-2 sm:p-3 w-1/6 sm:text-base text-center m-1 mb-3 text-sm transition-all duration-500 bg-gray-100 hover:bg-gray-500 hover:text-white `
                  }
                  key={word.id}
                  id={index}
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

export default SpyMaster;
