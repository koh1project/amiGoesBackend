import { Router } from 'express';
import { createProfile } from '../controllers/amigosController';

const router = Router();

router.post('/', createProfile); // authMiddleware will be added later

export { router as amigosRouter };
