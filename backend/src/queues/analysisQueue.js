import { Queue, Worker } from 'bullmq';
import { getRedisClient, isRedisConnected } from '../config/redis.js';
import { AnalysisPipeline } from '../services/analysisPipeline.js';

let analysisQueue = null;
let analysisWorker = null;

export function initQueue() {
  const redis = getRedisClient();

  if (redis && isRedisConnected()) {
    try {
      analysisQueue = new Queue('analysis-jobs', {
        connection: redis,
        defaultJobOptions: {
          attempts: 2,
          backoff: { type: 'exponential', delay: 2000 },
          removeOnComplete: true,
          removeOnFail: false,
        },
      });

      analysisWorker = new Worker(
        'analysis-jobs',
        async (job) => {
          console.log(`[Queue Worker] Processing analysis job ${job.data.analysisId}...`);
          return AnalysisPipeline.run(job.data.analysisId);
        },
        { connection: redis }
      );

      console.log('[Queue] BullMQ Analysis Queue and Worker initialized.');
    } catch (e) {
      console.warn(`[Queue] Failed to initialize BullMQ: ${e.message}. Using internal async dispatcher.`);
    }
  }
}

export async function addAnalysisJob(analysisId) {
  if (analysisQueue && isRedisConnected()) {
    return analysisQueue.add('run-analysis', { analysisId });
  }

  // Graceful direct async execution fallback
  setImmediate(async () => {
    try {
      console.log(`[Direct Async Runner] Starting analysis for ${analysisId}...`);
      await AnalysisPipeline.run(analysisId);
    } catch (error) {
      console.error(`[Direct Async Runner Error] ${error.message}`);
    }
  });

  return { id: `direct-${analysisId}` };
}

