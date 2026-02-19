import { createResumeRecord } from '../services/resumeService.js';

export const uploadResume = async (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'Resume file is required' });
  const resume = await createResumeRecord({ userId: req.user.id, file: req.file });
  res.status(201).json({ resume });
};
