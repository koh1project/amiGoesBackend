import { Router } from 'express';
import {
  fetchInitialPlaces,
  fetchPlacesByKeyword,
} from '../controllers/discover';
import { fetchPlaceById } from './../controllers/discover';

const router = Router();

router.get('/', fetchInitialPlaces);

router.get('/:place_id', fetchPlaceById);

router.get('/keyword/:keyword', fetchPlacesByKeyword);

export { router as discoverRouter };
