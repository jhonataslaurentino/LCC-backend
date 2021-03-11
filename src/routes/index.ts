import { Router } from 'express';
import eduuzRouter from './eduuzRouter';

const routes = Router();
routes.use('/eduuz', eduuzRouter);

export default routes;
