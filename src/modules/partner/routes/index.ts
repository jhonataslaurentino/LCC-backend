import { Router } from 'express';
import { partnerDealsRouter } from './deal';
import { partnerRouter } from './partner';

const partnerRoutes = Router();

partnerRoutes.use('/', partnerRouter);
partnerRouter.use('/deal', partnerDealsRouter);
export { partnerRoutes };
