// --- Oda Tipleri ---

export enum RoomType {
  QUICK = 'QUICK',
  GRAND = 'GRAND',
  PRIVATE = 'PRIVATE',
}

export enum RoomStatus {
  WAITING = 'WAITING',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

// --- Oyuncu Durumlari ---

export enum PlayerStatus {
  ACTIVE = 'ACTIVE',
  ELIMINATED = 'ELIMINATED',
  WINNER = 'WINNER',
  DISCONNECTED = 'DISCONNECTED',
}

// --- Oyun ---

export enum GameFormat {
  FORMAT_A = 'FORMAT_A',
  FORMAT_B = 'FORMAT_B',
}

export enum GameStatus {
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

// --- Format A Round Fazlari ---

export enum RoundPhase {
  SELECTION = 'SELECTION',
  PROTECTED = 'PROTECTED',
  PIE_FORM = 'PIE_FORM',
  SPINNING = 'SPINNING',
  ELIMINATION = 'ELIMINATION',
  NEXT_ROUND = 'NEXT_ROUND',
}
