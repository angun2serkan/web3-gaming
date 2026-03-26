import { TransactionType, TransactionStatus } from './enums';

/** Islem kaydi — veritabanindaki Transaction modeline karsilik gelir */
export interface Transaction {
  id: string;
  playerId: string;
  type: TransactionType;
  amount: number;
  txHash: string | null;
  status: TransactionStatus;
  createdAt: Date;
}
