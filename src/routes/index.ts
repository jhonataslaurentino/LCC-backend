import { Router } from 'express';
import eduzzRouter from '../Modules/eduzz/Routes/Eduzz';
import companiesRouter from './company';
import simulationsRouter from './Simulation';

const routes = Router();

routes.use('/eduzz', eduzzRouter);
routes.use('/company', companiesRouter);
routes.use('/simulation', simulationsRouter);

export default routes;
