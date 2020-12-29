import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const [roomData, setRoomData] = useState(null);
  const [begin, setBegin] = useState(false);
  const { id } = useParams();

  const fetchRoomData = async () => {
    if (!begin) {
      console.log("called", { begin });
      const { data } = await axios.get(`/new-game/${id}`);
      setRoomData(data);
    }
  };
  useEffect(() => {
    fetchRoomData();
    const interval = setInterval(() => {
      fetchRoomData();
    }, 3000);
    return () => clearInterval(interval);
  }, [begin]);
  return (
    <div className="container content-center">
      <h1 className="text-7xl font-bold">You have joined room {id}</h1>
      {roomData &&
        roomData.players.map((player, index) => <p key={index}>{player}</p>)}
      <button
        onClick={() => setBegin(true)}
        className="bg-red-500 text-lg p-2 my-5 text-white rounded-md hover:bg-red-800"
      >
        start the game
      </button>
    </div>
  );
};

export default Dashboard;
