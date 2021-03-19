import { Router } from 'express';
import companiesRouter from './company';
import eduzzRouter from './eduzzRouter';

const routes = Router();
routes.use('/eduzz', eduzzRouter);
routes.use('/company', companiesRouter);

export default routes;
