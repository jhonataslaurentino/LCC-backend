import { Request, Response, Router } from 'express';
import request from 'request';
import GetProfileAvatarService from '../Services/GetProfileAvatarService';

const companiesRouter = Router();

companiesRouter.get('/', async (req: Request, response: Response) => {
  return response.json('Hello');
});

companiesRouter.get('/avatar/:id', async (req: Request, response: Response) => {
  const { id: companyID } = req.params;

  const getProfileAvatarService = new GetProfileAvatarService();
  const { downloadURL } = await getProfileAvatarService.execute({
    companyID,
  });
  request(
    {
      url: downloadURL,
      encoding: null,
    },
    (err, resp) => {
      if (!err && resp.statusCode === 200) {
        response.set('Content-Type', 'image/jpeg');
        response.send(resp.body);
      }
    },
  );
});

export default companiesRouter;
