import { Router } from 'express';
import {
  createProfile,
  deleteProfile,
  getAmigosFromLocation,
  getUserProfile,
  updateProfile,
  updateUserLocation,
  viewUserProfile,
} from '../controllers/amigosController';

const router = Router();

// authMiddleware will be added later
router.get('/:userId', getUserProfile);
router.post('/create', createProfile);
router.patch('/update/:userId', updateProfile);
router.delete('/delete/:userId', deleteProfile);
router.get('/view-profile/:userId', viewUserProfile);
router.post('/update-location/:userId', updateUserLocation);
router.post('/location/:userId', getAmigosFromLocation);

export { router as amigosRouter };
