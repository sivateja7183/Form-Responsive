import { Router } from 'express';
import resumeRoutes from './resumeRoutes.js';
import jobRoutes from './jobRoutes.js';
import aiRoutes from './aiRoutes.js';
import applicationRoutes from './applicationRoutes.js';

const router = Router();

router.use('/resumes', resumeRoutes);
router.use('/jobs', jobRoutes);
router.use('/ai', aiRoutes);
router.use('/applications', applicationRoutes);

export default router;
