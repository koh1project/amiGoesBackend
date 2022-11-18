import { Router } from 'express';
import {
  fetchFavorites,
  fetchInitialPlaces,
  fetchPlacesByKeyword,
  updateFavorites,
} from '../controllers/discover';
import { fetchPlaceById } from './../controllers/discover';

const router = Router();

router.get('/', fetchInitialPlaces);

router.post('/favorites', fetchFavorites);

router.post('/favorites/update', updateFavorites);

router.get('/keyword/:keyword', fetchPlacesByKeyword);

// Must be placed after the other routes
router.get('/:place_id', fetchPlaceById);

export { router as discoverRouter };
