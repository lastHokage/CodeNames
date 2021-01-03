import { useEffect, useRef, useState } from "react";
import socket from "socket.io-client";

const SOCKET_SERVER = "http://localhost:4000";

const useSocket = (roomId, channel) => {
  const [roomData, setRoomData] = useState(null);
  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = socket(SOCKET_SERVER, {
      query: { roomId },
    });
    socketRef.current.on(channel, (data) => {
      setRoomData(data);
    });
    return () => {
      socketRef.current.disconnect();
    };
  }, [roomId, channel]);

  const sendEvent = (event) => {
    socketRef.current.emit(channel, {
      body: event,
    });
    window.sessionStorage.setItem("playerName", event);
  };

  return [roomData, sendEvent];
};

export default useSocket;
