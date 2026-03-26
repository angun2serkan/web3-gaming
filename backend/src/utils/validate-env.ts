interface EnvConfig {
  PORT: number;
  NODE_ENV: 'development' | 'staging' | 'production';
  FRONTEND_URL: string;
  DATABASE_URL: string;
  REDIS_URL: string;
  // Opsiyonel — sadece staging/production'da zorunlu
  SOLANA_RPC_URL?: string;
  SOLANA_NETWORK?: string;
  PLATFORM_WALLET_ADDRESS?: string;
  PLATFORM_WALLET_PRIVATE_KEY?: string;
  JWT_SECRET?: string;
  RATE_LIMIT_MAX?: number;
  RATE_LIMIT_WINDOW_MS?: number;
  LOG_LEVEL?: string;
}

/** Her ortam icin zorunlu degiskenler */
const REQUIRED_VARS: Record<string, string[]> = {
  // Her ortamda zorunlu
  all: ['PORT', 'NODE_ENV', 'FRONTEND_URL', 'DATABASE_URL', 'REDIS_URL'],
  // Sadece production'da zorunlu
  production: ['JWT_SECRET', 'SOLANA_RPC_URL', 'PLATFORM_WALLET_ADDRESS'],
  // Sadece staging'de zorunlu
  staging: ['JWT_SECRET', 'SOLANA_RPC_URL'],
};

export function validateEnv(): EnvConfig {
  const env = process.env;
  const nodeEnv = env.NODE_ENV || 'development';
  const missing: string[] = [];

  // Tum ortamlar icin zorunlu degiskenler
  for (const key of REQUIRED_VARS.all) {
    if (!env[key]) missing.push(key);
  }

  // Ortam bazli zorunlu degiskenler
  const envSpecific = REQUIRED_VARS[nodeEnv] || [];
  for (const key of envSpecific) {
    if (!env[key]) missing.push(key);
  }

  if (missing.length > 0) {
    console.error(`\n[ENV] Eksik ortam degiskenleri (${nodeEnv}):`);
    missing.forEach((key) => console.error(`  - ${key}`));
    console.error(`\nCozum: backend/.env dosyasini kontrol edin.\n`);
    process.exit(1);
  }

  return {
    PORT: parseInt(env.PORT || '3001', 10),
    NODE_ENV: nodeEnv as EnvConfig['NODE_ENV'],
    FRONTEND_URL: env.FRONTEND_URL!,
    DATABASE_URL: env.DATABASE_URL!,
    REDIS_URL: env.REDIS_URL!,
    SOLANA_RPC_URL: env.SOLANA_RPC_URL,
    SOLANA_NETWORK: env.SOLANA_NETWORK,
    PLATFORM_WALLET_ADDRESS: env.PLATFORM_WALLET_ADDRESS,
    PLATFORM_WALLET_PRIVATE_KEY: env.PLATFORM_WALLET_PRIVATE_KEY,
    JWT_SECRET: env.JWT_SECRET,
    RATE_LIMIT_MAX: env.RATE_LIMIT_MAX ? parseInt(env.RATE_LIMIT_MAX, 10) : undefined,
    RATE_LIMIT_WINDOW_MS: env.RATE_LIMIT_WINDOW_MS
      ? parseInt(env.RATE_LIMIT_WINDOW_MS, 10)
      : undefined,
    LOG_LEVEL: env.LOG_LEVEL,
  };
}
