import CompanyModel from '../../Entities/Company';
import DealTypeModel from '../../Entities/DealType';
import SimulationModel from '../../Entities/Simulation';
import Simulation from '../../Schemas/Simulation';
import GetSELICRateService from '../bcb/GetSELICRateService';

interface Request {
  value: number;
  numberOfInstallments: number;
  name: string;
  cpf: string;
  email: string;
  phone: string;
  dealTypeID: string;
  companyID: string;
}

class CreateSimulationService {
  public async execute({
    value,
    numberOfInstallments,
    name,
    cpf,
    email,
    phone,
    dealTypeID,
    companyID,
  }: Request): Promise<Simulation> {
    const company = await CompanyModel.findById(companyID);
    if (!company) {
      throw new Error('Company does not exists');
    }
    const getSELICRateService = new GetSELICRateService();
    const SELICRate = await getSELICRateService.execute();
    const dealType = await DealTypeModel.findById(dealTypeID);
    const simulation = await SimulationModel.create({
      name,
      value,
      cpf,
      email,
      phone,
      dealType,
      numberOfInstallments,
      selicRate: SELICRate,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      company: companyID,
    });

    company.simulations.push(simulation.id);
    await company.save();

    return simulation;
  }
}

export default CreateSimulationService;
