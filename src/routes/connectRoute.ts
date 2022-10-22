import { Router } from 'express';
import { connectFeed } from '../controllers/connectController';

const router = Router();

// authMiddleware will be added later
router.get('/:userId', connectFeed);

export { router as connectRouter };
