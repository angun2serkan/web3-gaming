// --- Routing ---

export const ROUTES = {
  LOBBY: '/',
  ROOM: '/room/:id',
  HISTORY: '/history',
} as const;

// --- Socket Event Isimleri ---
// Backend ile ayni string degerler — senkronizasyon code review ile saglanir

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

// --- Oyun UI Sabitleri ---

export const UI_CONFIG = {
  /** Numara secim fazinda son X saniye kirmizi nabiz efekti */
  SELECTION_WARNING_MS: 5_000,

  /** Ok donus animasyonu icin GSAP easing */
  ARROW_SPIN_EASING: 'power3.out',

  /** Avatar uretimi icin renk paleti seed'i */
  AVATAR_COLOR_SEED: 42,

  /** Format B: Pozisyon interpolasyon suresi (ms) */
  POSITION_INTERPOLATION_MS: 100,

  /** Canli cuzdan flash animasyon suresi (ms) */
  WALLET_FLASH_DURATION_MS: 1_500,
} as const;

// --- Tema ---

export const THEME = {
  BG_PRIMARY: '#0A0A0F',
  BG_SECONDARY: '#12121A',
  ACCENT: '#4F46E5',
  DANGER: '#EF4444',
  SUCCESS: '#22C55E',
  GOLD: '#F59E0B',
} as const;
