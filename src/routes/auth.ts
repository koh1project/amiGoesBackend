import { Router } from 'express';
import { signup } from '../controllers/auth';

const router = Router();

router.post('/signup', signup);

export { router as authRouter };
