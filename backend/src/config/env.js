import path from 'node:path';
import dotenv from 'dotenv';

dotenv.config();

const resolvePath = (value, fallback) => path.resolve(process.cwd(), value || fallback);

export const env = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT || 4000),
  frontendOrigin: process.env.FRONTEND_ORIGIN || 'http://localhost:5173',
  databasePath: resolvePath(process.env.DATABASE_PATH, './data/autoapply.db'),
  uploadDir: resolvePath(process.env.UPLOAD_DIR, './uploads'),
  ollamaBaseUrl: process.env.OLLAMA_BASE_URL || 'http://localhost:11434',
  ollamaModel: process.env.OLLAMA_MODEL || 'llama3.1',
  redisUrl: process.env.REDIS_URL || 'redis://localhost:6379',
  logLevel: process.env.LOG_LEVEL || 'info',
  chromeBinary: process.env.CHROME_BINARY || undefined,
};
