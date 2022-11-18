import { Router } from 'express';

import {
  blockUser,
  getBlockedUsers,
  unBlockUser,
} from '../controllers/blocked';

const router = Router();

router.post('/userId/:userId/blockedUserId/:blockedUserId', blockUser);
router.get('/blockedUsers/:userId', getBlockedUsers);
router.post('/userId/:userId/unBlockedUserId/:unBlockedUserId', unBlockUser);
export { router as blockRouter };
