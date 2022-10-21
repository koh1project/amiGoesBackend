import { Router } from 'express';
import {
  createProfile,
  deleteProfile,
  getUserProfile,
  updateProfile,
} from '../controllers/amigosController';

const router = Router();

// authMiddleware will be added later
router.get('/:userId', getUserProfile);
router.post('/create', createProfile);
router.patch('/update/:userId', updateProfile);
router.delete('/delete/:userId', deleteProfile);

export { router as amigosRouter };

