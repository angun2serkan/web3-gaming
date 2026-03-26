import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Escrow } from "../target/types/escrow";
import { expect } from "chai";

describe("escrow", () => {
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.Escrow as Program<Escrow>;

  it("Program basariyla deploy edildi", async () => {
    const programInfo = await provider.connection.getAccountInfo(
      program.programId
    );
    expect(programInfo).to.not.be.null;
  });

  it("Oda basariyla olusturulabilir", async () => {
    const roomId = "test-room-001";
    const entryFee = new anchor.BN(1_000_000); // 1 USDT (6 decimals)
    const minPlayers = 5;
    const maxPlayers = 50;

    const [gameRoomPda] = anchor.web3.PublicKey.findProgramAddressSync(
      [Buffer.from("game_room"), Buffer.from(roomId)],
      program.programId
    );

    await program.methods
      .initializeRoom(roomId, entryFee, minPlayers, maxPlayers)
      .accounts({
        authority: provider.wallet.publicKey,
        gameRoom: gameRoomPda,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .rpc();

    const gameRoom = await program.account.gameRoom.fetch(gameRoomPda);
    expect(gameRoom.roomId).to.equal(roomId);
    expect(gameRoom.authority.toBase58()).to.equal(
      provider.wallet.publicKey.toBase58()
    );
    expect(gameRoom.status).to.equal(0); // WAITING
  });
});
