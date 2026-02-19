import { Router } from 'express';
import { getAnalytics, triggerAssistApply } from '../controllers/applicationController.js';

const router = Router();
router.post('/assist-apply', triggerAssistApply);
router.get('/analytics', getAnalytics);

export default router;
