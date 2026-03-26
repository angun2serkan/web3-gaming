import { LobbyRoom, RoomState } from './room';
import {
  PieSlice,
  ArrowSpin,
  Elimination,
  ProtectedReveal,
  FormatAWinner,
  PlayerSphere,
  SnakeVisual,
  SafeZoneVisual,
  FormatBElimination,
  FormatBResult,
} from './game';

// ─────────────────────────────────────────────
// Client → Server Event'leri (emit)
// ─────────────────────────────────────────────

export interface ClientToServerEvents {
  'lobby:subscribe': () => void;
  'lobby:unsubscribe': () => void;
  'room:create': (data: { type: string; entryFee: number; maxPlayers?: number }) => void;
  'room:join': (data: { roomId: string }) => void;
  'room:leave': (data: { roomId: string }) => void;
  'game:select-number': (data: { gameId: string; number: number }) => void;
  'game:player-input': (data: { direction: 'left' | 'right' }) => void;
}

// ─────────────────────────────────────────────
// Server → Client Event'leri (on)
// ─────────────────────────────────────────────

export interface ServerToClientEvents {
  // Lobi
  'lobby:rooms-update': (data: { rooms: LobbyRoom[] }) => void;

  // Oda
  'room:state': (data: { room: RoomState }) => void;
  'room:player-joined': (data: {
    roomId: string;
    playerId: string;
    walletAddress: string;
    playerCount: number;
    poolSize: number;
  }) => void;
  'room:player-left': (data: {
    roomId: string;
    playerId: string;
    playerCount: number;
    poolSize: number;
  }) => void;
  'room:countdown': (data: { roomId: string; remainingMs: number }) => void;
  'room:cancelled': (data: { roomId: string; reason: string }) => void;

  // Format A
  'game:started': (data: {
    gameId: string;
    format: 'FORMAT_A' | 'FORMAT_B';
    playerCount: number;
    poolAmount: number;
  }) => void;
  'game:selection-phase': (data: {
    gameId: string;
    roundNumber: number;
    numberRange: { min: number; max: number };
    durationMs: number;
    endsAt: number;
  }) => void;
  'game:protected-reveal': (
    data: ProtectedReveal & { gameId: string; roundNumber: number },
  ) => void;
  'game:pie-formed': (data: { gameId: string; roundNumber: number; slices: PieSlice[] }) => void;
  'game:arrow-spin': (data: ArrowSpin & { gameId: string; roundNumber: number }) => void;
  'game:elimination': (data: Elimination & { gameId: string; roundNumber: number }) => void;
  'game:round-end': (data: {
    gameId: string;
    roundNumber: number;
    remainingPlayerCount: number;
    nextNumberRange: { min: number; max: number } | null;
  }) => void;
  'game:winner': (data: FormatAWinner) => void;

  // Format B
  'game:state-update': (data: {
    players: PlayerSphere[];
    snake: SnakeVisual;
    waterLevel: number;
  }) => void;
  'game:player-eliminated': (data: FormatBElimination) => void;
  'game:safe-zone-update': (data: { safeZones: SafeZoneVisual[] }) => void;
  'game:format-b-winner': (data: FormatBResult) => void;

  // Genel
  error: (data: { code: string; message: string }) => void;
}
