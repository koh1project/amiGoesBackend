import { Router } from 'express';
import {
  createProfile,
  deleteProfile,
  getUserProfile,
  updateProfile,
  viewUserProfile,
} from '../controllers/amigosController';

const router = Router();

// authMiddleware will be added later
router.get('/:userId', getUserProfile);
router.post('/create', createProfile);
router.patch('/update/:userId', updateProfile);
router.delete('/delete/:userId', deleteProfile);
router.get('/view-profile/:userId', viewUserProfile);

export { router as amigosRouter };

