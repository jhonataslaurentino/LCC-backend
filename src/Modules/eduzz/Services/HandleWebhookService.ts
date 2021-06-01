import endpointsConfig from '../../../config/endpoints.config';
import AppError from '../../../errors/AppError';
import IEduzzItemDTO from '../dtos/EduzzItem';
import HandleOneTimeChargeService from './HandleOneTimeChargeService';
import HandleSubscriptionService from './HandleSubscriptionService';

interface Request {
  customer_name: string;
  customer_email: string;
  eduzzBillID?: number;
  api_key: string;
  trans_items: IEduzzItemDTO[];
  recurrence_status?: number;
  trans_status?: number;
  recurrence_code?: number;
}

class HandleWebhookService {
  public async execute({
    customer_email,
    customer_name,
    eduzzBillID,
    trans_items,
    api_key,
    recurrence_status,
    trans_status,
    recurrence_code,
  }: Request): Promise<void> {
    const { eduzzApiKey } = endpointsConfig;
    if (api_key !== eduzzApiKey) {
      throw new AppError('Forbidden Api Key', 403);
    }
    trans_items.forEach(async transaction_item => {
      if (transaction_item.item_product_chargetype === 'N') {
        const handleOneTimeChargeService = new HandleOneTimeChargeService();
        await handleOneTimeChargeService.execute({
          eduzzBillID,
          email: customer_email,
          name: customer_name,
          trans_status,
        });
      }
      if (transaction_item.item_product_chargetype === 'A') {
        const handleSubscriptionService = new HandleSubscriptionService();
        await handleSubscriptionService.execute({
          recurrence_status,
          recurrence_code,
          customerEmail: customer_email,
          customerName: customer_name,
          bill_id: eduzzBillID,
        });
      }
    });
  }
}

export default HandleWebhookService;
