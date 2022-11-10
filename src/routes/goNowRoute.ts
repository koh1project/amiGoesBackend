import { Router } from 'express';
import { acceptGoNowPair, newGoNowPair } from '../controllers/goNowController';

const router = Router();

// authMiddleware will be added later
router.post('/:userId', newGoNowPair);
router.patch('/acceptGoNowPair/:userId', acceptGoNowPair);

export { router as goNowRouter };

