import { Router } from 'express';
import { getS3ObjectUrl, uploadObject } from '../utils/s3Utils';
import { homeRouter } from './homeRoute';

const router = Router();

router.use('/home', homeRouter);

// Upload s3 api
router.post('/s3', async (req, res) => {
  const data = await uploadObject(JSON.stringify({ test: 'hello' }));
  res.send(data);
});

//Get uploaded image from file name
router.get('/s3', async (req, res) => {
  const url = await getS3ObjectUrl(req.query.name);
  res.send(url);
});

export { router };
