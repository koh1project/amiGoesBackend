import { Request, Response } from 'express';

const homeController = (req: Request, res: Response) => {
  res.send('Hello from server side home controller to frontend');
  console.log('Hello from server side home controller');
};

export { homeController };

