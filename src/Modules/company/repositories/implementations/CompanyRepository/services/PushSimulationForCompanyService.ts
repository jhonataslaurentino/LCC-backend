import AppError from '../../../../../../errors/AppError';
import { CompanyModel } from '../../../../models/Company';
import { SimulationModel } from '../../../../models/Simulation';
import Company from '../../../../schemas/Company';
import { IPushSimulationForCompanyDTO } from '../../../ICompanyRepository';

class PushSimulationForCompanyService {
  async execute({
    companyID,
    simulationID,
  }: IPushSimulationForCompanyDTO): Promise<Company> {
    const simulation = await SimulationModel.findById(simulationID);
    if (!simulation) {
      throw new AppError('Simulation does not exists', 404);
    }
    const company = await CompanyModel.findById(companyID);
    if (!company) {
      throw new AppError('Company does not exists', 404);
    }
    const companySimulations = company.simulations;
    companySimulations.push(simulation.id);
    company.simulations = companySimulations;
    await company.save();
    return company;
  }
}

export { PushSimulationForCompanyService };
