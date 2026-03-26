import { RoomType, RoomStatus, RoomPlayerStatus } from './enums';

/** Oda bilgisi — veritabanindaki Room modeline karsilik gelir */
export interface Room {
  id: string;
  type: RoomType;
  entryFee: number;
  status: RoomStatus;
  minPlayers: number;
  maxPlayers: number | null;
  createdAt: Date;
  closedAt: Date | null;
}

/** Bir odadaki oyuncu kaydi */
export interface RoomPlayer {
  id: string;
  roomId: string;
  playerId: string;
  joinedAt: Date;
  status: RoomPlayerStatus;
}

/** Redis'te saklanan aktif oda state'i */
export interface ActiveRoomState {
  roomId: string;
  type: RoomType;
  status: RoomStatus;
  entryFee: number;
  players: ActivePlayerState[];
  createdAt: number;
  gameStartsAt: number | null;
}

/** Redis'teki oyuncu state'i */
export interface ActivePlayerState {
  playerId: string;
  walletAddress: string;
  displayName: string | null;
  status: RoomPlayerStatus;
  joinedAt: number;
}
