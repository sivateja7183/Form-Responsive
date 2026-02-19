import { Router } from 'express';
import { runCoverLetterGeneration, runMatchScore, runResumeOptimization } from '../controllers/aiController.js';

const router = Router();
router.post('/match-score', runMatchScore);
router.post('/resume-optimize', runResumeOptimization);
router.post('/cover-letter', runCoverLetterGeneration);

export default router;
