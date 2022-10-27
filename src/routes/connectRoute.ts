import { Router } from 'express';
import {
  connectFeed,
  getConnectedUsers,
  updateConnectPreferences,
} from '../controllers/connectController';

const router = Router();

// authMiddleware will be added later
router.get('/:userId', connectFeed);
router.patch('/updateConnectPreferences/:userId', updateConnectPreferences);
router.get('/', getConnectedUsers);

export { router as connectRouter };
