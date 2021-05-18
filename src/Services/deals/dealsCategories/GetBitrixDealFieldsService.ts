import bitrixApi from '../../../api/bitrix';
import BitrixDealField from '../../../Schemas/BitrixDealField';

class GetBitrixDealFieldsService {
  public async execute(): Promise<BitrixDealField[]> {
    const response = await bitrixApi.get('/crm.deal.fields');
    const fields = [] as BitrixDealField[];
    // eslint-disable-next-line no-restricted-syntax
    for (const [key, value] of Object.entries(response.data.result)) {
      const { listLabel, items } = value as BitrixDealField;
      fields.push({
        key,
        listLabel,
        items,
      });
    }
    return fields;
  }
}

export default GetBitrixDealFieldsService;
