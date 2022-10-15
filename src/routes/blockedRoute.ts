import { Router } from 'express';

import { blockUser, getBlockedUsers } from '../controllers/blocked';

const router = Router();

router.post('/', blockUser);
router.get('/', getBlockedUsers);

export { router as blockRouter };
