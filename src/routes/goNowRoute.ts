import { Router } from 'express';
import { newGoNowPair } from '../controllers/goNowController';

const router = Router();

// authMiddleware will be added later
router.post('/:userId', newGoNowPair);

export { router as goNowRouter };
