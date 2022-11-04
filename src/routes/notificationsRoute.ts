import { Router } from 'express';
import {
  sendNotification,
  updateNotificationToken,
} from '../controllers/notificationsController';

const router = Router();

// authMiddleware will be added later
router.patch('/addNotificationToken/:userId', updateNotificationToken);
router.post('/sendNotification/:senderId', sendNotification);

export { router as notificationsRouter };

