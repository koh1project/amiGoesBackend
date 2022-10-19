import { Router } from 'express';
import {
  createProfile,
  getUserProfile,
  updateProfile,
} from '../controllers/amigosController';

const router = Router();

// authMiddleware will be added later
router.get('/:userId', getUserProfile);
router.post('/create', createProfile);
router.patch('/update/:userId', updateProfile);

export { router as amigosRouter };

