import { createBrowser } from '../automation/browserFactory.js';
import { DemoPortalScraper } from '../automation/scrapers/demoPortalScraper.js';
import { jobRepo, matchRepo, resumeRepo } from '../models/repositories.js';
import { scoreMatch } from '../services/matchService.js';

export const runJobSearch = async (job) => {
  const { userId, keywords, location } = job.data;
  const browser = await createBrowser();

  try {
    const scraper = new DemoPortalScraper(browser);
    const jobs = await scraper.search({ keywords, location });
    jobRepo.bulkInsert(userId, jobs);

    const latestResume = resumeRepo.findLatestByUser(userId);
    if (!latestResume?.parsed_text) return { inserted: jobs.length, scored: 0 };

    const insertedJobs = jobRepo.listByUser(userId).slice(0, jobs.length);
    for (const discoveredJob of insertedJobs) {
      const match = await scoreMatch({ resumeText: latestResume.parsed_text, jobDescription: discoveredJob.description || '' });
      matchRepo.create({
        user_id: userId,
        job_id: discoveredJob.id,
        resume_id: latestResume.id,
        score: match.score,
        missing_keywords: JSON.stringify(match.missingKeywords),
        rationale: match.rationale,
      });
    }

    return { inserted: jobs.length, scored: insertedJobs.length };
  } finally {
    await browser.deleteSession();
  }
};
