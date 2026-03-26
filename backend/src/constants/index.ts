// --- Sunucu ---

export const SERVER_PORT = 3001;
export const SOCKET_CORS_ORIGIN = 'http://localhost:5173';

// --- Oyun Konfigurasyonu ---

export const GAME_CONFIG = {
  /** Quick Room: yeni oda acilma sikligi (ms) */
  QUICK_ROOM_INTERVAL_MS: 60_000,

  /** Minimum oyuncu sayisi (altinda oda iptal edilir) */
  MIN_PLAYERS: 5,

  /** Platform komisyon orani (%5 = 0.05) */
  COMMISSION_RATE: 0.05,

  /** Format A: Numara secim suresi (ms) */
  FORMAT_A_SELECTION_DURATION_MS: 15_000,

  /** Format A: Korunan numara reveal suresi (ms) */
  FORMAT_A_PROTECTED_DURATION_MS: 2_000,

  /** Format A: Pie chart olusum suresi (ms) */
  FORMAT_A_PIE_FORM_DURATION_MS: 2_000,

  /** Format A: Ok donus suresi araligi (ms) */
  FORMAT_A_SPIN_MIN_MS: 4_000,
  FORMAT_A_SPIN_MAX_MS: 8_000,

  /** Format A: Eleme animasyon suresi (ms) */
  FORMAT_A_ELIMINATION_DURATION_MS: 2_000,

  /** Format A: Sonraki round gecis suresi (ms) */
  FORMAT_A_NEXT_ROUND_DURATION_MS: 3_000,

  /** Format B: Oyun dongusu tick suresi (ms) */
  FORMAT_B_TICK_INTERVAL_MS: 100,

  /** Format B: Harita kuculme baslangic suresi (ms) */
  FORMAT_B_WATER_RISE_START_MS: 60_000,

  /** Format B: Yilan baslangic hizi carpani */
  FORMAT_B_SNAKE_BASE_SPEED: 1.0,

  /** Format B: Her eleme sonrasi yilan hiz artisi */
  FORMAT_B_SNAKE_SPEED_INCREMENT: 0.1,

  /** Format B: Safe zone suresi araligi (ms) */
  FORMAT_B_SAFE_ZONE_MIN_MS: 15_000,
  FORMAT_B_SAFE_ZONE_MAX_MS: 30_000,
} as const;

/** Format A: Oyuncu sayisina gore numara araligi */
export const NUMBER_RANGES: Array<{ maxPlayers: number; min: number; max: number }> = [
  { maxPlayers: 4, min: 0, max: 1 },
  { maxPlayers: 19, min: 0, max: 2 },
  { maxPlayers: 49, min: 0, max: 4 },
  { maxPlayers: 99, min: 0, max: 6 },
  { maxPlayers: Infinity, min: 0, max: 9 },
];

// --- Socket Event Isimleri ---

export const SOCKET_EVENTS = {
  // Client → Server
  LOBBY_SUBSCRIBE: 'lobby:subscribe',
  LOBBY_UNSUBSCRIBE: 'lobby:unsubscribe',
  ROOM_CREATE: 'room:create',
  ROOM_JOIN: 'room:join',
  ROOM_LEAVE: 'room:leave',
  GAME_SELECT_NUMBER: 'game:select-number',
  GAME_PLAYER_INPUT: 'game:player-input',

  // Server → Client
  LOBBY_ROOMS_UPDATE: 'lobby:rooms-update',
  ROOM_STATE: 'room:state',
  ROOM_PLAYER_JOINED: 'room:player-joined',
  ROOM_PLAYER_LEFT: 'room:player-left',
  ROOM_COUNTDOWN: 'room:countdown',
  ROOM_CANCELLED: 'room:cancelled',
  GAME_STARTED: 'game:started',
  GAME_SELECTION_PHASE: 'game:selection-phase',
  GAME_PROTECTED_REVEAL: 'game:protected-reveal',
  GAME_PIE_FORMED: 'game:pie-formed',
  GAME_ARROW_SPIN: 'game:arrow-spin',
  GAME_ELIMINATION: 'game:elimination',
  GAME_ROUND_END: 'game:round-end',
  GAME_WINNER: 'game:winner',
  GAME_STATE_UPDATE: 'game:state-update',
  GAME_PLAYER_ELIMINATED: 'game:player-eliminated',
  GAME_SAFE_ZONE_UPDATE: 'game:safe-zone-update',
  GAME_FORMAT_B_WINNER: 'game:format-b-winner',
  ERROR: 'error',
} as const;

// --- Redis Key Prefix'leri ---

export const REDIS_KEYS = {
  ROOM: 'room:',
  GAME: 'game:',
  PLAYER_SESSION: 'session:',
  ROOM_PLAYERS: 'room-players:',
} as const;
