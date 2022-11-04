import { Router } from 'express';
import { compareFaces } from '../utils/rekognition';
import { recognizeText } from '../utils/rekognitionUtils';
import { getS3ObjectUrl, uploadObject } from '../utils/s3Utils';
import { translateText } from '../utils/translateUtils';
import { amigosRouter } from './amigosRoute';
import { blockRouter } from './blockedRoute';
import { connectRouter } from './connectRoute';
import { discoverRouter } from './discoverRoute';
import { homeRouter } from './homeRoute';
import { notificationsRouter } from './notificationsRoute';

const router = Router();

router.use('/home', homeRouter);
router.use('/blocked', blockRouter);
router.use('/amigos', amigosRouter);
router.use('/connect', connectRouter);
router.use('/discover', discoverRouter);
router.use('/notifications', notificationsRouter);

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

// Recognize text from image
router.post('/recognize', async (req, res) => {
  const data = await recognizeText(req.body.image);
  return res.send(data);
});

// Translate text
router.post('/translate', async (req, res) => {
  const data = await translateText(req.body.language, req.body.text);
  return res.send(data);
});

// Translate text from image
router.post('/translateImage', async (req, res) => {
  const data = await recognizeText(req.body.image);
  const text = data.toString();
  const translatedResult = await translateText(req.body.language, text);
  res.status(200).json({ text, translatedResult });
});

export { router };
