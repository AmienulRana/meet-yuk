import { NextApiRequest, NextApiResponse } from "next";
import { Server } from "socket.io";
import type { Server as HTTPServer } from "http";
import type { Socket as NetSocket } from "net";
import type { Server as IOServer } from "socket.io";

interface SocketServer extends HTTPServer {
  io?: IOServer | undefined;
}

interface SocketWithIO extends NetSocket {
  server: SocketServer;
}

interface NextApiResponseWithSocket extends NextApiResponse {
  socket: SocketWithIO;
}
const SocketHandler = (req: NextApiRequest, res: NextApiResponseWithSocket) => {
  console.log("called api");
  let chatRoom = ""; // E.g. javascript, node,...
  let allUsers: any[] = [];
  if (res?.socket) {
    if (res?.socket?.server?.io) {
      console.log("socket already running");
    } else {
      const io = new Server(res.socket.server);
      res.socket.server.io = io;

      io.on("connection", (socket) => {
        console.log("server is connected");

        socket.on("join-room", (roomId, { userId, username }) => {
          console.log(`a new user ${userId} joined room ${roomId}`);
          socket.join(roomId);
          socket.broadcast
            .to(roomId)
            .emit("user-connected", { userId, username });
        });
        socket.on("user-toggle-audio", (userId, roomId) => {
          console.log('toggle audio', userId)
          socket.join(roomId);
          socket.broadcast.to(roomId).emit("user-toggle-audio", userId);
        });

        socket.on("user-toggle-video", (userId, roomId) => {
          socket.join(roomId);
          socket.broadcast.to(roomId).emit("user-toggle-video", userId);
        });

        socket.on("user-leave", (userId, roomId) => {
          socket.join(roomId);
          socket.broadcast.to(roomId).emit("user-leave", userId);
        });

        socket.on('message', (roomId, {username, message}) => {
          console.log('message =>>>', username);
          socket.join(roomId);
          socket.broadcast.to(roomId).emit("message", {username, message});

        });
        
        // socket.on("join_room", (data) => {
        //   const { username, roomId } = data;
        //   socket.join(roomId);

        //   console.log(username, roomId);

        //   // let __createdtime__ = Date.now();
        //   // socket.broadcast.to(roomId).emit("receive_message", {
        //   //   message: `${username} has joined the chat room`,
        //   //   username: "Chat Bot",
        //   //   __createdtime__,
        //   // });

        //   // socket.emit("receive_message", {
        //   //   message: `Welcome ${username}`,
        //   //   username: "Chat Bot",
        //   //   __createdtime__,
        //   // });

        //   // chatRoom = roomId;
        //   // allUsers.push({ id: socket.id, username, roomId });
        //   // let chatRoomUsers = allUsers.filter((user) => user.roomId === roomId);
        //   // socket.to(roomId).emit("chatroom_users", chatRoomUsers);
        //   // socket.emit("chatroom_users", chatRoomUsers);
        // });
        socket.on("disconnect", () => {
          // const user = removeUser(socket.id);
          // console.log(user);
          // io.to(user.room).emit("message", {
          //   user: "Admin",
          //   text: `${user.name} just left the room`,
          // });
          // console.log("A disconnection has been made");
        });
      });
    }
  }
  res.end();
};

export default SocketHandler;
