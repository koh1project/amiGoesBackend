import { Request, Response } from 'express';
import { locationClient } from '../libs/locationClient';

export const fetchPlacesByKeyword = async (
  req: Request<{ keyword?: string }>,
  res: Response,
) => {
  try {
    const keyword: string = req.query?.keyword?.toString() || 'park vancouver';

    const params = {
      IndexName: 'explore.place',
      Text: keyword,
      BiasPosition: [-123.11589890095398, 49.295868390331194],
      MaxResults: 20,
    };

    const result = await locationClient.searchPlaceIndexForText(params);

    res.status(200).json(result);
  } catch (error) {
    console.log('error: ', error);
    res.status(error['$metadata'].httpStatusCode).json(error);
  }
};
