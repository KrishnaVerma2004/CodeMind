import { Redis } from 'ioredis';
import env from './env.js';

let redisClient = null;
let isRedisAvailable = false;

export function getRedisClient() {
  if (redisClient) return redisClient;

  try {
    redisClient = new Redis(env.REDIS_URL, {
      maxRetriesPerRequest: null,
      enableReadyCheck: false,
      lazyConnect: true,
      retryStrategy(times) {
        if (times > 3) {
          console.warn('[Redis] Redis server unavailable. Falling back to internal async processor.');
          return null; // Stop retrying
        }
        return Math.min(times * 100, 1000);
      },
    });

    redisClient.on('connect', () => {
      isRedisAvailable = true;
      console.log('[Redis] Connected successfully to Redis.');
    });

    redisClient.on('error', (err) => {
      isRedisAvailable = false;
      // Suppress spammy connection errors
    });

    return redisClient;
  } catch (err) {
    console.warn(`[Redis] Init error: ${err.message}. Using direct fallback.`);
    return null;
  }
}

export function isRedisConnected() {
  return isRedisAvailable;
}

