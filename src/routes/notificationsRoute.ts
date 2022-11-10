import { Router } from 'express';
import {
  getNotifications,
  updateNotificationToken,
} from '../controllers/notificationsController';

const router = Router();

// authMiddleware will be added later
router.patch('/addNotificationToken/:userId', updateNotificationToken);
router.get('/getNotifications/:userId', getNotifications);

export { router as notificationsRouter };

