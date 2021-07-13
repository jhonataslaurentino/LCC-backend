import { Request, Response } from 'express';
import { IFiles } from '../CreatePartnerPersonalDeal/CreatePartnerPersonalDealController';
import { CreatePartnerConsignedDealUseCase } from './CreatePartnerConsignedDealUseCase';

class CreatePartnerConsignedDealController {
  constructor(
    private createPartnerConsignedDealUseCase: CreatePartnerConsignedDealUseCase,
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const files = request.files as IFiles;
    const {
      bankAccount,
      bankBranch,
      bankFinancialInstitution,
      birthday,
      companyID,
      contractedBody,
      cpf,
      email,
      name,
      opportunityValue,
      personType,
      phone,
    } = request.body;
    const createdDeal = await this.createPartnerConsignedDealUseCase.execute({
      CNH: files.CNH[0],
      bankAccount,
      bankBranch,
      bankFinancialInstitution,
      birthday,
      companyID,
      contractedBody,
      cpf,
      email,
      name,
      opportunityValue,
      personType,
      phone,
      proofOfAddress: files.proofOfAddress[0],
    });
    return response.json(createdDeal);
  }
}

export { CreatePartnerConsignedDealController };
