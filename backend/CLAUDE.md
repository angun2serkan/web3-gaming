# Backend — Ek Kurallar

## Veritabani

- Prisma Client singleton: `src/db/prisma.ts` — yeni instance OLUSTURMA
- Redis Client singleton: `src/db/redis.ts` — yeni instance OLUSTURMA
- Finansal hesaplamalar: Decimal tipi kullan, float KULLANMA (yuvarlama hatalari)
- Yeni tablo: once `schema.prisma`'ya ekle, sonra `prisma migrate dev` calistir
- Sik sorgulanan alanlara index ekle (status, roomId, playerId)

## Socket.io

- Event handler'lari `src/socket/` altinda ayri dosyalarda
- Her event'te tip-guvenli payload kullan (`src/types/socket.ts`)
- Broadcast: `io.to(roomId).emit(...)` — odadaki herkese gonder

## Servis Katmani

- Is mantigi `src/services/` altinda — socket handler'lar ince tutulur, is mantigi servise delege edilir
- Servisler Prisma ve Redis'e dogrudan erisir

## Hata Yonetimi

- Socket hatalari: `socket.emit('error', { code, message })` ile client'a bildir
- DB hatalari: loglayip client'a genel hata mesaji gonder — detay VERME

## Ortam Degiskenleri

- IMPORTANT: `process.env` dogrudan kullanma — `validateEnv()` fonksiyonu ile eris
- Logging prefix formati: `[Modul] Mesaj` (ornek: `[Socket] Connected: abc123`)
- Graceful shutdown: SIGTERM ve SIGINT handle et

## Test

- Framework: Vitest
- Dosya adi: `*.test.ts` veya `__tests__/` dizini
- Veritabani testleri: gercek PostgreSQL kullan, mock'lama
