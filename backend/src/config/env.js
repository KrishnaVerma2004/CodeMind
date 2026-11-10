import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

// Load .env file if present
dotenv.config();

const env = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: parseInt(process.env.PORT, 10) || 5000,
  CLIENT_URL: process.env.CLIENT_URL || 'http://localhost:5173',

  // Database
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/codemind',
  JWT_SECRET: process.env.JWT_SECRET || 'codemind_default_dev_jwt_secret_must_change_in_production!',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '7d',

  // Google Gemini API
  GEMINI_API_KEY: process.env.GEMINI_API_KEY || '',
  GEMINI_MODEL: process.env.GEMINI_MODEL || 'gemini-2.5-flash',
  GEMINI_EMBEDDING_MODEL: process.env.GEMINI_EMBEDDING_MODEL || 'text-embedding-004',

  // GitHub
  GITHUB_TOKEN: process.env.GITHUB_TOKEN || '',

  // Redis & Queue
  REDIS_URL: process.env.REDIS_URL || 'redis://localhost:6379',

  // Vector store provider
  VECTOR_PROVIDER: process.env.VECTOR_PROVIDER || 'memory',
  QDRANT_URL: process.env.QDRANT_URL || '',
  QDRANT_API_KEY: process.env.QDRANT_API_KEY || '',

  // Directories & Limits
  UPLOAD_DIR: path.resolve(process.cwd(), process.env.UPLOAD_DIR || 'uploads'),
  TEMP_DIR: path.resolve(process.cwd(), process.env.TEMP_DIR || 'temp'),
  REPORT_DIR: path.resolve(process.cwd(), process.env.REPORT_DIR || 'reports'),

  MAX_UPLOAD_SIZE_MB: parseInt(process.env.MAX_UPLOAD_SIZE_MB, 10) || 50,
  MAX_EXTRACTED_SIZE_MB: parseInt(process.env.MAX_EXTRACTED_SIZE_MB, 10) || 200,
  MAX_FILES_PER_REPOSITORY: parseInt(process.env.MAX_FILES_PER_REPOSITORY, 10) || 5000,
  MAX_ANALYSIS_BATCH_SIZE: parseInt(process.env.MAX_ANALYSIS_BATCH_SIZE, 10) || 10,

  AI_MAX_RETRIES: parseInt(process.env.AI_MAX_RETRIES, 10) || 3,
  AI_REQUEST_TIMEOUT_MS: parseInt(process.env.AI_REQUEST_TIMEOUT_MS, 10) || 60000,

  COOKIE_SECRET: process.env.COOKIE_SECRET || 'codemind_cookie_secret_dev!',
  CORS_ORIGINS: process.env.CORS_ORIGINS 
    ? process.env.CORS_ORIGINS.split(',').map(s => s.trim()) 
    : ['http://localhost:5173', 'http://127.0.0.1:5173'],
};

// Ensure required directories exist
[env.UPLOAD_DIR, env.TEMP_DIR, env.REPORT_DIR].forEach((dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Environment validation check
export function validateEnv() {
  const warnings = [];
  if (!env.GEMINI_API_KEY && env.NODE_ENV === 'production') {
    throw new Error('GEMINI_API_KEY is required in production environment.');
  } else if (!env.GEMINI_API_KEY) {
    warnings.push('GEMINI_API_KEY is not set. AI modules will operate in mock/demo fallback mode.');
  }

  if (warnings.length > 0) {
    warnings.forEach((w) => console.warn(`[CONFIG WARNING] ${w}`));
  }
}

export default env;

