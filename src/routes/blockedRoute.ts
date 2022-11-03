import { Router } from 'express';

import { blockUser, getBlockedUsers } from '../controllers/blocked';

const router = Router();

router.post('/:userId', blockUser);
router.get('/blockedUsers/:userId', getBlockedUsers);

export { router as blockRouter };
