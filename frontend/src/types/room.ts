import { RoomType, RoomStatus, PlayerStatus } from './enums';

/** Lobi listesinde gosterilen oda bilgisi */
export interface LobbyRoom {
  roomId: string;
  type: RoomType;
  entryFee: number;
  playerCount: number;
  maxPlayers: number | null;
  startsAt: number | null;
}

/** Bekleme odasi state'i */
export interface RoomState {
  roomId: string;
  type: RoomType;
  status: RoomStatus;
  entryFee: number;
  players: RoomPlayerInfo[];
  poolSize: number;
  countdownMs: number | null;
}

/** Odadaki bir oyuncunun bilgisi */
export interface RoomPlayerInfo {
  playerId: string;
  walletAddress: string;
  displayName: string | null;
  status: PlayerStatus;
}
