import { Router } from 'express';
import companiesRouter from '../../company/routes/company';
import simulationsRouter from '../../company/routes/Simulation';
import eduzzRouter from '../../eduzz/Routes/Eduzz';
import { assetsRouter } from './assets.routes';

const routes = Router();

routes.use('/eduzz', eduzzRouter);
routes.use('/company', companiesRouter);
routes.use('/simulation', simulationsRouter);
routes.use('/LCC', assetsRouter);

export default routes;
