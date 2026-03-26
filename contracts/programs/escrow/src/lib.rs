use anchor_lang::prelude::*;

pub mod constants;
pub mod errors;
pub mod state;

use state::*;

declare_id!("Hq4xk6qhKHC9utESZ2Bd1hut8v6iGyPbg4ByGo1ih7Lu");

#[program]
pub mod escrow {
    use super::*;

    /// Yeni bir oyun odasi olusturur ve escrow vault'u baslatir.
    /// Oda tipi (Quick, Grand, Private) ve giris ucreti belirlenir.
    pub fn initialize_room(
        ctx: Context<InitializeRoom>,
        room_id: String,
        entry_fee: u64,
        min_players: u8,
        max_players: u8,
    ) -> Result<()> {
        let game_room = &mut ctx.accounts.game_room;
        game_room.authority = ctx.accounts.authority.key();
        game_room.room_id = room_id;
        game_room.entry_fee = entry_fee;
        game_room.min_players = min_players;
        game_room.max_players = max_players;
        game_room.current_players = 0;
        game_room.total_pool = 0;
        game_room.status = 0; // WAITING
        game_room.committed_seed_hash = [0u8; 32];
        game_room.bump = ctx.bumps.game_room;
        game_room.created_at = Clock::get()?.unix_timestamp;
        Ok(())
    }

    /// Oyuncunun odaya katilmasini ve giris ucretini escrow'a kilitlemesini saglar.
    /// SPL Token (USDT) transferi: oyuncu cuzdani → escrow vault
    pub fn join_room(_ctx: Context<JoinRoom>) -> Result<()> {
        // Faz 2 Sprint 5'te implement edilecek (Task 5.2)
        Ok(())
    }

    /// Format A: Oyun bittiginde kazanana pool*95% transfer eder,
    /// platforma %5 komisyon aktarir.
    pub fn end_game_format_a(
        _ctx: Context<EndGameFormatA>,
        _revealed_seed: [u8; 32],
    ) -> Result<()> {
        // Faz 2 Sprint 5'te implement edilecek (Task 5.3)
        Ok(())
    }

    /// Minimum oyuncuya ulasilamadiysa odayi iptal eder,
    /// tum giris ucretlerini iade eder.
    pub fn cancel_room(_ctx: Context<CancelRoom>) -> Result<()> {
        // Faz 2 Sprint 5'te implement edilecek (Task 5.4)
        Ok(())
    }

    /// Provably fair: round baslangicinda seed hash'ini on-chain kaydeder.
    pub fn commit_seed_hash(
        _ctx: Context<CommitSeedHash>,
        _seed_hash: [u8; 32],
    ) -> Result<()> {
        // Faz 2 Sprint 5'te implement edilecek (Task 5.5)
        Ok(())
    }
}

// --- Instruction Account Yapilari ---

#[derive(Accounts)]
#[instruction(room_id: String)]
pub struct InitializeRoom<'info> {
    #[account(mut)]
    pub authority: Signer<'info>,

    #[account(
        init,
        payer = authority,
        space = 8 + GameRoom::INIT_SPACE,
        seeds = [b"game_room", room_id.as_bytes()],
        bump,
    )]
    pub game_room: Account<'info, GameRoom>,

    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct JoinRoom<'info> {
    #[account(mut)]
    pub player: Signer<'info>,

    #[account(mut)]
    pub game_room: Account<'info, GameRoom>,

    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct EndGameFormatA<'info> {
    #[account(mut)]
    pub authority: Signer<'info>,

    #[account(mut)]
    pub game_room: Account<'info, GameRoom>,

    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct CancelRoom<'info> {
    #[account(mut)]
    pub authority: Signer<'info>,

    #[account(mut)]
    pub game_room: Account<'info, GameRoom>,

    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct CommitSeedHash<'info> {
    #[account(mut)]
    pub authority: Signer<'info>,

    #[account(mut)]
    pub game_room: Account<'info, GameRoom>,
}
