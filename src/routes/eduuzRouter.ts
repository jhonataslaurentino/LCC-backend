import { Request, Response, Router } from 'express';

// https://github.com/eduzz/webhook

const eduuzRouter = Router();

eduuzRouter.get('/', async (request: Request, response: Response) => {
  return response.status(200).json({ message: 'ok' });
});

eduuzRouter.post('/', async (request: Request, response: Response) => {
  try {
    const { cus_email, cus_name } = request.body;
    console.log(cus_email, cus_name);
    return response.status(200).send();
  } catch (error) {
    console.log(error);
    return response.status(404).send();
  }
});

export default eduuzRouter;
