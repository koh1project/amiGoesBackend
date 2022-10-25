import { Request, Response } from 'express';

import { Client } from '@googlemaps/google-maps-services-js';
const client = new Client({});

export const fetchPlacesByKeyword = async (
  req: Request<{ keyword?: string }>,
  res: Response,
) => {
  try {
    // const keyword: string = req.query?.keyword?.toString() || 'park vancouver';

    const parksResponse = await client.textSearch({
      params: {
        query: 'parks vancouver',
        key: process.env.GOOGLE_MAPS_API_KEY,
      },
    });

    res.status(200).json(parksResponse.data);
  } catch (error) {
    console.log('error: ', error);
    res.status(error['$metadata'].httpStatusCode).json(error);
  }
};
