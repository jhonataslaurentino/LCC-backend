import { Request, Response, Router } from 'express';
import HandleWebhookService from '../Services/HandleWebhookService';

const eduzzRouter = Router();

eduzzRouter.get('/', async (request: Request, response: Response) => {
  return response.status(200).json({ message: 'ok' });
});

eduzzRouter.post('/', async (request: Request, response: Response) => {
  const {
    api_key,
    cus_email: customer_email,
    cus_name: customer_name,
    trans_cod: bill_id,
    trans_items,
    recurrence_status,
    recurrence_cod,
  } = request.body;
  const handleWebhookService = new HandleWebhookService();
  await handleWebhookService.execute({
    api_key,
    eduzzBillID: Number(bill_id),
    customer_email,
    customer_name,
    trans_items,
    recurrence_status: Number(recurrence_status),
    trans_status: Number(recurrence_cod),
    recurrence_code: Number(recurrence_cod),
  });
  return response.status(200).send();
});

export default eduzzRouter;
