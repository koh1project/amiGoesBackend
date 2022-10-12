import { Router } from 'express';
import { homeController } from '../controllers/homeController';
import { checkAuth } from '../middleware/checkAuth';

const router = Router();

router.get('/', checkAuth, homeController);

export { router as homeRouter };
