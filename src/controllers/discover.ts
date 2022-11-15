import { Request, Response } from 'express';

import { Client } from '@googlemaps/google-maps-services-js';
const client = new Client({});

//@NOTE: For development purposes
let placesCache: object | null = null;
const placeDetailCache = {};
const keywordCache = {};

export const fetchInitialPlaces = async (
  req: Request<{ keyword?: string }>,
  res: Response,
) => {
  const key = process.env.GOOGLE_MAPS_API_KEY ?? '';
  try {
    if (placesCache) {
      console.log('Return cache');
      res.status(200).json(placesCache);
      return;
    }

    const parksParams = {
      params: {
        query: 'parks vancouver',
        key,
      },
    };

    const restaurantsParams = {
      params: {
        query: 'restaurants vancouver',
        key,
      },
    };

    const entertainmentParams = {
      params: {
        query: 'entertainment vancouver',
        key,
      },
    };

    const sportsParams = {
      params: {
        query: 'sports vancouver',
        key,
      },
    };

    const requestOrder = ['parks', 'restaurants', 'entertainment', 'sports'];

    const responses = await Promise.all([
      client.textSearch(parksParams),
      client.textSearch(restaurantsParams),
      client.textSearch(entertainmentParams),
      client.textSearch(sportsParams),
    ]);

    let result = {};

    for (let i = 0; i < responses.length; i++) {
      result = {
        ...result,
        [requestOrder[i]]: responses[i].data.results.splice(0, 3),
      };
      // console.log('result: ', result);
    }

    placesCache = result;

    res.status(200).json(result);
  } catch (error) {
    console.log('error: ', error);
    res.status(error['$metadata']).json(error);
  }
};

export const fetchPlaceById = async (
  req: Request<{ place_id?: string }>,
  res: Response,
) => {
  const key = process.env.GOOGLE_MAPS_API_KEY ?? '';
  try {
    const place_id = req.params?.place_id?.toString() || '';

    if (placeDetailCache[place_id]) {
      console.log('Return cache');
      return res.status(200).json(placeDetailCache[place_id]);
    }

    const response = await client.placeDetails({
      params: {
        place_id,
        key,
      },
    });

    const result = response.data.result;
    placeDetailCache[place_id] = result;

    res.status(200).json(response.data.result);
  } catch (error) {
    console.log('error: ', error);
    res.status(error['$metadata']).json(error);
  }
};

export const fetchPlacesByKeyword = async (
  req: Request<{ keyword?: string }>,
  res: Response,
) => {
  const key = process.env.GOOGLE_MAPS_API_KEY ?? '';
  try {
    const keyword = req.params?.keyword?.toString() || '';

    if (keywordCache[keyword]) {
      console.log('Return cache');
      return res.status(200).json(keywordCache[keyword]);
    }
    const response = await client.textSearch({
      params: {
        query: keyword,
        key,
      },
    });

    const results = response.data.results;
    keywordCache[keyword] = results;

    res.status(200).json(results);
  } catch (error) {
    console.log('error: ', error);
    res.status(error['$metadata']).json(error);
  }
};
