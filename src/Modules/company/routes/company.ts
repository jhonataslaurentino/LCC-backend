import { Request, Response, Router } from 'express';
import { getCompanyAvatarController } from '../useCases/GetCompanyAvatar';

const companiesRouter = Router();

companiesRouter.get('/', async (req: Request, response: Response) => {
  return response.json('Hello');
});

companiesRouter.get(
  '/avatar/:id',
  async (request: Request, response: Response) => {
    return getCompanyAvatarController.handle(request, response);
  },
);

export default companiesRouter;
