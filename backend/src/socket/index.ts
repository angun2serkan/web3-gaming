import { Server } from 'socket.io';

export function setupSocketHandlers(_io: Server): void {
  // Socket event handler'lar Faz 1'de eklenecek
  // Namespace'ler: /lobby, /game-a
  console.log('[Socket] Handlers initialized');
}
