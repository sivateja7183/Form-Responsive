import { generateWithOllama } from '../ai/ollamaClient.js';

export const scoreMatch = async ({ resumeText, jobDescription }) => {
  const prompt = `Evaluate resume-job fit. Return strict JSON with keys: score (0-100 integer), missingKeywords (string array), rationale (string).\nResume:\n${resumeText}\n\nJob:\n${jobDescription}`;
  const raw = await generateWithOllama({
    system: 'You are a career matching engine.',
    prompt,
  });

  const parsed = JSON.parse(raw);
  return {
    score: Math.max(0, Math.min(100, Number(parsed.score) || 0)),
    missingKeywords: parsed.missingKeywords || [],
    rationale: parsed.rationale || 'N/A',
  };
};

export const optimizeResume = async ({ resumeText, jobDescription }) => {
  const prompt = `Rewrite the resume summary and bullet highlights to align with this role. Keep truthful and ATS-friendly.\nResume:\n${resumeText}\n\nJob:\n${jobDescription}`;
  return generateWithOllama({ system: 'You are an expert resume writer.', prompt, format: undefined });
};

export const generateCoverLetter = async ({ profile, jobDescription, company }) => {
  const prompt = `Draft a concise cover letter for ${company}. Candidate profile:\n${profile}\n\nJob Description:\n${jobDescription}`;
  return generateWithOllama({ system: 'You are an expert career coach.', prompt, format: undefined });
};
