import { createBrowser } from '../automation/browserFactory.js';
import { performAssistApply } from '../automation/assist/formAssistant.js';
import { applicationRepo, jobRepo } from '../models/repositories.js';

export const runAssistApply = async (job) => {
  const { userId, jobId, answers } = job.data;
  const posting = jobRepo.findById(jobId);
  if (!posting) throw new Error('Job not found');

  const browser = await createBrowser();
  try {
    const result = await performAssistApply(browser, { jobUrl: posting.job_url, answers });
    const app = applicationRepo.create({
      user_id: userId,
      job_id: jobId,
      status: result.pausedBeforeSubmit ? 'draft_assisted' : 'submitted',
      assisted_payload: JSON.stringify(result),
      applied_at: result.pausedBeforeSubmit ? null : new Date().toISOString(),
    });
    jobRepo.updateStatus(jobId, 'assisting');
    return app;
  } finally {
    await browser.deleteSession();
  }
};
