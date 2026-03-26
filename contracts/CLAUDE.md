# Smart Contracts — Ek Kurallar

## Guvenlik

- IMPORTANT: Tum account constraint'lerini Anchor makrolari ile tanimla (`#[account(...)]`)
- PDA (Program Derived Address) kullan, dogrudan adres KULLANMA
- Arithmetic overflow: `checked_add`, `checked_mul` kullan
- Production oncesi: bagimsiz guvenlik denetimi (audit) zorunlu

## Kod Yapisi

- `lib.rs` — program giris noktasi, instruction tanimlari
- `state.rs` — account yapilari (GameRoom, PlayerEntry, EscrowVault)
- `errors.rs` — ozel hata kodlari
- `constants.rs` — program sabitleri (komisyon orani, limitler)

## IDL

- `anchor build` sonrasi `target/idl/escrow.json` uretilir
- IDL degistiginde frontend ve backend'e kopyala: `pnpm run idl:generate`
