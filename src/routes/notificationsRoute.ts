import { Router } from 'express';
import {
  getNotifications,
  markNotificationAsRead,
  updateNotificationToken,
} from '../controllers/notificationsController';

const router = Router();

// authMiddleware will be added later
router.patch('/addNotificationToken/:userId', updateNotificationToken);
router.get('/getNotifications/:userId', getNotifications);
router.patch('/markNotificationAsRead/:notificationId', markNotificationAsRead);

export { router as notificationsRouter };

