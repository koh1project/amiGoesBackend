import { Router } from 'express';
import {
  connectFeed,
  updateConnectPreferences,
} from '../controllers/connectController';

const router = Router();

// authMiddleware will be added later
router.get('/:userId', connectFeed);
router.patch('/updateConnectPreferences/:userId', updateConnectPreferences);

export { router as connectRouter };

