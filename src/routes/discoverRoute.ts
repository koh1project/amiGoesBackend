import { Router } from 'express';
import { fetchPlacesByKeyword } from '../controllers/discover';

const router = Router();

router.get('/', fetchPlacesByKeyword);

export { router as discoverRouter };
