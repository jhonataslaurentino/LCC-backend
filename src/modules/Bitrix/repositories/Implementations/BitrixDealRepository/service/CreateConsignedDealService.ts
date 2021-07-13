import { AxiosInstance } from 'axios';
import fs from 'fs';
import { ICreateConsignedDealDTO } from '../../../IBitrixDealRepository';

class CreateConsignedDealService {
  constructor(private api: AxiosInstance) {}

  async execute({
    bankAccount,
    bankBranch,
    bankFinancialInstitution,
    companyID,
    contactID,
    contractedBody,
    cpf,
    opportunityValue,
    CNH,
    proofOfAddress,
  }: ICreateConsignedDealDTO): Promise<string> {
    const response = await this.api.post('/crm.deal.add', {
      fields: {
        OPPORTUNITY: opportunityValue,
        CONTACT_ID: contactID,
        COMPANY_ID: companyID,
        UF_CRM_1617996849572: cpf,
        UF_CRM_1625074341: contractedBody,
        UF_CRM_1617975221574: bankBranch,
        UF_CRM_1617975241030: bankAccount,
        UF_CRM_1617975256804: bankFinancialInstitution,
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
        CATEGORY_ID: '14',
      },
    });
    await fs.promises.unlink(CNH.path);
    await fs.promises.unlink(proofOfAddress.path);
    const dealID = response.data.result;
    return dealID;
  }
}

export { CreateConsignedDealService };
