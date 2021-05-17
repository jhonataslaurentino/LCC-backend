import bitrixApi from '../../api/bitrix';

interface creditType {
  ID: number;
  VALUE: string;
}

interface Response {
  vehicularCreditType: creditType[];
  propertyCreditType: creditType[];
}

class GetBitrixDealsFieldsService {
  public async execute(): Promise<Response> {
    const response = await bitrixApi.get('crm.deal.fields');
    const vehicularCreditType = response.data.result.UF_CRM_1612805901
      .items as creditType[];
    const propertyCreditType = response.data.result.UF_CRM_1602186227
      .items as creditType[];
    return {
      vehicularCreditType,
      propertyCreditType,
    };
  }
}

export default GetBitrixDealsFieldsService;
