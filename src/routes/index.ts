import { Router } from 'express';
import eduzzRouter from './eduzzRouter';

const routes = Router();
routes.use('/eduuz', eduzzRouter);

export default routes;
