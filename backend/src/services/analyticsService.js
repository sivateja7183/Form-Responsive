import { applicationRepo, jobRepo, matchRepo } from '../models/repositories.js';

export const getDashboardAnalytics = (userId) => {
  const jobs = jobRepo.listByUser(userId);
  const scores = matchRepo.listByUser(userId);
  const applications = applicationRepo.listByUser(userId);

  const avgScore = scores.length ? Math.round(scores.reduce((acc, row) => acc + row.score, 0) / scores.length) : 0;

  return {
    totals: {
      jobs: jobs.length,
      applications: applications.length,
      matches: scores.length,
    },
    avgScore,
    pipeline: applications.reduce(
      (acc, row) => ({ ...acc, [row.status]: (acc[row.status] || 0) + 1 }),
      {}
    ),
  };
};
