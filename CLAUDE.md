# Web3 Gaming Platform

Peer-to-pool gaming platformu. Oyuncular havuza katilir, platform %5 komisyon alir, kalan %95 kazananlara dagitilir.

## Komutlar

```bash
# Baslat (onkosul: Node.js 22+, pnpm 9.15+, Docker)
pnpm install
docker compose up -d
pnpm --filter @web3-gaming/backend exec prisma migrate dev
pnpm dev

# Build & Kontrol
pnpm build
pnpm lint
pnpm type-check

# Tek paket calistirma
pnpm --filter @web3-gaming/frontend dev
pnpm --filter @web3-gaming/backend dev

# Veritabani
pnpm --filter @web3-gaming/backend exec prisma migrate dev   # Migration olustur
pnpm --filter @web3-gaming/backend exec prisma studio         # Gorsel arayuz
pnpm --filter @web3-gaming/backend exec prisma generate       # Client yeniden uret

# Docker
docker compose up -d         # DB'leri baslat
docker compose down -v       # DB'leri sifirla (veri silinir!)

# Smart Contracts
cd contracts && anchor build
cd contracts && anchor test
```

## Mimari Kararlar

- **Paylasilmis tipler YOKTUR.** Frontend ve backend tipleri BAGIMSIZ tanimlanir. `shared/` paketi OLUSTURMA.
- **PostgreSQL:** Kalici veri. **Redis:** Gecici veri (aktif oyun state'i). Ayni veriyi iki DB'de TUTMA.
- **Monorepo:** pnpm workspaces + Turborepo. Paketler: frontend, backend, contracts.

## Kod Kurallari

- `any` tipi KULLANMA — `unknown` + type guard tercih et
- Dosya isimlendirme: kebab-case (`use-game-store.ts`, `validate-env.ts`)
- Import alias: `@/` → `src/` (her iki pakette)
- Prettier: tek tirnak, noktali virgul, trailing comma, 100 karakter satir limiti
- Socket event isimlendirme: `namespace:action` (ornek: `room:join`, `game:started`)
- Socket event sabitleri: `backend/src/constants/index.ts` ve `frontend/src/constants/index.ts` icindeki `SOCKET_EVENTS`

## Yasaklar

- `shared/` paketi veya dizini olusturma
- `.env` dosyalarini git'e commit etme
- `VITE_` prefix'siz frontend ortam degiskeni tanimlama
- `VITE_` prefix'li degiskene secret koyma (client bundle'da gorunur)
- Prisma migration'lari elle duzenleme — schema'yi degistir, `prisma migrate dev` calistir
- `pnpm-lock.yaml` dosyasini elle duzenleme
- Pre-commit hook'lari `--no-verify` ile atlama

## Referanslar

- Oyun tasarimi: @tasks/project-overview.md
- Gelistirme plani: @tasks/development-roadmap.md
- Veritabani schemasi: @backend/prisma/schema.prisma
