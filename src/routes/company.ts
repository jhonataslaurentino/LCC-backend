import { Request, Response, Router } from 'express';
import StreamCompanyAvatarService from '../Services/StreamCompanyAvatarService';

const companiesRouter = Router();

companiesRouter.get(
  '/avatar/:id',
  async (request: Request, response: Response) => {
    const { id: companyID } = request.params;
    const streamCompanyAvatarService = new StreamCompanyAvatarService();
    await streamCompanyAvatarService.execute({ companyID, response });
  },
);
