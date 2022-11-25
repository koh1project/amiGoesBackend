import { Router } from 'express';
import {
  acceptConnectionRequest,
  connectFeed,
  getConnectedUsers,
  getPendingRequest,
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
router.get('/requests/:userId', getPendingRequest);

export { router as connectRouter };
