import { Request, Response } from 'express';
import { IFiles } from '../CreatePartnerPersonalDeal/CreatePartnerPersonalDealController';
import { CreatePartnerPrepaymentOfReceivablesUseCase } from './CreatePartnerPrepaymentOfReceivablesUseCase';

class CreatePartnerPrepaymentOfReceivablesController {
  constructor(
    private createPartnerPrepaymentOfReceivablesUseCase: CreatePartnerPrepaymentOfReceivablesUseCase,
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const files = request.files as IFiles;
    const {
      annualInvoice,
      companyID,
      email,
      name,
      opportunityValue,
      personType,
      phone,
      birthday,
      cpf,
    } = request.body;
    const createdDeal = await this.createPartnerPrepaymentOfReceivablesUseCase.execute(
      {
        annualInvoice,
        associateCPF: files.associateCPF[0],
        associateRG: files.associateRG[0],
        birthday,
        companyID,
        cpf,
        email,
        name,
        opportunityValue,
        personType,
        phone,
        proofOfAddress: files.proofOfAddress[0],
        proofOfBusinessAddress: files.proofOfBusinessAddress[0],
        socialContract: files.socialContract[0],
      },
    );
    return response.json(createdDeal);
  }
}

export { CreatePartnerPrepaymentOfReceivablesController };
