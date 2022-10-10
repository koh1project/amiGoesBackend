import { Router } from 'express';
import { homeRouter } from './homeRoute';

const router = Router();

router.use('/home', homeRouter);

export { router };

