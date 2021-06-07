import { AxiosInstance } from 'axios';
import BitrixDealField from '../../../../schemas/BitrixDealField';

class GetBitrixDealFieldsService {
  constructor(private api: AxiosInstance) {}

  async execute(): Promise<BitrixDealField[]> {
    const response = await this.api.get('/crm.deal.fields');
    const { result } = response.data;
    const resultEntries = Object.entries(result);
    const fields = [] as BitrixDealField[];
    resultEntries.forEach(([key, value]) => {
      const { listLabel, items } = (value as unknown) as BitrixDealField;
      fields.push({
        key: String(key),
        listLabel,
        items: items || [],
      });
    });
    return fields;
  }
}

export { GetBitrixDealFieldsService };
