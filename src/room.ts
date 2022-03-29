import {
  CreateNewRoom_Data,
  GameStatus,
  Message,
  Player,
  RoundInfo,
} from "@shared/types";
import { DEFAULT_ROUNDS, DEFAULT_TIME_IN_SRC_PER_ROUND } from "./defaults";
import _ from "lodash";

class Room {
  id: string;
  createdAt: Date;
  players: Player[];
  messages: Message[];
  gameStatus: GameStatus;
  roundInfo: RoundInfo;

  constructor(id: string) {
    this.id = id;
    this.createdAt = new Date();
    this.players = [];
    this.messages = [];
    this.gameStatus = GameStatus.WAITING;
    this.roundInfo = {
      totalRound: DEFAULT_ROUNDS,
      timeInSecPerRound: DEFAULT_TIME_IN_SRC_PER_ROUND,
      currentRound: 1,
      remainingTimeInSecCurrentRound: DEFAULT_TIME_IN_SRC_PER_ROUND,
    };
  }

  addPlayer(player: Player) {
    this.players.push(player);
  }

  sendMessage(message: Message) {
    this.messages.push(message);
  }
}

class Rooms {
  // map from room.id to room
  rooms: { [key: string]: Room };

  constructor() {
    this.rooms = {};
  }

  getRoom(id: string): Room | null {
    return _.get(this.rooms, id, null);
  }

  addRoom(data: CreateNewRoom_Data): Room | null {
    // If the room already exists, do nothing.
    const maybeRoom = this.getRoom(data.id);
    if (maybeRoom !== null) {
      return null;
    }

    const room = new Room(data.id);
    return room;
  }

  removeRoom(id: string) {}
}

export default Rooms;
