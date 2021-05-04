import { Router } from 'express';
import companiesRouter from './company';
import eduzzRouter from './eduzzRouter';
import simulationsRouter from './Simulation';

const routes = Router();
routes.use('/eduzz', eduzzRouter);
routes.use('/company', companiesRouter);
routes.use('/simulation', simulationsRouter);

export default routes;
