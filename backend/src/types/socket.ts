import { RoomType } from './enums';
import { ActiveRoomState } from './room';

// ─────────────────────────────────────────────
// Client → Server Event'leri
// ─────────────────────────────────────────────

export interface ClientToServerEvents {
  // Lobi
  'lobby:subscribe': () => void;
  'lobby:unsubscribe': () => void;

  // Oda
  'room:create': (data: CreateRoomPayload) => void;
  'room:join': (data: JoinRoomPayload) => void;
  'room:leave': (data: LeaveRoomPayload) => void;

  // Format A — Oyun
  'game:select-number': (data: SelectNumberPayload) => void;

  // Format B — Oyun
  'game:player-input': (data: PlayerInputPayload) => void;
}

// ─────────────────────────────────────────────
// Server → Client Event'leri
// ─────────────────────────────────────────────

export interface ServerToClientEvents {
  // Lobi
  'lobby:rooms-update': (data: LobbyRoomsPayload) => void;

  // Oda
  'room:state': (data: RoomStatePayload) => void;
  'room:player-joined': (data: PlayerJoinedPayload) => void;
  'room:player-left': (data: PlayerLeftPayload) => void;
  'room:countdown': (data: CountdownPayload) => void;
  'room:cancelled': (data: RoomCancelledPayload) => void;

  // Format A — Round fazlari
  'game:started': (data: GameStartedPayload) => void;
  'game:selection-phase': (data: SelectionPhasePayload) => void;
  'game:protected-reveal': (data: ProtectedRevealPayload) => void;
  'game:pie-formed': (data: PieFormedPayload) => void;
  'game:arrow-spin': (data: ArrowSpinPayload) => void;
  'game:elimination': (data: EliminationPayload) => void;
  'game:round-end': (data: RoundEndPayload) => void;
  'game:winner': (data: WinnerPayload) => void;

  // Format B — Real-time
  'game:state-update': (data: FormatBStatePayload) => void;
  'game:player-eliminated': (data: FormatBEliminationPayload) => void;
  'game:safe-zone-update': (data: SafeZoneUpdatePayload) => void;
  'game:format-b-winner': (data: FormatBWinnerPayload) => void;

  // Genel
  error: (data: ErrorPayload) => void;
}

// ─────────────────────────────────────────────
// Payload Tipleri
// ─────────────────────────────────────────────

// --- Lobi ---

export interface LobbyRoomsPayload {
  rooms: LobbyRoomInfo[];
}

export interface LobbyRoomInfo {
  roomId: string;
  type: RoomType;
  entryFee: number;
  playerCount: number;
  maxPlayers: number | null;
  startsAt: number | null;
}

// --- Oda ---

export interface CreateRoomPayload {
  type: RoomType;
  entryFee: number;
  maxPlayers?: number;
}

export interface JoinRoomPayload {
  roomId: string;
}

export interface LeaveRoomPayload {
  roomId: string;
}

export interface RoomStatePayload {
  room: ActiveRoomState;
}

export interface PlayerJoinedPayload {
  roomId: string;
  playerId: string;
  walletAddress: string;
  playerCount: number;
  poolSize: number;
}

export interface PlayerLeftPayload {
  roomId: string;
  playerId: string;
  playerCount: number;
  poolSize: number;
}

export interface CountdownPayload {
  roomId: string;
  remainingMs: number;
}

export interface RoomCancelledPayload {
  roomId: string;
  reason: string;
}

// --- Format A ---

export interface GameStartedPayload {
  gameId: string;
  format: 'FORMAT_A' | 'FORMAT_B';
  playerCount: number;
  poolAmount: number;
}

export interface SelectNumberPayload {
  gameId: string;
  number: number;
}

export interface SelectionPhasePayload {
  gameId: string;
  roundNumber: number;
  numberRange: { min: number; max: number };
  durationMs: number;
  endsAt: number;
}

export interface ProtectedRevealPayload {
  gameId: string;
  roundNumber: number;
  protectedNumber: number;
  protectedPlayerIds: string[];
}

export interface PieFormedPayload {
  gameId: string;
  roundNumber: number;
  slices: Array<{
    number: number;
    playerCount: number;
    percentage: number;
  }>;
}

export interface ArrowSpinPayload {
  gameId: string;
  roundNumber: number;
  targetAngle: number;
  durationMs: number;
}

export interface EliminationPayload {
  gameId: string;
  roundNumber: number;
  eliminatedNumber: number;
  eliminatedPlayerIds: string[];
  remainingPlayerCount: number;
}

export interface RoundEndPayload {
  gameId: string;
  roundNumber: number;
  remainingPlayerCount: number;
  nextNumberRange: { min: number; max: number } | null;
  seedReveal: string;
}

export interface WinnerPayload {
  gameId: string;
  winnerId: string;
  winnerWallet: string;
  prizeAmount: number;
  totalRounds: number;
}

// --- Format B ---

export interface PlayerInputPayload {
  direction: 'left' | 'right';
}

export interface FormatBStatePayload {
  players: Array<{
    playerId: string;
    x: number;
    y: number;
    angle: number;
    isAlive: boolean;
  }>;
  snake: {
    segments: Array<{ x: number; y: number }>;
    speed: number;
  };
  waterLevel: number;
}

export interface FormatBEliminationPayload {
  eliminatedPlayerId: string;
  eliminatedWallet: string;
  accumulatedPayout: number;
  remainingPlayerCount: number;
  payoutPerSurvivor: number;
}

export interface SafeZoneUpdatePayload {
  safeZones: Array<{
    id: string;
    x: number;
    y: number;
    radius: number;
    isActive: boolean;
    currentOccupants: number;
    capacity: number;
  }>;
}

export interface FormatBWinnerPayload {
  gameId: string;
  lastSurvivorId: string;
  lastSurvivorWallet: string;
  finalPayout: number;
  payoutSummary: Array<{
    playerId: string;
    walletAddress: string;
    totalPayout: number;
    finishPosition: number;
  }>;
}

// --- Genel ---

export interface ErrorPayload {
  code: string;
  message: string;
}
