/** Bagli cuzdan bilgisi */
export interface WalletInfo {
  address: string;
  shortAddress: string;
  balance: number;
  isConnected: boolean;
}

/** Oyuncu avatar bilgisi — cuzdan adresinden deterministik uretilir */
export interface PlayerAvatar {
  walletAddress: string;
  color: string;
  shape: string;
}

/** Oyun gecmisi listesindeki bir kayit */
export interface GameHistoryEntry {
  gameId: string;
  format: 'FORMAT_A' | 'FORMAT_B';
  roomType: 'QUICK' | 'GRAND' | 'PRIVATE';
  entryFee: number;
  result: 'WIN' | 'LOSS' | 'DRAW';
  payout: number;
  profitLoss: number;
  playerCount: number;
  playedAt: string;
}
