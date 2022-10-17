import { Router } from 'express';
import { recognizeText } from '../utils/rekognitionUtils';
import { getS3ObjectUrl, uploadObject } from '../utils/s3Utils';
import { amigosRouter } from './amigosRoute';
import { blockRouter } from './blockedRoute';
import { homeRouter } from './homeRoute';

const router = Router();

router.use('/home', homeRouter);
router.use('/blocked', blockRouter);
router.use('/amigos', amigosRouter);

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

// Recognize text from image
router.post('/recognize', async (req, res) => {
  const image = 'test.JPG';
  const data = await recognizeText(req.body.image);
  res.send(data);
});

export { router };

