import { useState, useEffect, useRef } from "react";
import { useParams, useHistory } from "react-router-dom";
import socket from "socket.io-client";

const SOCKET_SERVER = "http://localhost:4000";

const Dashboard = () => {
  // const [teams, setTeams] = useState({ red: [], blue: [] });
  const { id } = useParams();
  const history = useHistory();
  const [data, setData] = useState(null);
  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = socket(SOCKET_SERVER, {
      query: { roomId: id },
    });
    socketRef.current.on("UPDATE_ROOM", (check) => {
      setData(check);
      console.log(check);
      if (check.gameStarted) {
        const player = window.sessionStorage.getItem("playerName");
        if (check.redTeamSpyMaster && player === check.redTeamSpyMaster) {
          history.push(`/spy-master/${id}`);
        } else if (
          check.blueTeamSpyMaster &&
          player === check.blueTeamSpyMaster
        ) {
          history.push(`/spy-master/${id}`);
        } else {
          history.push(`/playing/${id}`);
        }
      }
    });
    socketRef.current.on("UPDATE_TEAMS", (check) => {
      setData(check);
    });
    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  const handleTeams = (id, colour) => {
    const name = data.players.filter((item) => item === id)[0];

    socketRef.current.emit("UPDATE_TEAMS", {
      body: {
        [colour]: name,
      },
    });

    socketRef.current.on("UPDATE_TEAMS", (data) => {
      setData(data);
    });
  };

  const sendSpyMaster = (id, colour) => {
    console.log(id);
    socketRef.current.emit("UPDATE_SPYMASTER", {
      body: {
        [colour]: id,
      },
    });

    socketRef.current.on("UPDATE_SPYMASTER", (data) => {
      console.log(data);
      setData(data);
      window.sessionStorage.setItem("spyMaster", id);
    });
  };

  const handleRouting = () => {
    socketRef.current.emit("GAME_STARTED", {
      body: {
        gameStarted: true,
      },
    });
    const player = window.sessionStorage.getItem("playerName");
    if (data.redTeamSpyMaster && player === data.redTeamSpyMaster) {
      history.push(`/spy-master/${id}`);
    } else if (data.blueTeamSpyMaster && player === data.blueTeamSpyMaster) {
      history.push(`/spy-master/${id}`);
    } else {
      history.push(`/playing/${id}`);
    }
  };

  return (
    <div className="container content-center">
      <div className="mx-6 px-6 py-6 w-3/6">
        <h1 className="text-xl text-center ">
          You have joined room <span className="font-bold">{id}</span>
        </h1>
        <p className="bg-gray-200 py-2 px-2 my-1 text-center font-bold content-center ">
          Players
        </p>
        <p className="mb-4 mt-2">
          To select your teammates please click on one of the
          <span className="bg-red-500 px-2 text-white">red</span> or{" "}
          <span className="bg-blue-500 px-2 text-white">blue</span> squares
        </p>
        {data &&
          data.players.map((player, index) => {
            return (
              <div className="flex justify-between px-10">
                <p
                  className=" bg-gray-100 py-1 px-1 my-1 text-center  w-36 "
                  key={player}
                >
                  {player}
                </p>
                <div
                  id={player}
                  className=" w-8 h4 px-3 bg-red-500 cursor-pointer hover:bg-red-700"
                  onClick={(e) => handleTeams(e.target.id, "red")}
                />
                <div
                  id={player}
                  className=" w-5 h4 px-3 bg-blue-500 cursor-pointer hover:bg-blue-700 "
                  onClick={(e) => handleTeams(e.target.id, "blue")}
                />
              </div>
            );
          })}
      </div>
      <div className="mx-6 px-6 py-6 w-3/6">
        <h2 className="bg-gray-200 py-2 px-2 my-1 text-center font-bold content-center">
          Teams
        </h2>
        <div className="flex justify-around flex-wrap">
          {data &&
            data.teams.red &&
            data.teams.red.map((item) => (
              <p
                onClick={(e) => sendSpyMaster(e.target.id, "red")}
                id={item}
                key={item}
                className="bg-red-500 text-lg py-1 px-1 my-1 text-center w-40 text-white rounded-md"
              >
                {item}
              </p>
            ))}
          {data &&
            data.teams.blue &&
            data.teams.blue.map((item) => (
              <p
                onClick={(e) => sendSpyMaster(e.target.id, "blue")}
                id={item}
                key={item}
                className="bg-blue-500 text-lg py-1 px-1 my-1 text-center w-40 text-white rounded-md"
              >
                {item}
              </p>
            ))}
        </div>
        <div className="mx-6 px-6 py-6 w-3/6">
          <h2 className="bg-gray-200 py-2 px-2 my-1 text-center font-bold content-center">
            Spy Masters
          </h2>
          <div className="flex justify-around flex-wrap">
            <p>{data && data.redTeamSpyMaster}</p>
            <p>{data && data.blueTeamSpyMaster}</p>
          </div>
        </div>
        <button
          onClick={handleRouting}
          disabled={
            data &&
            (data.teams.red.length === 0 || data.teams.blue.length === 0)
          }
          className=" text-lg p-2 my-5 text-white rounded-md transition-all duration-500 bg-green-500 hover:bg-green-800 disabled:opacity-50"
        >
          start the game
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
