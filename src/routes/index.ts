import { Router } from 'express';
import { seedUser } from '../utils/mockData';
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
if (process.env.MODE === 'Development') {
  router.get('/seed', (req, res) => {
    const users = seedUser();
    res.json(users);
  });
}

export { router };
