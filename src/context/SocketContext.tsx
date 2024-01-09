import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { io, Socket } from "socket.io-client";

interface SocketContextProps {
  children: ReactNode;
}

interface UseSocketReturnType extends Socket {}

export const SocketContext = createContext<UseSocketReturnType | null>(null);

export const useSocket = () => {
  const context = useContext(SocketContext);
  console.log(context);
  // if (!context) {
  //   throw new Error("useSocket must be used within a SocketProvider");
  // }
  return context;
};

export const SocketProvider: React.FC<SocketContextProps> = (props) => {
  const { children } = props;
  const [socket, setSocket] = useState<UseSocketReturnType | null>(null);

  useEffect(() => {
    const connection = io();
    console.log("socket connection", connection);
    setSocket(connection);

    return () => {
      connection.disconnect();
    };
  }, []);

  useEffect(() => {
    socket?.on("connect_error", async (err) => {
      console.log("Error establishing socket", err);
      await fetch("/api/socket");
    });

    return () => {
      socket?.off("connect_error");
    };
  }, [socket]);
  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};
