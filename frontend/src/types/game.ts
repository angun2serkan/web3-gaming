import { RoundPhase } from './enums';

// ─────────────────────────────────────────────
// Format A — Spinning Arrow
// ─────────────────────────────────────────────

/** Format A oyun state'i — UI render icin */
export interface FormatAState {
  gameId: string;
  currentRound: number;
  phase: RoundPhase;
  numberRange: NumberRange;
  mySelection: number | null;
  isEliminated: boolean;
  isProtected: boolean;
  remainingPlayerCount: number;
  phaseEndsAt: number;
}

/** Numara araligi */
export interface NumberRange {
  min: number;
  max: number;
}

/** Pie chart dilimi */
export interface PieSlice {
  number: number;
  playerCount: number;
  percentage: number;
}

/** Ok dönüs animasyon parametreleri */
export interface ArrowSpin {
  targetAngle: number;
  durationMs: number;
}

/** Eleme bilgisi */
export interface Elimination {
  eliminatedNumber: number;
  eliminatedPlayerIds: string[];
  remainingPlayerCount: number;
}

/** Korunan numara reveal bilgisi */
export interface ProtectedReveal {
  protectedNumber: number;
  protectedPlayerIds: string[];
}

/** Kazanan bilgisi (Format A) */
export interface FormatAWinner {
  winnerId: string;
  winnerWallet: string;
  prizeAmount: number;
  totalRounds: number;
  isMe: boolean;
}

// ─────────────────────────────────────────────
// Format B — Snake Arena
// ─────────────────────────────────────────────

/** Format B'de bir oyuncu gorseli */
export interface PlayerSphere {
  playerId: string;
  x: number;
  y: number;
  angle: number;
  isAlive: boolean;
  color: string;
}

/** Yilan gorseli */
export interface SnakeVisual {
  segments: Array<{ x: number; y: number }>;
  speed: number;
  glowIntensity: number;
}

/** Safe zone gorseli */
export interface SafeZoneVisual {
  id: string;
  x: number;
  y: number;
  radius: number;
  isActive: boolean;
  currentOccupants: number;
  capacity: number;
}

/** Canli cuzdan gosterimi */
export interface LiveWallet {
  currentBalance: number;
  lastIncrement: number | null;
  entryFee: number;
  profitLoss: number;
}

/** Format B eleme bildirimi */
export interface FormatBElimination {
  eliminatedPlayerId: string;
  accumulatedPayout: number;
  remainingPlayerCount: number;
  myNewBalance: number | null;
}

/** Format B sonuc ozeti */
export interface FormatBResult {
  finalPayout: number;
  finishPosition: number;
  totalPlayers: number;
  isProfit: boolean;
  payoutSummary: Array<{
    walletAddress: string;
    totalPayout: number;
    finishPosition: number;
  }>;
}
