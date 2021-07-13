import endpointsConfig from '../../../../../config/endpoints.config';
import AppError from '../../../../../errors/AppError';
import { oneTimeChargeUseCase } from './useCases/OneTimeCharge';
import { subscriptionUseCase } from './useCases/Subscription';

interface IEduzzItemDTO {
  item_id: number;
  item_name: string;
  item_value: number;
  item_coupon_code: string;
  item_coupon_value: number;
  item_product_id: number;
  item_product_name: string;
  item_product_refund: number;
  item_product_sku_reference: string;
  item_product_partner_cod: number;
  item_product_chargetype: string;
  trans_items_quantity: number;
  trans_job_id: number;
  trans_job_status: number;
  trans_orderid: number;
  utm_campaign: string;
  utm_content: string;
  utm_medium: number;
  utm_source: string;
}

interface IWebhookRequest {
  api_key: string;
  cus_email: string;
  cus_name: string;
  trans_cod: number;
  trans_items: IEduzzItemDTO[];
  recurrence_status: number;
  recurrence_cod: number;
  cus_taxnumber: string;
  trans_status: number;
  cus_tel: string;
}

class HandleWebhookUseCase {
  async execute({
    api_key,
    cus_email,
    cus_name,
    cus_taxnumber,
    recurrence_cod,
    recurrence_status,
    trans_cod,
    trans_items,
    trans_status,
    cus_tel,
  }: IWebhookRequest): Promise<void> {
    const { eduzzApiKey } = endpointsConfig;
    if (api_key !== eduzzApiKey) {
      throw new AppError('Forbiddem Api Key', 403);
    }
    trans_items.forEach(async transaction_item => {
      if (transaction_item.item_product_chargetype === 'N') {
        await oneTimeChargeUseCase.execute({
          cus_email,
          cus_name,
          cus_taxnumber,
          cus_tel,
          trans_cod,
          trans_status,
        });
      } else if (transaction_item.item_product_chargetype === 'A') {
        await subscriptionUseCase.execute({
          cus_email,
          cus_name,
          cus_taxnumber,
          cus_tel,
          recurrence_cod,
          recurrence_status,
          trans_cod,
        });
      }
    });
  }
}

export { HandleWebhookUseCase, IEduzzItemDTO, IWebhookRequest };
