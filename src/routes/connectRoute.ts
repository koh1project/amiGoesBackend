import { Router } from 'express';
import {
  acceptConnectionRequest,
  connectFeed,
  getConnectedUsers,
  newConnectionRequest,
  updateConnectPreferences,
} from '../controllers/connectController';

const router = Router();

// authMiddleware will be added later
router.get('/:userId', connectFeed);
router.post('/:userId', newConnectionRequest);
router.patch('/updateConnectPreferences/:userId', updateConnectPreferences);
router.patch('/acceptConnectionRequest/:userId', acceptConnectionRequest);
router.get('/connectedUsers/:userId', getConnectedUsers);

export { router as connectRouter };

