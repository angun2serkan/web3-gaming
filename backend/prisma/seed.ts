import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('[Seed] Starting...');

  // Test oyunculari
  const player1 = await prisma.player.upsert({
    where: { walletAddress: 'DEV_WALLET_001' },
    update: {},
    create: {
      walletAddress: 'DEV_WALLET_001',
      displayName: 'Test Player 1',
    },
  });

  const player2 = await prisma.player.upsert({
    where: { walletAddress: 'DEV_WALLET_002' },
    update: {},
    create: {
      walletAddress: 'DEV_WALLET_002',
      displayName: 'Test Player 2',
    },
  });

  // Test odasi
  const room = await prisma.room.create({
    data: {
      type: 'QUICK',
      entryFee: 1.0,
      status: 'WAITING',
      minPlayers: 5,
      players: {
        create: [
          { playerId: player1.id },
          { playerId: player2.id },
        ],
      },
    },
  });

  console.log(`[Seed] Created players: ${player1.id}, ${player2.id}`);
  console.log(`[Seed] Created room: ${room.id}`);
  console.log('[Seed] Done.');
}

main()
  .catch((e) => {
    console.error('[Seed] Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
