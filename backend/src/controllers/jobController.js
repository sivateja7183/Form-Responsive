import { jobRepo } from '../models/repositories.js';
import { searchQueue } from '../queue/queues.js';

export const startJobSearch = async (req, res) => {
  const { keywords, location } = req.body;
  if (!keywords) return res.status(400).json({ message: 'keywords is required' });

  const queueJob = await searchQueue.add('search-jobs', {
    userId: req.user.id,
    keywords,
    location: location || 'Remote',
  });

  res.status(202).json({ jobId: queueJob.id, status: 'queued' });
};

export const fetchExtractedJobs = async (req, res) => {
  const jobs = jobRepo.listByUser(req.user.id);
  res.json({ jobs });
};
