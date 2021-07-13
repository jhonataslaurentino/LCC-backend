import { Router } from 'express';
import companiesRouter from '../../company/routes/company';
import { dealsRouter } from '../../company/routes/deals';
import { partnerRoutes } from '../../partner/routes';
import simulationsRouter from '../../simulation/routes/Simulation';
import { assetsRouter } from './assets.routes';

const routes = Router();

routes.use('/company', companiesRouter);
routes.use('/deal', dealsRouter);
routes.use('/simulation', simulationsRouter);
routes.use('/LCC', assetsRouter);
routes.use('/partner', partnerRoutes);

export default routes;
