import cors from 'cors';
import dotenv from 'dotenv';
import express, { Express, Request, Response } from 'express';
import mongoose from 'mongoose';
import { router } from './routes/index';
import { seed } from './utils/mockData';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(router);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello Typescript Server');
});

if (process.env.MODE === 'Development') {
  router.get('/seed', async (req, res) => {
    const users = await seed();
    res.json(users);
  });
}

app.listen(port, () => {
  console.log(`[server]: 🚀Server is running at https://localhost:${port}`);
});
const uri = process.env.DATABASE_URI;

// eslint-disable-next-line promise/prefer-await-to-callbacks
mongoose.connect(uri, (error) => {
  if (!error) console.log('Database Connected');
  else console.error(error);
});
