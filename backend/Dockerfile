# ===================================
# Backend — Multi-stage Build
# ===================================

# --- Stage 1: Dependency Installation ---
FROM node:22-alpine AS deps
WORKDIR /app

# pnpm kur
RUN corepack enable && corepack prepare pnpm@9.15.4 --activate

# Sadece dependency dosyalarini kopyala (cache katmani)
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY backend/package.json backend/
COPY frontend/package.json frontend/
COPY contracts/package.json contracts/

# Sadece backend bagimliklarini kur
RUN pnpm install --frozen-lockfile --filter @web3-gaming/backend...

# --- Stage 2: Build ---
FROM node:22-alpine AS builder
WORKDIR /app

RUN corepack enable && corepack prepare pnpm@9.15.4 --activate

# Dependency'leri onceki stage'den kopyala
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/backend/node_modules ./backend/node_modules

# Kaynak kodu kopyala
COPY backend/ backend/
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml tsconfig.json ./

# Prisma client uret
RUN cd backend && npx prisma generate

# TypeScript derle
RUN cd backend && npx tsc

# --- Stage 3: Production Runtime ---
FROM node:22-alpine AS runner
WORKDIR /app

RUN corepack enable && corepack prepare pnpm@9.15.4 --activate

# Guvenlik: non-root kullanici
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 backend
USER backend

# Sadece production icin gerekli dosyalari kopyala
COPY --from=builder --chown=backend:nodejs /app/backend/dist ./dist
COPY --from=builder --chown=backend:nodejs /app/backend/package.json ./
COPY --from=builder --chown=backend:nodejs /app/backend/node_modules ./node_modules
COPY --from=builder --chown=backend:nodejs /app/backend/prisma ./prisma

# Port
EXPOSE 3001

# Healthcheck
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3001/api/health || exit 1

# Baslat
CMD ["node", "dist/index.js"]
