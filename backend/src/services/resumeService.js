import fs from 'node:fs/promises';
import { resumeRepo } from '../models/repositories.js';

export const createResumeRecord = async ({ userId, file }) => {
  const parsedText = await fs.readFile(file.path, 'utf-8').catch(() => 'Unable to parse binary resume in scaffold mode.');
  return resumeRepo.create({
    user_id: userId,
    original_name: file.originalname,
    file_path: file.path,
    parsed_text: parsedText,
  });
};
