import http from "http";
import express from "express";
import { Server } from "socket.io";
import { CreateNewRoom_Data, ServerEvent, Player } from "@shared/types";
import Rooms from "./room";

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const PORT = process.env.PORT || 3001;

const rooms = new Rooms();

function startServer() {
  io.on("connection", (socket) => {
    socket.on(
      ServerEvent.CREATE_NEW_ROOM,
      (createNewRoomData: CreateNewRoom_Data, initialPlayer: Player) => {
        const room = rooms.addRoom(createNewRoomData);
        if (room !== null) {
          room.addPlayer(initialPlayer);
        }
      }
    );
  });

  server.listen(PORT, () => {
    console.log(`Server listening to port ${PORT}`);
  });
}

function prepareForCleanUp() {
  process.once("SIGUSR2", function () {
    process.kill(process.pid, "SIGUSR2");
  });
}

startServer();
prepareForCleanUp();
