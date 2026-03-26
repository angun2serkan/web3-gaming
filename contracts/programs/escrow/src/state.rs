use anchor_lang::prelude::*;

/// Bir oyun odasinin on-chain state'i.
/// Her oda icin bir PDA olusturulur.
#[account]
#[derive(InitSpace)]
pub struct GameRoom {
    /// Oda olusturucusu / platform authority
    pub authority: Pubkey,

    /// Odanin benzersiz kimlik bilgisi (backend room ID ile eslesir)
    #[max_len(64)]
    pub room_id: String,

    /// Giris ucreti (lamports cinsinden, SPL Token decimals dahil)
    pub entry_fee: u64,

    /// Minimum oyuncu sayisi (varsayilan: 5)
    pub min_players: u8,

    /// Maksimum oyuncu sayisi
    pub max_players: u8,

    /// Mevcut oyuncu sayisi
    pub current_players: u8,

    /// Toplam havuz miktari (locked USDT)
    pub total_pool: u64,

    /// Oda durumu: 0=Waiting, 1=InProgress, 2=Completed, 3=Cancelled
    pub status: u8,

    /// Provably fair: round oncesi commit edilen seed hash
    pub committed_seed_hash: [u8; 32],

    /// PDA bump seed
    pub bump: u8,

    /// Olusturulma zamani (Unix timestamp)
    pub created_at: i64,
}

/// Bir oyuncunun odaya katilim kaydi.
/// Her oyuncu-oda cifti icin bir PDA olusturulur.
#[account]
#[derive(InitSpace)]
pub struct PlayerEntry {
    /// Oyuncunun cuzdan adresi
    pub player: Pubkey,

    /// Iliskili oda
    pub game_room: Pubkey,

    /// Odenen giris ucreti
    pub amount_paid: u64,

    /// Oyuncu durumu: 0=Active, 1=Eliminated, 2=Winner
    pub status: u8,

    /// PDA bump seed
    pub bump: u8,
}

/// Escrow vault konfigurasyonu.
/// Platform genelinde tek bir vault veya oda bazinda ayri vault olabilir.
#[account]
#[derive(InitSpace)]
pub struct EscrowVault {
    /// Vault authority (program PDA)
    pub authority: Pubkey,

    /// Iliskili oda
    pub game_room: Pubkey,

    /// Vault'taki toplam kilitli miktar
    pub total_locked: u64,

    /// PDA bump seed
    pub bump: u8,
}
