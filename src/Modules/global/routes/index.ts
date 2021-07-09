import { Router } from 'express';
import companiesRouter from '../../company/routes/company';
import { dealsRouter } from '../../company/routes/deals';
import { partnerRouter } from '../../partner/routes/partner';
import simulationsRouter from '../../simulation/routes/Simulation';
import { assetsRouter } from './assets.routes';

const routes = Router();

routes.use('/company', companiesRouter);
routes.use('/deal', dealsRouter);
routes.use('/simulation', simulationsRouter);
routes.use('/LCC', assetsRouter);
routes.use('/partner', partnerRouter);

export default routes;
