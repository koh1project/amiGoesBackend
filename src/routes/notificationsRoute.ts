import { Router } from 'express';
import { updateNotificationToken } from '../controllers/notificationsController';

const router = Router();

// authMiddleware will be added later
router.patch('/addNotificationToken/:userId', updateNotificationToken);

export { router as notificationsRouter };
