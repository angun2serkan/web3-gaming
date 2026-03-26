# ===================================
# Frontend — Multi-stage Build + Nginx
# ===================================

# --- Stage 1: Dependency Installation ---
FROM node:22-alpine AS deps
WORKDIR /app

RUN corepack enable && corepack prepare pnpm@9.15.4 --activate

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY frontend/package.json frontend/
COPY backend/package.json backend/
COPY contracts/package.json contracts/

RUN pnpm install --frozen-lockfile --filter @web3-gaming/frontend...

# --- Stage 2: Build ---
FROM node:22-alpine AS builder
WORKDIR /app

RUN corepack enable && corepack prepare pnpm@9.15.4 --activate

COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/frontend/node_modules ./frontend/node_modules

COPY frontend/ frontend/
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml tsconfig.json ./

# Vite build — VITE_ env degiskenleri build-time'da bundle'a yazilir
ARG VITE_API_URL
ARG VITE_WS_URL
ARG VITE_SOLANA_NETWORK
ARG VITE_SOLANA_RPC_URL
ARG VITE_APP_NAME
ARG VITE_COMMISSION_RATE

RUN cd frontend && npx vite build

# --- Stage 3: Nginx ile Serve ---
FROM nginx:1.27-alpine AS runner

# Nginx konfigurasyonu
COPY frontend/nginx.conf /etc/nginx/conf.d/default.conf

# Build ciktisini nginx'e kopyala
COPY --from=builder /app/frontend/dist /usr/share/nginx/html

# Port
EXPOSE 80

# Healthcheck
HEALTHCHECK --interval=30s --timeout=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:80/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
