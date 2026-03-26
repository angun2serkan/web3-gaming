use anchor_lang::prelude::*;

#[error_code]
pub enum EscrowError {
    #[msg("Oda dolu — maksimum oyuncu sayisina ulasildi")]
    RoomFull,

    #[msg("Oda aktif degil — katilim icin WAITING durumunda olmali")]
    RoomNotActive,

    #[msg("Yetersiz oyuncu — minimum oyuncu sayisina ulasilamadi")]
    InsufficientPlayers,

    #[msg("Yetkisiz islem — sadece oda authority'si bu islemi yapabilir")]
    Unauthorized,

    #[msg("Gecersiz seed — hash dogrulamasi basarisiz")]
    InvalidSeed,

    #[msg("Oyun henuz bitmedi — payout icin oyunun tamamlanmasi gerekir")]
    GameNotFinished,

    #[msg("Oyuncu zaten odada — ayni oyuncu iki kez katilamaz")]
    PlayerAlreadyJoined,

    #[msg("Gecersiz giris ucreti — belirtilen miktar oda ucretiyle uyusmuyor")]
    InvalidEntryFee,

    #[msg("Oda iptal edilemez — oyun basladi")]
    CannotCancelActiveGame,
}
