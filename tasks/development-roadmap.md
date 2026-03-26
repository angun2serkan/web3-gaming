# Peer-to-Pool Gaming Platform — Geliştirme Roadmap'i

**Versiyon:** 1.0 | **Tarih:** Mart 2026 | **Durum:** Taslak

---

## İçindekiler

1. [Genel Bakış](#1-genel-bakış)
2. [Faz 0 — Proje Altyapısı (2 Hafta)](#2-faz-0--proje-altyapısı-2-hafta)
3. [Faz 1 — POC: Format A Çalışan Prototip (8 Hafta)](#3-faz-1--poc-format-a-çalışan-prototip-8-hafta)
4. [Faz 2 — MVP: Format A Tam Sürüm + Format B Başlangıç (10 Hafta)](#4-faz-2--mvp-format-a-tam-sürüm--format-b-başlangıç-10-hafta)
5. [Faz 3 — Beta: Tüm Formatlar + Blockchain Entegrasyonu (8 Hafta)](#5-faz-3--beta-tüm-formatlar--blockchain-entegrasyonu-8-hafta)
6. [Faz 4 — Production: Lansman Hazırlığı (6 Hafta)](#6-faz-4--production-lansman-hazırlığı-6-hafta)
7. [Toplam Zaman Çizelgesi](#7-toplam-zaman-çizelgesi)
8. [Ekip Yapısı](#8-ekip-yapısı)
9. [Risk Analizi](#9-risk-analizi)
10. [Teknik Bağımlılık Haritası](#10-teknik-bağımlılık-haritası)

---

## 1. Genel Bakış

### Strateji

| Karar | Gerekçe |
|-------|---------|
| Format A önce geliştirilir | Daha basit mekanik, 2D animasyon, hızlı prototipleme |
| Format B ikinci fazda başlar | 3D rendering, karmaşık fizik, daha fazla optimizasyon gerektirir |
| Smart contract geliştirme paralel ilerler | Blockchain ekibi frontend/backend'den bağımsız çalışabilir |
| POC'da gerçek blockchain yok | Hızlı iterasyon için mock payment, Devnet sonraki fazda |
| Mobile-first tasarım | Hedef kitlenin çoğunluğu mobil kullanıcı |

### Faz Özeti

```
Faz 0  [2 hafta]   → Proje altyapısı, repo yapısı, CI/CD
Faz 1  [8 hafta]   → POC: Format A çalışan prototip (mock ödeme)
Faz 2  [10 hafta]  → MVP: Format A production-ready + Format B prototip
Faz 3  [8 hafta]   → Beta: Blockchain entegrasyonu, her iki format canlı
Faz 4  [6 hafta]   → Production: Güvenlik, performans, lansman
─────────────────────
Toplam: ~34 hafta (~8.5 ay)
```

---

## 2. Faz 0 — Proje Altyapısı (2 Hafta)

### Sprint 0 (Hafta 1–2)

**Hedef:** Geliştirme ortamını, repo yapısını ve CI/CD pipeline'ını kurmak.

#### Görevler

| # | Görev | Detay | Efor |
|---|-------|-------|------|
| 0.1 | Monorepo yapısı oluştur | `frontend/`, `backend/`, `contracts/`, `shared/` dizinleri. pnpm workspace veya Turborepo. | 0.5 gün |
| 0.2 | Frontend boilerplate | Vite + React + TypeScript. Tailwind CSS. React Three Fiber kurulumu. ESLint + Prettier config. | 1 gün |
| 0.3 | Backend boilerplate | Node.js + TypeScript + Express + Socket.io. Nodemon dev setup. | 1 gün |
| 0.4 | Veritabanı kurulumu | Docker Compose ile PostgreSQL + Redis. Prisma ORM init. Temel schema tasarımı. | 1 gün |
| 0.5 | Smart contract boilerplate | Anchor Framework init. Solana CLI + local validator kurulumu. | 0.5 gün |
| 0.6 | CI/CD pipeline | GitHub Actions: lint, type-check, test, build. Branch protection rules. | 1 gün |
| 0.7 | Shared types paketi | `shared/` altında ortak TypeScript tipleri: `Room`, `Player`, `GameState`, `Round`. Frontend ve backend'in ortak kullanacağı tipler. | 0.5 gün |
| 0.8 | Ortam değişkenleri | `.env.example` dosyaları. dotenv config. Development/staging/production ayrımı. | 0.5 gün |
| 0.9 | CLAUDE.md ve dökümantasyon | Proje kuralları, geliştirme rehberi, mimari kararlar. | 0.5 gün |
| 0.10 | Git branching stratejisi | `main`, `develop`, `feature/*`, `release/*` branch yapısı. PR template. | 0.5 gün |

#### Dizin Yapısı

```
web3-gaming/
├── frontend/
│   ├── src/
│   │   ├── components/        # Paylaşılan UI bileşenleri
│   │   ├── pages/             # Sayfa bileşenleri
│   │   ├── game-a/            # Format A — Spinning Arrow
│   │   ├── game-b/            # Format B — Snake Arena
│   │   ├── hooks/             # Custom React hooks
│   │   ├── stores/            # Zustand state management
│   │   ├── lib/               # Utility fonksiyonlar
│   │   └── assets/            # Görseller, sesler, fontlar
│   ├── public/
│   ├── package.json
│   ├── vite.config.ts
│   └── tsconfig.json
├── backend/
│   ├── src/
│   │   ├── rooms/             # Oda yönetimi
│   │   ├── games/             # Oyun mantığı (A ve B)
│   │   ├── socket/            # WebSocket event handlers
│   │   ├── services/          # İş mantığı servisleri
│   │   ├── db/                # Prisma client, migrations
│   │   ├── utils/             # Yardımcı fonksiyonlar
│   │   └── middleware/        # Auth, rate limiting, validation
│   ├── prisma/
│   │   └── schema.prisma
│   ├── package.json
│   └── tsconfig.json
├── contracts/
│   ├── programs/
│   │   └── escrow/            # Anchor smart contract
│   ├── tests/
│   ├── Anchor.toml
│   └── Cargo.toml
├── shared/
│   ├── types/                 # Ortak TypeScript tipleri
│   └── constants/             # Ortak sabitler
├── docker-compose.yml
├── .github/
│   └── workflows/
├── project-overview.md
├── development-roadmap.md
└── CLAUDE.md
```

#### Milestone

> **M0:** Tüm geliştiriciler `git clone` → `pnpm install` → `pnpm dev` ile çalışan bir ortama sahip. Frontend localhost:5173, backend localhost:3001, DB'ler Docker'da ayakta.

---

## 3. Faz 1 — POC: Format A Çalışan Prototip (8 Hafta)

### Sprint 1 (Hafta 3–4): Temel Altyapı + Oda Sistemi

**Hedef:** WebSocket bağlantısı, oda oluşturma/katılma, bekleme odası UI'ı.

#### Backend Görevleri

| # | Görev | Detay | Efor |
|---|-------|-------|------|
| 1.1 | Socket.io event yapısı | Namespace'ler: `/lobby`, `/game-a`. Event isimlendirme standardı (`room:create`, `room:join`, `game:start` vb.). | 1 gün |
| 1.2 | Oda yönetim sistemi | `RoomManager` sınıfı: oda oluşturma, katılma, ayrılma, silme. Redis'te oda state'i saklama. Oda tipleri: quick, grand, private. | 2 gün |
| 1.3 | Quick Room zamanlayıcı | 60 saniyede bir yeni oda açılması. Minimum 5 oyuncu kontrolü. Eşik altında iptal + iade mantığı. | 1 gün |
| 1.4 | Oyuncu session yönetimi | Socket ID ↔ oyuncu eşleştirme. Disconnect/reconnect handling. Redis'te session saklama. | 1 gün |
| 1.5 | Mock wallet sistemi | POC için gerçek blockchain yerine sahte cüzdan. Her oyuncuya test bakiyesi. Giriş ücreti düşme/iade simülasyonu. | 1 gün |

#### Frontend Görevleri

| # | Görev | Detay | Efor |
|---|-------|-------|------|
| 1.6 | Lobi sayfası | Aktif odaları listeleme. Oyuncu sayısı, havuz büyüklüğü, geri sayım gösterimi. Responsive grid layout. | 2 gün |
| 1.7 | Bekleme odası UI | Canlı oyuncu sayacı. Mevcut havuz büyüklüğü. 60 saniyelik geri sayım animasyonu. "Katıl" butonu. | 1.5 gün |
| 1.8 | Socket.io client entegrasyonu | Bağlantı yönetimi, otomatik reconnect, event listener'lar, state senkronizasyonu. | 1 gün |
| 1.9 | Mock cüzdan bağlantı UI | Basit "Cüzdan Bağla" butonu (POC'da gerçek değil). Bakiye gösterimi. | 0.5 gün |
| 1.10 | Temel navigasyon | React Router: `/` (lobi), `/room/:id` (bekleme/oyun), `/history` (geçmiş). | 0.5 gün |

#### Veritabanı

| # | Görev | Detay | Efor |
|---|-------|-------|------|
| 1.11 | Prisma schema v1 | `Player`, `Room`, `Game`, `Round`, `Transaction` modelleri. İlişkiler ve indeksler. | 1 gün |
| 1.12 | Redis data modeli | Oda state yapısı, oyuncu listesi, round state. TTL stratejisi. Key naming convention. | 0.5 gün |

#### Milestone

> **M1:** Birden fazla tarayıcı sekmesinden lobiye bağlanabilme, oda oluşturma, odaya katılma, bekleme odasında canlı oyuncu sayısını görme. WebSocket üzerinden real-time iletişim çalışıyor.

---

### Sprint 2 (Hafta 5–6): Format A — Çekirdek Oyun Mantığı

**Hedef:** Numara seçimi, korunan numara, pie chart oluşturma, ok dönüşü ve eleme mekaniği.

#### Backend Görevleri

| # | Görev | Detay | Efor |
|---|-------|-------|------|
| 2.1 | Round state machine | Faz geçişleri: `SELECTION → PROTECTED → PIE_FORM → SPINNING → ELIMINATION → NEXT_ROUND`. Her faz için zamanlayıcı. | 2 gün |
| 2.2 | Numara seçim fazı (15sn) | Oyunculardan numara toplama. Zaman aşımında rastgele atama. Seçimleri Redis'te saklama. | 1 gün |
| 2.3 | Korunan numara belirleme | SHA-256 seed ile korunan numara hesaplama. Provably fair: seed hash'i round başında commit, round sonunda reveal. | 1 gün |
| 2.4 | Pie chart hesaplama | Her numaradaki oyuncu sayısına göre dilim büyüklükleri. Korunan numara oyuncuları çıkarılır. | 0.5 gün |
| 2.5 | Ok dönüş sonucu belirleme | Seed'den deterministik ok durma pozisyonu. Hangi dilimin eleneceği hesabı. | 1 gün |
| 2.6 | Eleme ve round ilerletme | Elenen oyuncuları çıkarma. Numara aralığı daraltma mantığı (100+→0-9, 50-99→0-6, 20-49→0-4, 5-19→0-2, 2-4→0-1). | 1 gün |
| 2.7 | Edge case handling | Tüm oyuncular aynı numarayı seçerse → round tekrar. Son 2 oyuncu aynı numara → pot bölüşümü. Disconnect → seçim kilitlenir. | 1 gün |
| 2.8 | Kazanan belirleme + ödeme | Son kalan oyuncu = kazanan. Mock wallet'a pool × 95% aktarım. Platform komisyonu hesabı. | 0.5 gün |

#### Frontend Görevleri

| # | Görev | Detay | Efor |
|---|-------|-------|------|
| 2.9 | Oyun ekranı layout | Karanlık tema (#0A0A0F). Yuvarlak masa. Oyuncu avatarları (cüzdan adresinden geometrik şekil üretimi). | 1.5 gün |
| 2.10 | Numara seçim UI | Numara butonları. 15 sn geri sayım. Son 5 saniye kırmızı nabız efekti. Seçim kilidi gösterimi. | 1 gün |
| 2.11 | Korunan numara reveal animasyonu | Korunan numara açılma efekti. Seçen oyuncuların yeşil parlaması. Masadan ayrılma animasyonu. | 1 gün |
| 2.12 | Pie chart rendering | Canvas veya SVG ile orantılı dilimler. Oyuncu sayısına göre dinamik boyutlandırma. Geçiş animasyonları. | 1.5 gün |

#### Milestone

> **M2:** Tam bir Format A oyun döngüsü çalışıyor: numara seç → korunan numara → pie oluş → ok dön → eleme → sonraki round. Birden fazla tarayıcıda eş zamanlı test edilebilir. Görsel olarak henüz basit ama mekanik doğru.

---

### Sprint 3 (Hafta 7–8): Format A — Ok Animasyonu + Görsel Polish

**Hedef:** GSAP ile ok dönüş animasyonu, eleme efektleri, kazanma anı.

#### Frontend Görevleri

| # | Görev | Detay | Efor |
|---|-------|-------|------|
| 3.1 | Ok (arrow) bileşeni | İnce, metalik, keskin ok tasarımı. Pie chart merkezine yerleşim. | 0.5 gün |
| 3.2 | GSAP ok dönüş animasyonu | Rastgele süre (4-8 sn). Hızlı başlangıç → yavaşlama → titreme → durma. Easing curve tasarımı. Backend'den gelen hedef açıya göre animasyon. | 2 gün |
| 3.3 | Eleme animasyonu | Hedef dilim kırmızı yanıp sönme. Avatar parçalanma (shatter) efekti. Kırmızı renk SADECE bu anda kullanılır. | 1.5 gün |
| 3.4 | Kazanma animasyonu | Altın renk efekti. Havuz miktarı büyük font ile animasyonlu gösterim. Konfeti veya parçacık efekti. | 1 gün |
| 3.5 | Avatar sistemi | Cüzdan adresinden deterministik geometrik şekil üretimi. Unique renk, unique form. Anonim kimlik. | 1 gün |
| 3.6 | Ses efektleri | Ok dönüş sesi (tik-tik), eleme sesi, kazanma sesi, geri sayım sesi. Web Audio API veya Howler.js. | 1 gün |
| 3.7 | Responsive tasarım | Mobil uyumluluk. Touch event'leri. Numara butonları mobilde kolay tıklanabilir boyutta. | 1 gün |
| 3.8 | Spectator modu | Elenen oyuncuların izlemeye devam edebilmesi. Farklı UI state (gri tonlar, "İzliyorsun" etiketi). | 0.5 gün |

#### Backend Görevleri

| # | Görev | Detay | Efor |
|---|-------|-------|------|
| 3.9 | Oyun sonuç kayıt | PostgreSQL'e oyun sonuçları yazma. Round detayları, oyuncu sıralamaları, ödeme bilgileri. | 1 gün |
| 3.10 | Oyun geçmişi API | REST endpoint: oyuncu geçmişi, oda istatistikleri. Pagination. | 0.5 gün |
| 3.11 | Provably fair doğrulama endpoint'i | Seed reveal API. Hash doğrulama endpoint'i. Oyuncu tarafında doğrulama dokümantasyonu. | 0.5 gün |

#### Milestone

> **M3:** Format A görsel olarak etkileyici ve oynaması zevkli. Ok animasyonu gerilim yaratıyor. Mobilde ve masaüstünde çalışıyor. Oyun sonuçları kaydediliyor. **POC demo'ya hazır.**

---

### Sprint 4 (Hafta 9–10): Private Room + Grand Arena + Stabilizasyon

**Hedef:** Tüm oda tiplerini tamamlama, hata düzeltme, performans iyileştirme.

#### Backend Görevleri

| # | Görev | Detay | Efor |
|---|-------|-------|------|
| 4.1 | Private Room sistemi | Davet linki oluşturma (unique hash). Link ile katılma. Oda ayarları: giriş ücreti, max oyuncu. Oluşturucunun "Başlat" kontrolü. | 2 gün |
| 4.2 | Grand Arena sistemi | Zamanlanmış etkinlik oluşturma. Önceden duyuru mekanizması. Yüksek oyuncu kapasitesi (100-200+). Giriş ücreti konfigürasyonu. | 1.5 gün |
| 4.3 | Rate limiting | Socket event rate limiting. DDoS koruması. Spam mesaj önleme. | 0.5 gün |
| 4.4 | Hata yönetimi | Global error handler. Oyuncu disconnect recovery. Sunucu crash recovery (Redis'ten state geri yükleme). | 1.5 gün |
| 4.5 | Logging ve monitoring | Winston logger. Yapılandırılmış log formatı. Hata izleme (Sentry veya benzeri). | 1 gün |

#### Frontend Görevleri

| # | Görev | Detay | Efor |
|---|-------|-------|------|
| 4.6 | Private Room UI | Oda oluşturma formu. Davet linki kopyalama/paylaşma. Oda ayarları paneli. | 1.5 gün |
| 4.7 | Grand Arena UI | Yaklaşan etkinlik listesi. Geri sayım (etkinlik başlangıcına). Kayıt/katılım butonu. Büyük havuz gösterimi. | 1 gün |
| 4.8 | Oyun geçmişi sayfası | Geçmiş oyunlar listesi. Kazanç/kayıp özeti. Round detayları. Provably fair doğrulama butonu. | 1 gün |
| 4.9 | Loading ve hata state'leri | Skeleton loader'lar. Bağlantı kopma bildirimi. Yeniden bağlanma UI'ı. | 0.5 gün |
| 4.10 | UI polish ve bug fix | Animasyon ince ayarları. Cross-browser test. Edge case UI sorunları. | 1.5 gün |

#### Test

| # | Görev | Detay | Efor |
|---|-------|-------|------|
| 4.11 | Backend unit testleri | Round state machine, eleme mantığı, payout hesabı, edge case'ler. Vitest. | 2 gün |
| 4.12 | Frontend component testleri | Pie chart render, numara seçim, animasyon trigger'ları. React Testing Library. | 1 gün |
| 4.13 | E2E oyun testi | Playwright ile tam oyun döngüsü. Birden fazla tarayıcı window. | 1.5 gün |

#### Milestone

> **M4 (FAZ 1 SONU):** Format A tamamen fonksiyonel. 3 oda tipi çalışıyor. Mock ödeme sistemi ile uçtan uca oynanabilir. Test coverage %70+. **POC tamamlandı.**

---

## 4. Faz 2 — MVP: Format A Tam Sürüm + Format B Başlangıç (10 Hafta)

### Sprint 5 (Hafta 11–12): Solana Smart Contract v1

**Hedef:** Escrow smart contract'ı geliştirme ve Devnet'e deploy.

#### Smart Contract Görevleri

| # | Görev | Detay | Efor |
|---|-------|-------|------|
| 5.1 | Escrow program tasarımı | Account yapıları: `GameRoom`, `PlayerEntry`, `EscrowVault`. PDA (Program Derived Address) stratejisi. | 1.5 gün |
| 5.2 | Giriş ücreti kilitleme | `join_room` instruction: oyuncudan USDT alıp escrow vault'a kilitleme. SPL Token transfer. | 2 gün |
| 5.3 | Format A payout — Winner Takes All | `end_game_a` instruction: kazanana pool×95% transfer, platforma %5 komisyon. Seed hash doğrulama on-chain. | 2 gün |
| 5.4 | İptal ve iade | `cancel_room` instruction: minimum oyuncuya ulaşılamazsa tüm giriş ücretlerini iade. | 1 gün |
| 5.5 | Provably fair on-chain | Hash commitment on-chain kayıt. Seed reveal ve doğrulama. Manipülasyon imkansızlığının kriptografik garantisi. | 1.5 gün |
| 5.6 | Anchor testleri | Her instruction için unit test. Happy path + edge case'ler. Devnet deploy. | 2 gün |

#### Milestone

> **M5:** Escrow smart contract Devnet'te çalışıyor. Giriş ücreti kilitleme, kazanana ödeme, iptal/iade fonksiyonları test edildi.

---

### Sprint 6 (Hafta 13–14): Wallet Entegrasyonu + Format A Blockchain Bağlantısı

**Hedef:** Frontend'de gerçek Solana cüzdan bağlantısı. Backend ↔ smart contract iletişimi.

#### Frontend Görevleri

| # | Görev | Detay | Efor |
|---|-------|-------|------|
| 6.1 | Solana Wallet Adapter entegrasyonu | Phantom, Solflare, Backpack desteği. `WalletProvider` ve `ConnectionProvider` setup. | 1 gün |
| 6.2 | Cüzdan bağlantı UI | "Cüzdan Bağla" modal. Cüzdan seçim listesi. Bağlı cüzdan adresi gösterimi (kısaltılmış). Bakiye gösterimi. | 1 gün |
| 6.3 | Oyun giriş işlemi | "Katıl" butonuna basıldığında cüzdandan escrow'a USDT transferi. Transaction onay modal'ı. İşlem durumu gösterimi (pending/confirmed/failed). | 2 gün |
| 6.4 | Kazanç gösterimi | Oyun sonunda kazanç miktarı + Solana Explorer transaction linki. | 0.5 gün |

#### Backend Görevleri

| # | Görev | Detay | Efor |
|---|-------|-------|------|
| 6.5 | Solana RPC bağlantısı | `@solana/web3.js` entegrasyonu. Devnet/Mainnet config. RPC endpoint yönetimi. | 0.5 gün |
| 6.6 | Transaction builder | Oyun sonu transaction oluşturma. Escrow release instruction. Server-side signing (platform wallet). | 1.5 gün |
| 6.7 | On-chain doğrulama | Oyuncunun gerçekten ödeme yaptığını on-chain doğrulama. Çift harcama önleme. | 1 gün |
| 6.8 | Transaction logging | Tüm blockchain işlemlerini PostgreSQL'e kaydetme. Transaction hash, durum, tutar, zaman damgası. | 0.5 gün |
| 6.9 | Mock → Gerçek geçişi | Mock wallet sistemini kaldırma. Tüm ödeme akışını gerçek blockchain'e taşıma. Feature flag ile geçiş. | 1 gün |

#### Milestone

> **M6:** Format A gerçek Solana Devnet üzerinde çalışıyor. Cüzdan bağlantısı, giriş ücreti kilitleme, kazanç ödeme uçtan uca fonksiyonel.

---

### Sprint 7 (Hafta 15–16): Format B — 3D Altyapı + Temel Mekanikler

**Hedef:** Snake Arena 3D dünyasını oluşturma, oyuncu hareketi ve yılan AI'ı.

#### Frontend Görevleri

| # | Görev | Detay | Efor |
|---|-------|-------|------|
| 7.1 | Three.js sahne kurulumu | React Three Fiber ile top-down kamera. Sabit bakış açısı. Sahne aydınlatması (gece modu, ambient + directional). | 1 gün |
| 7.2 | POC harita | Soyut top-down layout: renkli bloklar, duvarlar, koridorlar. Basit geometri. Mekanikleri test etmek için yeterli. | 1.5 gün |
| 7.3 | Oyuncu sphere rendering | Instanced mesh ile 200+ oyuncuyu tek draw call'da render. Cüzdan adresinden unique renk. Emission glow. Yuvarlanma animasyonu. | 1.5 gün |
| 7.4 | Oyuncu hareketi | Sürekli ileri hareket. Sol/sağ dönüş kontrolleri. Desktop: ok tuşları. Mobil: ekran kenarı transparan butonlar. Smooth interpolation. | 2 gün |
| 7.5 | Yılan rendering | Segmentli kapsül geometri. Koyu metalik + kırmızı glow. Hız arttıkça glow yoğunluğu artar. Baş segmenti gövdeden büyük. | 1 gün |

#### Backend Görevleri

| # | Görev | Detay | Efor |
|---|-------|-------|------|
| 7.6 | Game loop (100ms tick) | `setInterval` ile 100ms'de bir oyun durumu güncelleme. Tüm oyuncu pozisyonlarını broadcast. Delta compression. | 1.5 gün |
| 7.7 | Yılan AI algoritması | Her saniye: en yoğun oyuncu bölgesine yönel. ±15° rastgele sapma. Duvar/sınır sıçraması. Hız çarpanı (her eleme sonrası +0.1×). | 2 gün |
| 7.8 | Çarpışma algılama | Yılan başı ↔ oyuncu hitbox örtüşme kontrolü. Server-authoritative: tüm çarpışma kararları sunucuda. | 1 gün |
| 7.9 | Oyuncu pozisyon yönetimi | Redis'te her oyuncunun x, y, açı bilgisi. Giriş doğrulama (hız hack önleme). | 1 gün |

#### Milestone

> **M7:** Format B'nin çekirdek mekaniği çalışıyor: oyuncular hareket ediyor, yılan kovalıyor, çarpışma algılanıyor. Görsel olarak POC seviyesinde (soyut harita). Birden fazla tarayıcıda test edilebilir.

---

### Sprint 8 (Hafta 17–18): Format B — Harita Mekaniği + Progressive Payout

**Hedef:** Safe zone'lar, harita küçülme, progressive payout sistemi.

#### Frontend Görevleri

| # | Görev | Detay | Efor |
|---|-------|-------|------|
| 8.1 | Safe zone rendering | Rastgele konumlarda aktif olan yeşil parlayan bölgeler. Nabız animasyonu. Kapasite göstergesi. | 1 gün |
| 8.2 | Harita küçülme (rising water) | Kenarlardan yükselen translucent mavi su düzlemi. Normal map wave animasyonu. GPU shader ile minimum CPU maliyeti. | 1.5 gün |
| 8.3 | Ölüm animasyonu | Sphere yukarı fırlar, döner, küçülür, kaybolur (0.5 sn). | 0.5 gün |
| 8.4 | Live wallet UI | Ekranda sürekli görünen cüzdan. Her eleme sonrası eklenen miktar flash animasyonu. Toplam birikim gösterimi. | 1 gün |
| 8.5 | Minimap | Küçük köşe haritası: tüm oyuncular (noktalar), yılan (kırmızı), safe zone'lar (yeşil), su sınırı. | 1 gün |

#### Backend Görevleri

| # | Görev | Detay | Efor |
|---|-------|-------|------|
| 8.6 | Safe zone sistemi | Rastgele konum + rastgele aralık (15-30 sn). Sınırlı kapasite. Yılan safe zone'a giremez. | 1 gün |
| 8.7 | Harita küçülme mantığı | 60 saniye sonra başlar. Her eleme sonrası hızlanır. Suda kalan oyuncular elenir. Sınır koordinatları hesabı. | 1 gün |
| 8.8 | Progressive payout hesabı | `eliminated_contribution / survivor_count` formülü. Her eleme anında survivor bakiyelerini güncelle. Rounding yönetimi (0.01 USDT hassasiyet). | 1.5 gün |
| 8.9 | Format B oyun sonuç kaydı | Eleme sırası, her oyuncunun final cüzdan bakiyesi, hayatta kalma süresi. PostgreSQL'e kayıt. | 1 gün |
| 8.10 | Format B smart contract tasarımı | Progressive payout için escrow contract genişletme. `on_player_eliminated` ve `on_game_end` instruction'ları. | 1.5 gün |

#### Milestone

> **M8:** Format B tam mekanik olarak çalışıyor. Safe zone, harita küçülme, progressive payout hepsi fonksiyonel. Live wallet UI oyuncuya birikimini gösteriyor.

---

### Sprint 9 (Hafta 19–20): Format B — İstanbul Haritası + Görsel Polish

**Hedef:** POC soyut haritasından MVP İstanbul temalı 3D haritaya geçiş.

#### Frontend Görevleri

| # | Görev | Detay | Efor |
|---|-------|-------|------|
| 9.1 | İstanbul harita modelleme | Low-poly extruded binalar (~10-15K polygon). Boğaziçi Köprüsü, Galata Kulesi, Kapalıçarşı, Tarihi Yarımada siluetleri. Blender veya code-based geometri. | 3 gün |
| 9.2 | Gece aydınlatma | Şehir ışıkları (point light'lar). Boğaz yansıması. Sinematik ambiyans. Directional + ambient light fine-tuning. | 1 gün |
| 9.3 | Su shader'ı (Boğaz) | Animasyonlu dalga shader'ı. Yansıtıcı yüzey. GPU'da çalışan normal map animasyonu. | 1 gün |
| 9.4 | Bina safe zone efekti | Safe zone aktifken bina yeşil pulse glow. Deaktifken normal renge dönüş. | 0.5 gün |
| 9.5 | Performans optimizasyonu | Draw call minimizasyonu. LOD (Level of Detail) gerekirse. 60fps hedefi: 3 yıllık orta segment mobil tarayıcı. Profiling ve bottleneck tespiti. | 1.5 gün |
| 9.6 | Format B ses efektleri | Yılan yaklaşma sesi (uzaklığa göre volume). Eleme sesi. Safe zone sesi. Arka plan ambiyans. | 1 gün |
| 9.7 | Mobil kontrol ince ayarı | Touch event hassasiyeti. Buton boyutu. Harita tam ekran görünürlüğü. Performans testi (iOS Safari, Android Chrome). | 1 gün |

#### Milestone

> **M9:** Format B görsel olarak İstanbul temalı, atmosferik ve etkileyici. 60fps mobilde çalışıyor. **MVP demo'ya hazır.**

---

## 5. Faz 3 — Beta: Tüm Formatlar + Blockchain Entegrasyonu (8 Hafta)

### Sprint 10 (Hafta 21–22): Format B Blockchain + Smart Contract v2

**Hedef:** Format B'nin progressive payout'unu smart contract'a entegre etme.

| # | Görev | Detay | Efor |
|---|-------|-------|------|
| 10.1 | Progressive payout contract | `on_player_eliminated`: elenen oyuncunun katkısını survivor'lara dağıt. Batch transfer optimizasyonu. | 2.5 gün |
| 10.2 | Format B oyun sonu contract | `on_game_end`: final survivor bakiyelerini transfer et. Komisyon ayrımı. | 1.5 gün |
| 10.3 | Gas optimizasyonu | Büyük oyuncu sayılarında (100-200) transaction maliyetini minimize etme. Batch processing stratejisi. | 1 gün |
| 10.4 | Backend → contract entegrasyonu | Format B oyun olaylarını smart contract instruction'larına çevirme. Her eleme anında on-chain işlem. | 2 gün |
| 10.5 | Frontend wallet akışı (B) | Format B'ye katılırken cüzdan onayı. Oyun sırasında live wallet'ı on-chain bakiyeyle senkronize etme. | 1.5 gün |
| 10.6 | Contract audit hazırlık | Kod temizliği. Inline dökümantasyon. Bilinen saldırı vektörlerini test etme (reentrancy, overflow, vb.). | 1.5 gün |

#### Milestone

> **M10:** Her iki format da Solana Devnet üzerinde gerçek USDT ile çalışıyor. Progressive payout on-chain doğrulanabilir.

---

### Sprint 11 (Hafta 23–24): Güvenlik + Anti-Cheat + Altyapı

**Hedef:** Güvenlik katmanları, anti-cheat, sunucu altyapısı.

| # | Görev | Detay | Efor |
|---|-------|-------|------|
| 11.1 | Server-authoritative doğrulama | Tüm oyun kararları sunucuda. Client sadece input gönderir. Pozisyon doğrulama (Format B hız hack önleme). | 2 gün |
| 11.2 | Rate limiting katmanı | Socket event bazlı rate limit. IP bazlı bağlantı limiti. Brute force koruması. | 1 gün |
| 11.3 | Input validation | Tüm client mesajlarını Zod schema ile doğrulama. Kötü niyetli payload reddi. | 1 gün |
| 11.4 | WebSocket güvenliği | WSS (TLS). Origin doğrulama. CORS politikası. JWT veya signed message auth. | 1 gün |
| 11.5 | Sunucu altyapısı | VPS veya cloud setup (AWS/GCP/Hetzner). Docker production build. Nginx reverse proxy. SSL sertifikası. | 1.5 gün |
| 11.6 | Redis clustering | Yüksek erişilebilirlik için Redis Sentinel veya Cluster. Failover stratejisi. | 1 gün |
| 11.7 | PostgreSQL backup | Otomatik günlük yedekleme. Point-in-time recovery. Connection pooling (PgBouncer). | 0.5 gün |
| 11.8 | Monitoring dashboard | Prometheus + Grafana veya benzeri. Aktif oyuncu sayısı, oda sayısı, transaction throughput, hata oranı metrikleri. | 1.5 gün |

#### Milestone

> **M11:** Platform güvenlik katmanlarıyla korunuyor. Sunucu altyapısı production-grade. Monitoring aktif.

---

### Sprint 12 (Hafta 25–26): Load Testing + Performans + Hata Düzeltme

**Hedef:** Yüksek oyuncu sayısında performans testi ve optimizasyon.

| # | Görev | Detay | Efor |
|---|-------|-------|------|
| 12.1 | Load test senaryoları | Artillery veya k6 ile WebSocket yük testi. 200 eş zamanlı oyuncu simülasyonu. Format A ve B için ayrı senaryolar. | 2 gün |
| 12.2 | Backend optimizasyonu | Profiling sonuçlarına göre bottleneck çözümü. Redis pipeline/batch kullanımı. Socket.io room broadcasting optimizasyonu. | 2 gün |
| 12.3 | Frontend performans | Format B: draw call analizi, shader optimizasyonu. Format A: animasyon frame drop tespiti. Lighthouse audit. | 1.5 gün |
| 12.4 | Horizontal scaling testi | Birden fazla backend instance. Socket.io Redis adapter ile sticky session. State paylaşımı doğrulama. | 1.5 gün |
| 12.5 | Stres testi sonuçlarına göre fix | Tespit edilen tüm performans sorunlarını çözme. Memory leak tespiti. | 2 gün |
| 12.6 | Cross-browser/device testi | Chrome, Safari, Firefox. iOS Safari, Android Chrome. Farklı ekran boyutları. | 1 gün |

#### Milestone

> **M12:** Platform 200+ eş zamanlı oyuncuyu destekliyor. 60fps mobilde stabil. Memory leak yok. **Beta lansmanına hazır.**

---

### Sprint 13 (Hafta 27–28): Beta Lansmanı + Kullanıcı Testleri

**Hedef:** Sınırlı beta açılışı, gerçek kullanıcı geri bildirimi toplama.

| # | Görev | Detay | Efor |
|---|-------|-------|------|
| 13.1 | Devnet → Mainnet-Beta geçişi | Smart contract'ları Solana Mainnet-Beta'ya deploy. RPC endpoint değişikliği. Gerçek USDT testi (küçük miktarlarla). | 1.5 gün |
| 13.2 | Landing page | Platform tanıtımı. "Nasıl çalışır" bölümü. Cüzdan bağlantısı. Provably fair açıklaması. | 2 gün |
| 13.3 | Davet sistemi | Beta access davet kodları. Referral tracking. | 1 gün |
| 13.4 | Geri bildirim mekanizması | In-app feedback formu. Hata raporlama. Discord/Telegram topluluk kanalı. | 0.5 gün |
| 13.5 | Analytics entegrasyonu | Oyun metrikleri: tamamlama oranı, ortalama oyun süresi, oda doluluk oranı, ödeme başarı oranı. | 1 gün |
| 13.6 | Bug fix sprint | Beta kullanıcılarından gelen hata raporlarına müdahale. Hızlı düzeltme döngüsü. | 4 gün (sürekli) |

#### Milestone

> **M13 (FAZ 3 SONU):** Beta canlıda. Gerçek kullanıcılar gerçek USDT ile oynuyor. Geri bildirimler toplanıyor. **Tüm çekirdek özellikler fonksiyonel.**

---

## 6. Faz 4 — Production: Lansman Hazırlığı (6 Hafta)

### Sprint 14 (Hafta 29–30): Smart Contract Audit + Güvenlik Sertleştirme

| # | Görev | Detay | Efor |
|---|-------|-------|------|
| 14.1 | Profesyonel smart contract audit | Üçüncü parti güvenlik firmasından audit. Bulguların düzeltilmesi. (Dış firma: 2-4 hafta sürebilir, paralel ilerler) | Dış bağımlılık |
| 14.2 | Penetrasyon testi | WebSocket saldırı vektörleri. API güvenliği. Injection testleri. | 2 gün |
| 14.3 | Wallet drain senaryoları testi | Escrow contract'ta edge case'ler. Partial withdraw koruması. Admin key güvenliği. Multi-sig wallet kurulumu. | 1.5 gün |
| 14.4 | Rate limiting fine-tuning | Beta verilerine göre limit ayarları. Saldırı pattern'leri analizi. | 0.5 gün |
| 14.5 | Incident response planı | Güvenlik ihlali durumunda adımlar. Otomatik kapatma mekanizması. İletişim planı. | 0.5 gün |
| 14.6 | Bug bounty programı | Güvenlik açığı ödül programı başlatma (opsiyonel). | 0.5 gün |

---

### Sprint 15 (Hafta 31–32): UX Polish + Onboarding + Son Dokunuşlar

| # | Görev | Detay | Efor |
|---|-------|-------|------|
| 15.1 | Onboarding akışı | İlk kez gelen kullanıcı için tutorial. Adım adım cüzdan bağlama rehberi. İlk oyun deneyimi (düşük girişli oda önerisi). | 2 gün |
| 15.2 | Hata mesajları UX | Kullanıcı dostu hata mesajları. Cüzdan bakiyesi yetersiz, işlem başarısız vb. durumlar için net bilgilendirme. | 1 gün |
| 15.3 | Animasyon ve ses fine-tuning | Beta geri bildirimlerine göre ayarlar. Ses seviyeleri. Animasyon hızları. | 1 gün |
| 15.4 | PWA desteği | Service worker. Offline fallback sayfası. "Ana ekrana ekle" desteği. | 1 gün |
| 15.5 | SEO ve meta tags | Open Graph tags. Twitter cards. Sosyal medya paylaşım görünümü. | 0.5 gün |
| 15.6 | Yasal uyarılar | Kullanım koşulları. Gizlilik politikası. Sorumluluk reddi. Yaş doğrulama (gerekirse). | 1 gün |
| 15.7 | CDN ve caching | Statik asset'ler için CDN. Cache stratejisi. Gzip/Brotli sıkıştırma. | 0.5 gün |

---

### Sprint 16 (Hafta 33–34): Production Deploy + Lansman

| # | Görev | Detay | Efor |
|---|-------|-------|------|
| 16.1 | Production ortamı | Mainnet smart contract deploy. Production veritabanları. DNS ve SSL. | 1 gün |
| 16.2 | CI/CD production pipeline | Automated deploy. Staging → production promotion. Rollback mekanizması. | 1 gün |
| 16.3 | Alerting sistemi | Kritik hata bildirimleri (PagerDuty/Slack). Uptime monitoring. Transaction başarısızlık alarmları. | 0.5 gün |
| 16.4 | Grand Arena ilk etkinlik | İlk resmi Grand Arena etkinliği planlama ve duyuru. | 0.5 gün |
| 16.5 | Soft launch | Sınırlı duyuru ile açılış. İlk saatlerde yakın takip. Hızlı müdahale ekibi hazır. | 1 gün |
| 16.6 | Post-launch monitoring | 48 saat yoğun monitoring. Performans metrikleri takibi. Kullanıcı geri bildirimi. | 2 gün (sürekli) |

#### Milestone

> **M16 (FAZ 4 SONU):** Platform production'da canlı. Smart contract audit tamamlanmış. Gerçek kullanıcılar gerçek USDT ile oynuyor. **Lansman tamamlandı.**

---

## 7. Toplam Zaman Çizelgesi

```
          Hf 1-2      Hf 3-10           Hf 11-20              Hf 21-28            Hf 29-34
          ┌───┐  ┌──────────────┐  ┌───────────────────┐  ┌──────────────────┐  ┌─────────────┐
          │F0 │  │    FAZ 1     │  │      FAZ 2        │  │     FAZ 3        │  │    FAZ 4    │
          │   │  │  POC         │  │  MVP              │  │  Beta            │  │  Production │
          │Altyapı│ Format A    │  │  Format A + B     │  │  Blockchain      │  │  Audit      │
          │   │  │  Mock ödeme  │  │  Solana Devnet    │  │  Güvenlik        │  │  Lansman    │
          └───┘  └──────────────┘  └───────────────────┘  └──────────────────┘  └─────────────┘

Paralel:                             ┌─────────────────────────────┐
                                     │  Smart Contract Geliştirme  │
                                     │  (Sprint 5'ten itibaren)    │
                                     └─────────────────────────────┘
```

| Faz | Süre | Kümülatif | Ana Çıktı |
|-----|------|-----------|-----------|
| Faz 0 — Altyapı | 2 hafta | Hafta 2 | Çalışan dev ortamı |
| Faz 1 — POC | 8 hafta | Hafta 10 | Format A oynanabilir prototip |
| Faz 2 — MVP | 10 hafta | Hafta 20 | Her iki format + Solana Devnet |
| Faz 3 — Beta | 8 hafta | Hafta 28 | Canlı beta, gerçek kullanıcılar |
| Faz 4 — Production | 6 hafta | Hafta 34 | Public lansman |
| **TOPLAM** | **~34 hafta** | **~8.5 ay** | |

---

## 8. Ekip Yapısı

### Minimum Uygulanabilir Ekip

| Rol | Sayı | Sorumluluk |
|-----|------|------------|
| Full-stack Geliştirici (Lead) | 1 | Mimari kararlar, backend, frontend, code review |
| Frontend Geliştirici (3D) | 1 | Three.js, React Three Fiber, shader'lar, animasyonlar |
| Blockchain Geliştirici | 1 | Solana smart contract'lar, Anchor, on-chain logic |
| DevOps / Backend | 0.5 | CI/CD, sunucu yönetimi, monitoring, DB admin |

**Toplam: 3.5 kişi** (minimum). Tek geliştirici ile de başlanabilir ancak süre ~2x'e uzar.

### İdeal Ekip (Hız Öncelikli)

| Rol | Sayı |
|-----|------|
| Full-stack Lead | 1 |
| Frontend Developer | 1 |
| 3D / Three.js Developer | 1 |
| Backend Developer | 1 |
| Solana Developer | 1 |
| UI/UX Designer | 0.5 |
| QA / Test | 0.5 |

**Toplam: 6 kişi**. Bu yapıyla süre ~6 aya düşebilir.

---

## 9. Risk Analizi

| # | Risk | Olasılık | Etki | Azaltma Stratejisi |
|---|------|----------|------|---------------------|
| R1 | Solana ağ kesintileri / yavaşlama | Orta | Yüksek | Fallback RPC sağlayıcıları (Helius, QuickNode). Retry mekanizması. Oyun sırasında ağ sorunu olursa state'i koruyup ağ düzelince devam et. |
| R2 | Smart contract güvenlik açığı | Düşük | Kritik | Profesyonel audit zorunlu. Formal verification araçları. Aşamalı lansman (küçük limitlerle başla). Emergency pause fonksiyonu. |
| R3 | Yüksek eşzamanlı oyuncu (>200) performans sorunu | Orta | Orta | Load testing erken fazda. Horizontal scaling hazırlığı. Socket.io Redis adapter. Format B'de position update frequency ayarı. |
| R4 | Mobil tarayıcı performansı (Format B 3D) | Yüksek | Orta | Polygon budget sıkı tutulacak (15K max). LOD sistemi. Device capability detection. Düşük performanslı cihazlarda reduced quality mode. |
| R5 | Yasal/regülasyon sorunları | Orta | Yüksek | Hukuk danışmanlığı alınacak. Farklı jurisdictionlarda gaming/gambling yasaları araştırılacak. Gerekirse geo-blocking. |
| R6 | Düşük oyuncu sayısı (soğuk başlangıç) | Yüksek | Yüksek | Quick Room min 5 oyuncu (düşük eşik). Private Room'lar viral büyüme motoru. Grand Arena zamanlanmış etkinlikler. İlk dönem düşük giriş ücretleri. |
| R7 | Cüzdan UX karmaşıklığı | Orta | Orta | Detaylı onboarding. Phantom/Solflare deep link entegrasyonu. Gelecekte: embedded wallet (account abstraction). |
| R8 | WebSocket bağlantı kopmaları | Orta | Orta | Otomatik reconnect. Session recovery (Redis'ten state geri yükleme). Disconnect grace period. |

---

## 10. Teknik Bağımlılık Haritası

```
Bağımlılık yönü: A → B  (A, B'ye bağımlıdır — önce B tamamlanmalı)

Sprint 0: Altyapı
    ↓
Sprint 1: Oda Sistemi + WebSocket
    ↓
Sprint 2: Format A Çekirdek Mantık ←───────── Sprint 5: Smart Contract v1 (paralel başlayabilir)
    ↓                                              ↓
Sprint 3: Format A Görsel Polish              Sprint 6: Wallet Entegrasyonu
    ↓                                              ↓
Sprint 4: Tüm Oda Tipleri ←──────────────── Sprint 6: Mock → Gerçek geçişi
    ↓
Sprint 7: Format B 3D Altyapı (Sprint 2'ye bağımlı değil — paralel olabilir)
    ↓
Sprint 8: Format B Mekanikler + Payout
    ↓
Sprint 9: İstanbul Haritası
    ↓
Sprint 10: Format B Blockchain ←─────────── Sprint 5-6: Smart Contract v1 (tamamlanmış olmalı)
    ↓
Sprint 11: Güvenlik
    ↓
Sprint 12: Load Testing
    ↓
Sprint 13: Beta Lansman
    ↓
Sprint 14: Audit
    ↓
Sprint 15: UX Polish
    ↓
Sprint 16: Production Lansman
```

### Paralelleştirme Fırsatları

| Paralel İş | Detay |
|-------------|-------|
| Smart contract ↔ Frontend/Backend | Sprint 5-6 (contract) ile Sprint 7-9 (Format B) paralel ilerleyebilir |
| Format A polish ↔ Format B başlangıç | Sprint 4 ve Sprint 7 kısmen örtüşebilir |
| UI/UX tasarım ↔ Geliştirme | Tasarım 1 sprint önde gidebilir |
| Audit ↔ UX Polish | Sprint 14 (audit dış firma) ve Sprint 15 paralel |

---

*Bu roadmap canlı bir dokümandır. Her sprint sonunda review edilmeli ve gerektiğinde güncellenmelidir.*
