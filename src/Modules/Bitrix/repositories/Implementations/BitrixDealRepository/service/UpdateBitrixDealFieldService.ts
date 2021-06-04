import { AxiosInstance } from 'axios';
import { IUpdateDealDTO } from '../../../IBitrixDealRepository';

class UpdateBitrixDealFieldService {
  constructor(private api: AxiosInstance) {}

  async execute({ id, ...fields }: IUpdateDealDTO): Promise<boolean> {
    const response = await this.api.post('/crm.deal.update', {
      id,
      fields,
    });
    const dealWasUpdated = response.data.result;
    return dealWasUpdated;
  }
}

export { UpdateBitrixDealFieldService };
