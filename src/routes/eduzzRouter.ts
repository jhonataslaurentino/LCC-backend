import { Request, Response, Router } from 'express';
import HandleWebhookService from '../eduzz/Services/HandleWebhookService';

const eduzzRouter = Router();

eduzzRouter.get('/', async (request: Request, response: Response) => {
  return response.status(200).json({ message: 'ok' });
});

eduzzRouter.post('/', async (request: Request, response: Response) => {
  try {
    const {
      cus_email: customer_email,
      cus_name: customer_name,
      trans_code: bill_id,
    } = request.body;
    const handleWebhookService = new HandleWebhookService();
    await handleWebhookService.execute({
      bill_id,
      customer_email,
      customer_name,
    });
    return response.status(200).send();
  } catch (error) {
    return response.status(404).send({
      message: error.message,
    });
  }
});

export default eduzzRouter;
