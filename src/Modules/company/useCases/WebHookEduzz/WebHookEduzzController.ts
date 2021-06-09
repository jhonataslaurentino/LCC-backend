import { Request, Response } from 'express';
import { handleWebhookUseCase } from './webhook';

class WebHookEduzzController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      api_key,
      cus_email,
      cus_name,
      trans_cod,
      trans_items,
      recurrence_status,
      recurrence_cod,
      cus_taxnumber,
      cus_tel,
      trans_status,
    } = request.body;
    await handleWebhookUseCase.execute({
      api_key,
      cus_email,
      cus_name,
      cus_taxnumber,
      cus_tel,
      recurrence_cod: Number(recurrence_cod),
      recurrence_status: Number(recurrence_status),
      trans_cod: Number(trans_cod),
      trans_items,
      trans_status,
    });
    return response.status(200).send();
  }
}

export { WebHookEduzzController };
