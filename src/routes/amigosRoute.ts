import { Router } from 'express';
import { createProfile, getUserProfile } from '../controllers/amigosController';

const router = Router();

// authMiddleware will be added later
router.get('/:userId', getUserProfile);
router.post('/create', createProfile);

export { router as amigosRouter };

