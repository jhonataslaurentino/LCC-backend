import { Request, Response } from 'express';
import { CreatePersonalDealUseCase } from './CreatePersonalDealUseCase';

interface IFiles {
  [key: string]: Express.Multer.File[];
}

class CreatePersonalDealController {
  constructor(private createPersonalDealUseCase: CreatePersonalDealUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const files = request.files as IFiles;
    const {
      birthday,
      companyID,
      cpf,
      opportunityValue,
      typeOfContract,
      email,
      name,
      phone,
      personType,
    } = request.body;
    const createdDeal = await this.createPersonalDealUseCase.execute({
      CNH: files.CNH[0],
      proofOfAddress: files.proofOfAddress[0],
      birthday,
      companyID,
      cpf,
      email,
      name,
      opportunityValue,
      personType,
      phone,
      typeOfContract,
    });
    return response.json(createdDeal);
  }
}

export { CreatePersonalDealController };
