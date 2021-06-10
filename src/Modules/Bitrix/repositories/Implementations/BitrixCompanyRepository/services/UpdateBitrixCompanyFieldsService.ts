import { AxiosInstance } from 'axios';
import { IUpdateCompanyDTO } from '../../../IBitrixCompanyRepository';

class UpdateBitrixCompanyFieldsService {
  constructor(private api: AxiosInstance) {}

  async execute({ id, ...fields }: IUpdateCompanyDTO): Promise<boolean> {
    const response = await this.api.post('/crm.company.update', {
      id,
      fields,
    });
    const dealWasUpdated = response.data.result;
    return dealWasUpdated;
  }
}

export { UpdateBitrixCompanyFieldsService };
