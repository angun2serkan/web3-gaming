# Frontend — Ek Kurallar

## Bilesenler

- Dosya isimlendirme: PascalCase (`GameBoard.tsx`, `LobbyPage.tsx`)
- Barrel export: her dizinde `index.ts` ile
- Props interface'i bilesenle ayni dosyada tanimlanir

## State Yonetimi

- Global state: Zustand store'lari `src/stores/` altinda (Redux, MobX, Context KULLANMA)
- Server state: Socket.io event'lerinden gelen veri Zustand'a yazilir
- Form state: controlled components

## Routing

- React Router v7
- Route'lar: `/` (lobi), `/room/:id` (oda/oyun), `/history` (gecmis)
- Page bilesenleri: `src/pages/` altinda

## Styling

- Tailwind CSS utility-first — ozel CSS dosyasi OLUSTURMA (zorunlu degilse)
- Karanlik tema sabitleri: `src/constants/index.ts` icindeki THEME objesi
- Responsive: mobile-first yaklasim

## 3D (Format B)

- React Three Fiber + Three.js — sahne bilesenleri `src/game-b/` altinda
- Performance hedefi: 60fps 3 yillik orta segment mobil — instanced mesh, draw call minimizasyonu

## Animasyon (Format A)

- GSAP kullan (Framer Motion DEGIL)
- Animasyon bilesenleri: `src/game-a/` altinda
- Ok donusu: backend'den gelen targetAngle ve durationMs ile parametrik

## Test

- Framework: React Testing Library + Vitest
- Dosya adi: `*.test.tsx` veya `__tests__/` dizini
