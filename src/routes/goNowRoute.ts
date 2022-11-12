import { Router } from 'express';
import {
  acceptGoNowPair,
  deactivateGoNowPair,
  newGoNowPair,
} from '../controllers/goNowController';

const router = Router();

// authMiddleware will be added later
router.post('/:userId', newGoNowPair);
router.patch('/acceptGoNowPair/:userId', acceptGoNowPair);
router.patch('/deactivateGoNowPair/:userId', deactivateGoNowPair);

export { router as goNowRouter };

