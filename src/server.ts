import dotenv from 'dotenv';
import express, { Express, Request, Response } from 'express';
import mongoose from 'mongoose';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;
app.get('/', (req: Request, res: Response) => {
  res.send('Hello Typescript Server');
});

app.listen(port, () => {
  console.log(`[server]: 🚀Server is running at https://localhost:${port}`);
});
const uri = process.env.DATABASE_URI;

// eslint-disable-next-line promise/prefer-await-to-callbacks
mongoose.connect(uri, (error) => {
  if (!error) console.log('Database Connected');
  else console.error(error);
});
