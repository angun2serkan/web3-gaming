/** Oyuncu bilgisi — veritabanindaki Player modeline karsilik gelir */
export interface Player {
  id: string;
  walletAddress: string;
  displayName: string | null;
  createdAt: Date;
  updatedAt: Date;
}

/** Socket baglantisindaki oyuncu oturumu — Redis'te saklanir */
export interface PlayerSession {
  playerId: string;
  socketId: string;
  walletAddress: string;
  currentRoomId: string | null;
  connectedAt: number;
}
