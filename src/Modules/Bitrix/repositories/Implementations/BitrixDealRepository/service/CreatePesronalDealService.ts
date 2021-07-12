import { AxiosInstance } from 'axios';
import fs from 'fs';
import { ICreatePersonalDealDTO } from '../../../IBitrixDealRepository';

class CreatePersonalDealService {
  constructor(private api: AxiosInstance) {}

  async execute({
    CNH,
    birthday,
    companyID,
    contactID,
    cpf,
    opportunityValue,
    proofOfAddress,
    typeOfContract,
  }: ICreatePersonalDealDTO): Promise<string> {
    const response = await this.api.post('/crm.deal.add', {
      fields: {
        OPPORTUNITY: opportunityValue,
        CONTACT_ID: contactID,
        COMPANY_ID: companyID,
        UF_CRM_1617996849572: cpf,
        UF_CRM_1617996868133: birthday,
        UF_CRM_1625076416: typeOfContract,
        UF_CRM_1613069462: {
          fileData: [
            CNH.originalname,
            fs.readFileSync(CNH.path, {
              encoding: 'base64',
            }),
          ],
        },
        UF_CRM_1602613113828: {
          fileData: [
            proofOfAddress.originalname,
            fs.readFileSync(proofOfAddress.path, {
              encoding: 'base64',
            }),
          ],
        },
        CATEGORY_ID: '16',
      },
    });
    await fs.promises.unlink(CNH.path);
    await fs.promises.unlink(proofOfAddress.path);
    const dealID = response.data.result;
    return dealID;
  }
}

export { CreatePersonalDealService };
