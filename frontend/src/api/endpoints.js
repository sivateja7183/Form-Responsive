import { api } from './client';

export const uploadResume = (file) => {
  const form = new FormData();
  form.append('resume', file);
  return api.post('/resumes/upload', form);
};

export const startSearch = (payload) => api.post('/jobs/search', payload);
export const getJobs = () => api.get('/jobs');
export const runMatch = (payload) => api.post('/ai/match-score', payload);
export const optimizeResume = (payload) => api.post('/ai/resume-optimize', payload);
export const generateCoverLetter = (payload) => api.post('/ai/cover-letter', payload);
export const assistApply = (payload) => api.post('/applications/assist-apply', payload);
export const getAnalytics = () => api.get('/applications/analytics');
