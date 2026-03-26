# Web3 Gaming Platform

Peer-to-pool gaming platform on Solana. Players enter a shared pool, the platform takes 5% commission, and 95% goes to winners.

## Game Formats

- **Format A — Spinning Arrow:** Number selection, elimination rounds, winner takes all
- **Format B — Snake Arena:** 3D top-down survival, progressive payout to survivors

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 19, Vite, Three.js, Tailwind CSS, Zustand |
| Backend | Node.js, Express, Socket.io, Prisma ORM |
| Database | PostgreSQL (persistent), Redis (real-time) |
| Blockchain | Solana, Anchor Framework, USDT (SPL) |

## Getting Started

```bash
pnpm install
docker compose up -d
pnpm --filter @web3-gaming/backend exec prisma migrate dev
pnpm dev
```

## Documentation

- [Project Overview](tasks/project-overview.md)
- [Development Roadmap](tasks/development-roadmap.md)
- [CLAUDE.md](CLAUDE.md) — Project conventions and rules

## License

Proprietary — All rights reserved.
