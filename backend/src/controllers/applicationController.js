import { applyQueue } from '../queue/queues.js';
import { getDashboardAnalytics } from '../services/analyticsService.js';

export const triggerAssistApply = async (req, res) => {
  const { jobId, answers } = req.body;
  if (!jobId) return res.status(400).json({ message: 'jobId is required' });

  const queueJob = await applyQueue.add('assist-apply', {
    userId: req.user.id,
    jobId,
    answers: answers || {},
  });

  res.status(202).json({ queueId: queueJob.id, status: 'queued' });
};

export const getAnalytics = async (req, res) => {
  const analytics = getDashboardAnalytics(req.user.id);
  res.json({ analytics });
};
