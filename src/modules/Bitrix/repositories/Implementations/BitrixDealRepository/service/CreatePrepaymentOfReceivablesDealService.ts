import { AxiosInstance } from 'axios';
import fs from 'fs';
import { ICreatePrepaymentOfReceivablesDTO } from '../../../IBitrixDealRepository';

class CreatePrepaymentOfReceivablesDealService {
  constructor(private api: AxiosInstance) {}

  async execute({
    annualInvoice,
    associateCPF,
    associateRG,
    companyID,
    contactID,
    opportunityValue,
    proofOfAddress,
    proofOfBusinessAddress,
    socialContract,
  }: ICreatePrepaymentOfReceivablesDTO): Promise<string> {
    const response = await this.api.post('/crm.deal.add', {
      fields: {
        CATEGORY_ID: '9',
        OPPORTUNITY: opportunityValue,
        CONTACT_ID: contactID,
        COMPANY_ID: companyID,
        UF_CRM_1617975184536: annualInvoice,
        UF_CRM_1617803436931: {
          fileData: [
            associateCPF.originalname,
            fs.readFileSync(associateCPF.path, {
              encoding: 'base64',
            }),
          ],
        },
        UF_CRM_1617803460744: {
          fileData: [
            associateRG.originalname,
            fs.readFileSync(associateRG.path, {
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
        UF_CRM_1617803497422: {
          fileData: [
            proofOfBusinessAddress.originalname,
            fs.readFileSync(proofOfBusinessAddress.path, {
              encoding: 'base64',
            }),
          ],
        },
        UF_CRM_1617803560781: {
          fileData: [
            socialContract.originalname,
            fs.readFileSync(socialContract.path, {
              encoding: 'base64',
            }),
          ],
        },
      },
    });
    await fs.promises.unlink(associateCPF.path);
    await fs.promises.unlink(associateRG.path);
    await fs.promises.unlink(proofOfAddress.path);
    await fs.promises.unlink(proofOfBusinessAddress.path);
    await fs.promises.unlink(socialContract.path);

    const dealID = response.data.result;
    return dealID;
  }
}

export { CreatePrepaymentOfReceivablesDealService };
