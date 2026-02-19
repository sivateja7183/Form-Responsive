import { Queue, Worker } from 'bullmq';
import { env } from '../config/env.js';
import { logger } from '../utils/logger.js';
import { runJobSearch } from '../workers/jobSearchWorker.js';
import { runAssistApply } from '../workers/assistApplyWorker.js';

const connection = { url: env.redisUrl };

export const searchQueue = new Queue('job-search', { connection });
export const applyQueue = new Queue('assist-apply', { connection });

export const bootWorkers = () => {
  const searchWorker = new Worker('job-search', runJobSearch, { connection, concurrency: 2 });
  const applyWorker = new Worker('assist-apply', runAssistApply, { connection, concurrency: 1 });

  [searchWorker, applyWorker].forEach((worker) => {
    worker.on('completed', (job) => logger.info({ queue: worker.name, jobId: job.id }, 'Queue job completed'));
    worker.on('failed', (job, err) => logger.error({ queue: worker.name, jobId: job?.id, err }, 'Queue job failed'));
  });
};
