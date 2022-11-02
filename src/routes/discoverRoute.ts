import { Router } from 'express';
import { fetchPlacesByKeyword } from '../controllers/discover';
import { fetchPlaceById } from './../controllers/discover';

const router = Router();

router.get('/', fetchPlacesByKeyword);

router.get('/:place_id', fetchPlaceById);

export { router as discoverRouter };
