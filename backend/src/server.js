import { app } from './app.js';
import { env } from './config/env.js';
import { bootWorkers } from './queue/queues.js';
import './database/migrate.js';
import { logger } from './utils/logger.js';

app.listen(env.port, () => {
  logger.info(`API listening on port ${env.port}`);
  bootWorkers();
});
