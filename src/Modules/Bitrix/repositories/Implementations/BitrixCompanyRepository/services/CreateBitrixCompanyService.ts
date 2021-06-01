import { AxiosInstance } from 'axios';
import createAddCompanyRequestBody from '../../../../../../api/Bitrix/createAddCompanyRequestBody';
import AppError from '../../../../../../errors/AppError';

interface IRequest {
  name: string;
  phone: string;
  email: string;
}
class CreateBitrixCompanyService {
  constructor(private api: AxiosInstance) {}

  async execute({ email, name, phone }: IRequest): Promise<number> {
    const addCompanyRequestBody = createAddCompanyRequestBody({
      title: name,
      phone,
      email,
    });
    const response = await this.api.post('/crm.company.add', {
      addCompanyRequestBody,
    });
    const { result } = response.data;
    if (!result) {
      throw new AppError('It does not possible to create a company at bitrix');
    }
    const companyID = result;
    return companyID;
  }
}
export { CreateBitrixCompanyService };
