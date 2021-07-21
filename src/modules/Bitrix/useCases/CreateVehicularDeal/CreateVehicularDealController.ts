import { Request, Response } from 'express';
import { CreateVehicularDealUseCase } from './CreateVehicularDealUseCase';

interface IFiles {
  [key: string]: Express.Multer.File[];
}

class CreateVehicularDealController{
  constructor(private CreateVehicularDealUseCase: CreateVehicularDealUseCase) {}

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
      clientSituation,
      contactMonthlyIncome,
      opportunityValue,
      vehicleManufacturedDate,
      vehicleModel,
      vehicleName,
      vehicleTargetValue,
      vehicleValue,
      vehicularCreditType,
      address,
    }= request.body;

    const createdDeal = await this.CreateVehicularDealUseCase.execute({
      companyID,
      email,
      name,
      cpf,
      cnpj,
      phone,
      clientSituation,
      contactMonthlyIncome,
      opportunityValue,
      vehicleManufacturedDate,
      vehicleModel,
      vehicleName,
      vehicleTargetValue,
      vehicleValue,
      vehicularCreditType,
      address,
      birthday,
      personType,
    });
    return response.json(createdDeal);
  }
}

export { CreateVehicularDealUseCase };
