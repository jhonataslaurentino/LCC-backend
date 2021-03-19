import { Request, Response, Router } from 'express';
import StreamCompanyAvatarService from '../Services/StreamCompanyAvatarService';

const companiesRouter = Router();

companiesRouter.get('/', async (request: Request, response: Response) => {
  return response.json('Hello');
});

companiesRouter.get(
  '/avatar/:id',
  async (request: Request, response: Response) => {
    const { id: companyID } = request.params;
    const streamCompanyAvatarService = new StreamCompanyAvatarService();
    const fileResponse = await streamCompanyAvatarService.execute({
      companyID,
      response,
    });
    return fileResponse;
  },
);

export default companiesRouter;
