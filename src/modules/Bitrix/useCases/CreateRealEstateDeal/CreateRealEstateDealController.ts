import { Request, Response } from 'express';
import { CreateRealEstateDealUseCase } from './CreateRealEstateDealUseCase';

interface IFiles {
  [key: string]: Express.Multer.File[];
}

class CreateRealEstateDealController{
  constructor(private CreateRealEstateDealUseCase: CreateRealEstateDealUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const files = request.files as IFiles;
    const {
      birthday,
      companyID,
      email,
      name,
      cnpj,
      cpf,
      personType,
      phone,
    }= request.body;

    const createdDeal = await this.CreateRealEstateDealUseCase.execute({
      address,
      birthday,
      cnpj,
      companyID,
      cpf,
      creditType,
      email,
      name,
      opportunityValue,
      personType,
      phone,
      propertyID,
      propertyValue,
      term,
    });
    return response.json(createdDeal);
  }
}

export { CreateRealEstateDealUseCase };
