import { GameFormat, GameStatus, RoundStatus, RoundPhase } from './enums';

/** Oyun bilgisi — veritabanindaki Game modeline karsilik gelir */
export interface Game {
  id: string;
  roomId: string;
  format: GameFormat;
  status: GameStatus;
  poolAmount: number;
  commission: number;
  startedAt: Date;
  endedAt: Date | null;
}

/** Round bilgisi — Format A icin */
export interface Round {
  id: string;
  gameId: string;
  roundNumber: number;
  protectedNumber: number | null;
  arrowResult: number | null;
  status: RoundStatus;
  startedAt: Date;
  endedAt: Date | null;
}

/** Redis'te saklanan aktif Format A oyun state'i */
export interface FormatAGameState {
  gameId: string;
  roomId: string;
  currentRound: number;
  phase: RoundPhase;
  numberRange: NumberRange;
  players: FormatAPlayerState[];
  protectedNumber: number | null;
  selections: Record<string, number>;
  seedHash: string;
  seed: string | null;
  phaseEndsAt: number;
}

/** Format A icin numara araligi kurali */
export interface NumberRange {
  min: number;
  max: number;
}

/** Format A'da bir oyuncunun round state'i */
export interface FormatAPlayerState {
  playerId: string;
  walletAddress: string;
  isEliminated: boolean;
  isProtected: boolean;
  selectedNumber: number | null;
}

/** Redis'te saklanan aktif Format B oyun state'i */
export interface FormatBGameState {
  gameId: string;
  roomId: string;
  players: FormatBPlayerState[];
  snake: SnakeState;
  safeZones: SafeZone[];
  waterLevel: number;
  elapsedMs: number;
  eliminationOrder: string[];
}

/** Format B'de bir oyuncunun state'i */
export interface FormatBPlayerState {
  playerId: string;
  walletAddress: string;
  x: number;
  y: number;
  angle: number;
  isAlive: boolean;
  accumulatedPayout: number;
}

/** Yilan state'i */
export interface SnakeState {
  segments: Array<{ x: number; y: number }>;
  angle: number;
  speed: number;
  killCount: number;
}

/** Safe zone */
export interface SafeZone {
  id: string;
  x: number;
  y: number;
  radius: number;
  isActive: boolean;
  capacity: number;
  currentOccupants: number;
  activatedAt: number;
  expiresAt: number;
}
