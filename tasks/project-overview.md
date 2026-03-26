# Peer-to-Pool Gaming Platform
## Game Design & Technical Documentation

**Version:** 1.0 | **Date:** March 2026 | **Status:** Draft

---

## Table of Contents

1. [Platform Overview](#1-platform-overview)
2. [Financial Model](#2-financial-model)
3. [Room Architecture](#3-room-architecture)
4. [Game Format A — The Spinning Arrow](#4-game-format-a--the-spinning-arrow)
5. [Game Format B — Snake Arena](#5-game-format-b--snake-arena)
6. [Technical Architecture](#6-technical-architecture)
7. [Blockchain & Payments](#7-blockchain--payments)

---

## 1. Platform Overview

### The Core Idea

Players pay into a shared pool. The platform takes 5% as commission. The remaining 95% goes to the winner or is distributed among survivors depending on the game format. The platform never bets against players — it has no stake in who wins. It is the arena, not the opponent.

### Core Principles

| Principle | Decision | Rationale |
|-----------|----------|-----------|
| Fairness | Session equality — no experience advantage | Every round starts from zero. First-time players can beat veterans. |
| Platform role | Experience provider, not pure intermediary | Atmosphere and narrative give the platform a distinctive identity. |
| Re-engagement | Loss to next game in under 5 seconds | Speed is retention. Player must not have time to decide to leave. |
| Social | Anonymous by default + optional friend rooms | Friend rooms are the primary viral growth engine. |
| Trust | Provably fair + transparent 5% commission | All results are cryptographically verifiable. Players must never feel cheated. |
| Business model | Peer-to-pool · 5% commission only | Platform profit scales with volume, not outcomes. Zero capital at risk. |

---

## 2. Financial Model

### Formula

```
Total pool         = Number of players × Entry fee
Platform commission = Total pool × 5%
Available to players = Total pool × 95%
Player expected value (EV) = −5% per game
```

**Comparison:**
- European Roulette: −2.7%
- American Roulette: −5.26%
- State Lotteries: −40% to −50%
- This platform: −5%

### Scenarios

| Entry | Players | Total Pool | Commission | To Players |
|-------|---------|------------|------------|------------|
| 1 USDT | 10 | 10 USDT | 0.50 USDT | 9.50 USDT |
| 5 USDT | 20 | 100 USDT | 5.00 USDT | 95.00 USDT |
| 10 USDT | 50 | 500 USDT | 25.00 USDT | 475.00 USDT |
| 25 USDT | 100 | 2,500 USDT | 125.00 USDT | 2,375.00 USDT |
| 50 USDT | 200 | 10,000 USDT | 500.00 USDT | 9,500.00 USDT |

---

## 3. Room Architecture

### Quick Room

A new room opens every 60 seconds regardless of how many players are waiting. If the minimum threshold of **5 players** is not reached when the timer expires, the round is cancelled and all entry fees are refunded instantly. No bots. No platform capital at risk.

| Parameter | Value |
|-----------|-------|
| New room frequency | Every 60 seconds |
| Minimum players to start | 5 (else cancelled, fees refunded) |
| Maximum players | No hard cap |
| Entry fee (POC) | 1 USDT — single tier |
| Waiting room | Live counter: players joined + current pool size |

### Grand Arena

A scheduled event — one per night at launch, scalable to hourly. Start time announced in advance. Large pool, high entry fee. Because the time is fixed, there is no waiting problem.

| Parameter | Value |
|-----------|-------|
| Frequency | Once per night at launch |
| Start time | Fixed and announced in advance (e.g. 9:00 PM daily) |
| Target players | 100–200+ |
| Prize pool example | 200 players × 25 USDT = 9,500 USDT to players |

### Private Room

Any player can create a private room and share an invite link. The creator controls everything.

| Parameter | Value |
|-----------|-------|
| Access | Invite-only link |
| Visibility | Fully private OR friends-first then open to public |
| Player count | Flexible — 2 to 50+ |
| Entry fee | Set by room creator — minimum 1 USDT |
| Start condition | Creator manually starts when ready |
| Commission | 5% — same as all room types |

---

## 4. Game Format A — The Spinning Arrow

### 4.1 User Perspective — How It Feels to Play

You open the platform and see a round dark table. Around it are small glowing shapes — other players, each represented by a unique geometric avatar generated from their wallet address. No names, no photos. Pure anonymity.

The round begins. A number range appears on your screen — say 0 to 9. You have 15 seconds to pick one. You tap 7. The timer counts down. The final 5 seconds pulse red. Your heart is already beating faster.

Time's up. Selections are locked. Then: a protected number is revealed — 3. Players who chose 3 glow green and slide away from the table. They're safe this round.

The remaining players form a pie on the table. You can see how big each slice is — the number 7 slice looks medium-sized. The arrow appears at the center of the pie.

It starts spinning. Fast at first. Then it slows. Then it trembles. You're staring at it. It's slowing toward your slice. Then it drifts past. Stops somewhere else. Another slice turns red. Those players shatter and vanish.

You survived. The range narrows to 0–6. Next round begins immediately.

### 4.2 Round Flow

```
┌─────────────────────────────────────────┐
│  PHASE 1 — NUMBER SELECTION (15 sec)    │
│  All players pick a number secretly.    │
│  Countdown visible. Last 5 sec red.     │
└──────────────────┬──────────────────────┘
                   │
┌──────────────────▼──────────────────────┐
│  PHASE 2 — PROTECTED NUMBER (2 sec)     │
│  Random protected number revealed.      │
│  Those players glow green, exit pie.    │
└──────────────────┬──────────────────────┘
                   │
┌──────────────────▼──────────────────────┐
│  PHASE 3 — PIE FORMS (2 sec)            │
│  Remaining players form slices.         │
│  Slice size = player count per number.  │
│  Arrow appears at center.               │
└──────────────────┬──────────────────────┘
                   │
┌──────────────────▼──────────────────────┐
│  PHASE 4 — ARROW SPINS (4–8 sec)        │
│  Duration randomised each round.        │
│  Slows, trembles, stops.                │
│  KEY TENSION MOMENT.                    │
└──────────────────┬──────────────────────┘
                   │
┌──────────────────▼──────────────────────┐
│  PHASE 5 — ELIMINATION (2 sec)          │
│  Target slice flashes red.              │
│  All players who chose that number      │
│  are eliminated. Avatars shatter.       │
└──────────────────┬──────────────────────┘
                   │
┌──────────────────▼──────────────────────┐
│  PHASE 6 — NEXT ROUND (3 sec)           │
│  Survivors advance.                     │
│  Number range narrows.                  │
│  New round begins immediately.          │
└─────────────────────────────────────────┘

Total round duration: 28–38 seconds
```

### 4.3 Narrowing Number Range

As players are eliminated, the selectable range shrinks. Early rounds feel open. Late rounds feel like a knife fight.

| Players Remaining | Range | Options | Tension |
|-------------------|-------|---------|---------|
| 100+ | 0–9 | 10 numbers | Low |
| 50–99 | 0–6 | 7 numbers | Building |
| 20–49 | 0–4 | 5 numbers | High |
| 5–19 | 0–2 | 3 numbers | Very high |
| 2–4 | 0–1 | 2 numbers | Maximum — near coin flip |

### 4.4 Edge Cases

| Situation | Resolution |
|-----------|------------|
| Target player chose the protected number | Arrow ignores protected players. Only pie players are valid targets. |
| All remaining players chose the same number | Round replayed. No elimination. |
| Final 2 players choose the same number | Pot split equally between both. |
| Player disconnects mid-round | Selection locked at disconnect. Normal elimination rules apply. |

### 4.5 Financial Mechanic — Winner Takes All

Format A uses a single-winner structure.

```
Last player standing receives:  pool × 95%
Platform commission:            pool × 5%
```

**Example — 200 players at 25 USDT:**
```
Total pool:    200 × 25 = 5,000 USDT
Commission:    5,000 × 5% = 250 USDT
Winner gets:   4,750 USDT
```

### 4.6 Visual Design

| Element | Design Decision |
|---------|-----------------|
| Color mode | Dark only — deep black (#0A0A0F). No light mode. |
| Table | Circular, dark texture. Player avatars around the rim. |
| Avatars | Unique geometric shapes derived from wallet address. No names. Full anonymity. |
| Pie slices | Proportional to player count. Animate when protected players are removed. |
| Arrow | Thin, metallic, sharp. Spin duration randomised — key tension source. |
| Elimination | Target slice flashes red. Avatars shatter. Red used only at this moment. |
| Win moment | Gold only for the winner. Pot amount animates large on screen. |
| Accent color | Single color — electric blue, cold green, or deep purple. Consistent. |

---

## 5. Game Format B — Snake Arena

### 5.1 User Perspective — How It Feels to Play

You enter the arena. Below you — from above — is Istanbul. The Bosphorus Bridge stretches across the center. The Galata Tower rises in the distance. The Grand Bazaar occupies a wide block to the south. The city is alive: lights glowing, water shimmering.

Your character is a small glowing sphere. It moves forward automatically — you can't stop it. You have two controls: left edge of the screen to turn left, right edge to turn right. That's everything.

Somewhere on the map, a dark segmented snake is moving. It's looking for you. And everyone else.

In the top corner of your screen: a small wallet. It reads 0.00 USDT. Every time another player is caught, you watch that number go up. 1.06 USDT. Someone else gone — 2.24 USDT. The longer you survive, the more you accumulate.

But the snake is getting faster. And the water is rising. The map edges are slowly drowning. The streets are getting narrower. A building starts glowing green — safe zone, limited capacity — you sprint toward it, three other players are already heading there, only two of you will fit.

You make it. The snake passes by. You're still alive. Your wallet: 5.18 USDT. You're halfway to profit.

### 5.2 Game Mechanics

#### Player Movement

```
Character behavior:
- Moves forward continuously — no stop command
- No passive play possible — movement is forced
- Two controls only:
  - Left turn button  → character turns left
  - Right turn button → character turns right

Desktop:  Left arrow key / Right arrow key
Mobile:   Left screen edge (transparent button) / Right screen edge (transparent button)
          Full-screen map visible at all times — no UI obstruction
```

#### Snake Behavior

The snake is fully system-controlled — no human operates it.

```
Algorithm:
1. Every second: calculate direction toward highest player density
2. Apply randomised angular variation (±15°) — not perfectly predictable
3. Bounce off walls and map boundaries
4. Speed multiplier increases with each elimination:
   - Start:          1.0×
   - After 1st kill: 1.1×
   - After 2nd kill: 1.2×
   - ...continues scaling
5. Catch condition: snake head overlaps player hitbox
```

The algorithm is published openly so players can verify it is not biased toward any individual.

#### Safe Zones

```
Activation: Random map locations, random intervals
Duration:   15–30 seconds per activation
Capacity:   Limited — not all players can fit simultaneously
Effect:     Snake cannot enter active safe zones
Visual:     Buildings glow with pulse animation when active
```

#### Map Shrink

```
Mechanic:  Rising water from map edges, closing inward over time
Trigger:   Time-based — begins after 60 seconds, accelerates after each elimination
Visual:    Translucent blue water plane with animated wave shader
Effect:    Players caught in water are eliminated
           Submerged buildings slowly disappear beneath the surface
```

### 5.3 Progressive Payout Model

Unlike Format A, Format B distributes the pool progressively as players are eliminated.

#### Formula

When a player is eliminated:
```
Amount distributed = eliminated_player_net_contribution / current_survivor_count

Each survivor receives += Amount distributed
```

Where `net_contribution = entry_fee × 0.95` (after 5% commission deducted at entry).

#### Full Payout Example — 10 Players, 10 USDT Entry

**Setup:**
```
Total pool:          10 × 10 = 100 USDT
Platform commission: 100 × 5% = 5 USDT
Each player contributes: 9.50 USDT to the live pool
```

**Round by round:**

| Death order | Wallet at death | Entry paid | Net result | Status |
|-------------|-----------------|------------|------------|--------|
| 1st out | 0.00 USDT | 9.50 USDT | −9.50 USDT | Full loss |
| 2nd out | 1.06 USDT | 9.50 USDT | −8.44 USDT | Loss |
| 3rd out | 2.24 USDT | 9.50 USDT | −7.26 USDT | Loss |
| 4th out | 3.60 USDT | 9.50 USDT | −5.90 USDT | Loss |
| 5th out | 5.18 USDT | 9.50 USDT | −4.32 USDT | Loss |
| 6th out | 7.08 USDT | 9.50 USDT | −2.42 USDT | Loss |
| 7th out | 9.46 USDT | 9.50 USDT | −0.04 USDT | Near break-even |
| 8th out | 12.63 USDT | 9.50 USDT | **+3.13 USDT** | **Profit** |
| 9th out | 17.38 USDT | 9.50 USDT | **+7.88 USDT** | **Profit** |
| Last survivor | 36.38 USDT | 9.50 USDT | **+26.88 USDT** | **Largest payout** |

**Verification:**
```
Total distributed: 0 + 1.06 + 2.24 + 3.60 + 5.18 + 7.08 + 9.46 + 12.63 + 17.38 + 36.38 = 95.01 USDT ✓
(0.01 USDT rounding — handled by smart contract)
```

#### Key Insight

The last 3 survivors always profit. The 7th-place player nearly breaks even. This creates a fundamentally different psychology from winner-takes-all: players are not only chasing first place — they are fighting to stay in the top 30%.

### 5.4 Live Wallet UI

The player's accumulating wallet is visible at all times during gameplay.

```
┌──────────────────┐
│  YOUR WALLET     │
│  ████████████    │
│  12.63 USDT  ↑  │
│  +1.19 USDT      │  ← flash on each elimination
└──────────────────┘
```

Every time a player is eliminated, a small notification appears showing the amount added. This is the equivalent of Aviator's rising multiplier — continuous visible reward accumulation while the game is live.

### 5.5 Map Design

| Phase | Map |
|-------|-----|
| POC | Abstract top-down layout — colored blocks, walls, corridors. Mechanics first. |
| MVP | Istanbul-themed 3D top-down map. Landmarks: Bosphorus Bridge, Galata Tower, Grand Bazaar, Historic Peninsula. Applied as texture and model layer over the same base geometry. |

#### 3D Visual Approach

```
Rendering:     Three.js — top-down perspective, fixed camera, 3D world
Buildings:     Low-poly extruded geometry — stylized, not photorealistic
               Strong silhouettes over polygon count
Lighting:      Night scene — city lights, Bosphorus reflection
               One directional light + ambient — cinematic feel
Water (map):   Animated wave shader on Bosphorus — reflective surface
Water (shrink): Rising translucent plane with normal map animation
Player spheres: Small 3D spheres — wallet-derived unique color per player
               Rolling animation synced to movement direction
               Soft emission glow — visible in dark streets
               Death: sphere launches upward, spins, shrinks, vanishes (0.5 sec)
Snake:         Segmented capsules — dark metallic with red glow
               Glow intensity increases with speed
               Head segment slightly larger than body
```

### 5.6 Controls Summary

| Platform | Left turn | Right turn |
|----------|-----------|------------|
| Desktop browser | Left arrow key | Right arrow key |
| Mobile browser | Left edge transparent button | Right edge transparent button |

Mobile layout:
```
┌─────────────────────────────┐
│                             │
│        [3D MAP]             │
│                             │
│                             │
│ [←]                   [→]  │
└─────────────────────────────┘
Buttons: transparent, full-height on each edge
Map: fully visible at all times
```

---

## 6. Technical Architecture

### Overview

```
┌─────────────────────────────────────────────────────────┐
│                     FRONTEND                            │
│  React + React Three Fiber + Three.js                   │
│  Format A: GSAP animations                              │
│  Format B: Three.js 3D rendering                        │
│  Wallet: Solana Wallet Adapter                          │
└──────────────────────┬──────────────────────────────────┘
                       │ WebSocket (Socket.io)
┌──────────────────────▼──────────────────────────────────┐
│                     BACKEND                             │
│  Node.js + Socket.io                                    │
│  Room management — both formats                         │
│  Round logic — Format A (arrow, number range)           │
│  Game loop — Format B (snake algorithm, positions)      │
│  Provably fair hash commitment                          │
└────────────┬──────────────────────┬─────────────────────┘
             │                      │
┌────────────▼──────┐  ┌────────────▼──────────────────────┐
│     REDIS         │  │          POSTGRESQL               │
│  Active game state│  │  Wallet addresses                 │
│  Room data        │  │  Game history                     │
│  Player positions │  │  Payment logs                     │
│  Round state      │  │  Room statistics                  │
└───────────────────┘  └───────────────────────────────────┘
                       │ On-chain (after game ends)
┌──────────────────────▼──────────────────────────────────┐
│                  BLOCKCHAIN — SOLANA                    │
│  Rust + Anchor Framework smart contracts                │
│  Escrow: entry fees locked per room                     │
│  Payout: automatic USDT transfer to winner/survivors    │
│  Commission: 5% auto-split by contract                  │
│  Provably fair: seed hash written before round          │
└─────────────────────────────────────────────────────────┘
```

### Frontend Stack

| Component | Technology | Purpose |
|-----------|------------|---------|
| Framework | React | UI logic, room screens, round flow, player lists |
| Format A animation | GSAP / Framer Motion | Arrow spin, pie transitions, elimination effects |
| Format B rendering | React Three Fiber + Three.js | 3D top-down map, snake, player spheres, water |
| Mobile controls | Native touch events | Two transparent edge buttons — no library needed |
| Wallet | Solana Wallet Adapter | Phantom, Solflare. Connect = anonymous login |

### Backend Stack

| Component | Technology | Purpose |
|-----------|------------|---------|
| Server | Node.js | Room management, game logic for both formats |
| Real-time | Socket.io (WebSocket) | All game events — player positions, round results, eliminations |
| Game loop (B) | Node.js setInterval | Snake position update every 100ms, broadcast to all clients |
| Provably fair | SHA-256 hash | Seed hashed before round, revealed after, verified on-chain |
| Scaling | Horizontal cluster | Add instances when load increases — no architecture change |

### Database

| Store | Technology | What it holds |
|-------|------------|---------------|
| Active game state | Redis | Current room state, player positions (B), selections (A), round data |
| Persistent records | PostgreSQL | Wallet history, game logs, payouts, statistics |

**Why both:** Redis is in-memory (sub-millisecond reads), ephemeral. PostgreSQL writes to disk, permanent. Different jobs — wrong to use one for both.

### Performance — Format B Specifics

```
Player spheres:   Instanced mesh rendering — 200 players = 1 draw call
Snake segments:   20–30 capsule meshes — negligible GPU load
Istanbul map:     Low-poly, ~10,000–15,000 polygons total — loads once, never changes
Water shader:     Animated on GPU — no CPU cost
Position updates: Server broadcasts every 100ms — client interpolates smoothly
Target device:    Runs at 60fps on a 3-year-old mid-range mobile browser
```

### Why Not Unity

| Consideration | Unity | React + Three.js |
|---------------|-------|-----------------|
| Distribution | App Store / Play Store — approval required, gambling apps rejected | Browser — link opens instantly, no install |
| Wallet integration | Complex, no native Solana support | Native — Solana Wallet Adapter works directly |
| WebSocket | External plugin required | Native |
| Deployment | Build, upload, review, approve | Push code, live immediately |
| Developer availability | Scarce, expensive | Large talent pool |
| Performance for this game | Overkill | More than sufficient |

---

## 7. Blockchain & Payments

### Stack

| Element | Choice | Reason |
|---------|--------|--------|
| Blockchain | Solana | Fast finality, low fees, mature ecosystem |
| Token | USDT (SPL standard) | Stablecoin — no price volatility risk for players |
| Smart contract | Rust + Anchor | Solana requirement — not optional |
| Login | Anonymous wallet connect | No email, no password, no registration |

### Money Flow

```
ENTRY
Player connects wallet → pays entry fee → fee locked in escrow smart contract
Platform never receives or holds player funds at this stage.

DURING GAME (Format B only)
As each player is eliminated, their net contribution is distributed
to survivors by the smart contract in real-time.

END OF GAME
Server reports winner / final survivor to smart contract.
Contract independently verifies result using provably fair seed.
Contract executes USDT transfer automatically.
5% commission transferred to platform wallet automatically.
No manual intervention at any point.
```

### Provably Fair

```
1. Before each round:
   Server generates secret seed
   Computes SHA-256 hash of seed
   Writes hash to Solana blockchain (immutable)

2. During round:
   Game outcome determined by seed
   (protected number in Format A / snake random variation in Format B)

3. After round:
   Server reveals original seed
   Any player can verify: hash(seed) == published hash
   Any player can recompute: outcome from seed + player inputs
   Manipulation is cryptographically impossible
```

### Escrow Contract Logic (Pseudocode)

```
Format A — Winner Takes All:
  on_game_end(winner_wallet):
    assert hash(revealed_seed) == committed_hash
    commission = total_pool * 0.05
    transfer(commission → platform_wallet)
    transfer(total_pool - commission → winner_wallet)

Format B — Progressive Payout:
  on_player_eliminated(eliminated_wallet, survivor_wallets):
    eliminated_contribution = entry_fee * 0.95
    per_survivor = eliminated_contribution / len(survivor_wallets)
    for wallet in survivor_wallets:
      survivor_balances[wallet] += per_survivor

  on_game_end(final_survivor_wallet):
    for wallet, balance in survivor_balances:
      transfer(balance → wallet)
    transfer(commission → platform_wallet)
```

---

*End of document. For questions or updates contact the project lead.*