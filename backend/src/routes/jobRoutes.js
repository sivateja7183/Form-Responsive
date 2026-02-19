import { Router } from 'express';
import { fetchExtractedJobs, startJobSearch } from '../controllers/jobController.js';

const router = Router();
router.post('/search', startJobSearch);
router.get('/', fetchExtractedJobs);

export default router;
