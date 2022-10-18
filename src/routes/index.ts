import { Router } from 'express';
import { compareFaces } from '../utils/rekognition';
import { getS3ObjectUrl, uploadObject } from '../utils/s3Utils';
import { blockRouter } from './blockedRoute';
import { homeRouter } from './homeRoute';

const router = Router();

router.use('/home', homeRouter);
router.use('/blocked', blockRouter);

// Upload s3 api
router.post('/s3', async (req, res) => {
  const data = await uploadObject(JSON.stringify(req.body));
  res.send(data);
});

//Get uploaded image from file name
router.get('/s3', async (req, res) => {
  const url = await getS3ObjectUrl(req.query.name);
  res.send(url);
});
// Only allow seed if mode is Development

router.get('/compareFaces', async (req, res) => {
  const data = await compareFaces();
  res.send(data);
});

export { router };
