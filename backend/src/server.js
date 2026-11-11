import app from './app.js';
import env, { validateEnv } from './config/env.js';
import { connectDB } from './config/db.js';
import { initQueue } from './queues/analysisQueue.js';

async function bootstrap() {
  console.log('====================================================');
  console.log('  CODEMIND AI - SOFTWARE INTELLIGENCE PLATFORM');
  console.log('====================================================');

  validateEnv();

  try {
    await connectDB();
  } catch (err) {
    console.warn(`[Bootstrap Warning] Could not establish initial DB connection: ${err.message}. Retrying in background.`);
  }

  // Initialize Queue / Background task processor
  initQueue();

  const server = app.listen(env.PORT, () => {
    console.log(`[Server] CodeMind AI Backend running on port ${env.PORT} (${env.NODE_ENV})`);
    console.log(`[Server] API Base URL: http://localhost:${env.PORT}/api`);
    console.log(`[Server] Client Origin: ${env.CLIENT_URL}`);
  });

  const shutdown = async (signal) => {
    console.log(`\n[Server] Received ${signal}. Shutting down gracefully...`);
    server.close(() => {
      console.log('[Server] HTTP connections closed.');
      process.exit(0);
    });
  };

  process.on('SIGTERM', () => shutdown('SIGTERM'));
  process.on('SIGINT', () => shutdown('SIGINT'));
}

bootstrap();

