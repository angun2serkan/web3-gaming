/// Platform komisyon orani: %5 (basis points cinsinden: 500/10000)
pub const COMMISSION_RATE_BPS: u16 = 500;

/// Basis points paydasi
pub const BPS_DENOMINATOR: u16 = 10_000;

/// Minimum oyuncu sayisi (varsayilan)
pub const DEFAULT_MIN_PLAYERS: u8 = 5;

/// Maksimum oda ID uzunlugu (byte)
pub const MAX_ROOM_ID_LEN: usize = 64;

/// Platform cuzdan adresi (placeholder — production'da degistirilecek)
/// Gercek adres .env veya Anchor.toml uzerinden yapilandirilacak
pub const PLATFORM_WALLET: &str = "11111111111111111111111111111111";
