import { jobRepo, matchRepo, resumeRepo } from '../models/repositories.js';
import { generateCoverLetter, optimizeResume, scoreMatch } from '../services/matchService.js';

export const runMatchScore = async (req, res) => {
  const { jobId, resumeId } = req.body;
  const job = jobRepo.findById(jobId);
  const resume = resumeRepo.findById(resumeId) || resumeRepo.findLatestByUser(req.user.id);
  if (!job || !resume) return res.status(404).json({ message: 'Job or resume not found' });

  const match = await scoreMatch({ resumeText: resume.parsed_text || '', jobDescription: job.description || '' });
  const saved = matchRepo.create({
    user_id: req.user.id,
    job_id: job.id,
    resume_id: resume.id,
    score: match.score,
    missing_keywords: JSON.stringify(match.missingKeywords),
    rationale: match.rationale,
  });
  res.json({ match: saved });
};

export const runResumeOptimization = async (req, res) => {
  const { jobId, resumeId } = req.body;
  const job = jobRepo.findById(jobId);
  const resume = resumeRepo.findById(resumeId) || resumeRepo.findLatestByUser(req.user.id);
  if (!job || !resume) return res.status(404).json({ message: 'Job or resume not found' });

  const optimizedText = await optimizeResume({ resumeText: resume.parsed_text || '', jobDescription: job.description || '' });
  res.json({ optimizedText });
};

export const runCoverLetterGeneration = async (req, res) => {
  const { jobId, profile } = req.body;
  const job = jobRepo.findById(jobId);
  if (!job) return res.status(404).json({ message: 'Job not found' });

  const coverLetter = await generateCoverLetter({
    profile,
    jobDescription: job.description || '',
    company: job.company || 'the hiring company',
  });

  res.json({ coverLetter });
};
