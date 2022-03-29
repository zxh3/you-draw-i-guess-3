// Server state types
export interface Player {
  // defined by socketid for now
  id: string;
  // nickname of the player; can by set before game start
  name: string;
}

export interface Message {
  sendAt: Date;
  sentBy: Player;
  message: string;
}

export enum GameStatus {
  // waiting for all players click "ready"
  WAITING = "WAITING",
  PLAYING = "PLAYING",
}

export interface RoundInfo {
  // fixed once GameStatus is set to "PLAYING"
  totalRound: number;
  timeInSecPerRound: number;
  // dynamic during game play
  currentRound: number;
  remainingTimeInSecCurrentRound: number;
}

// Event types
export enum ServerEvent {
  CREATE_NEW_ROOM = "CREATE_NEW_ROOM",
}
export interface CreateNewRoom_Data {
  id: string;
}
