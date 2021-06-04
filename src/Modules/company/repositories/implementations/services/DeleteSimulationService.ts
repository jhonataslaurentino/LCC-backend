import { CompanyModel } from '../../../models/Company';
import { SimulationModel } from '../../../models/Simulation';
import Simulation from '../../../schemas/Simulation';
import { IDeleteSimulationDTO } from '../../ISimulationRepository';

class DeleteSimulationService {
  public async execute({
    companyID,
    simulationID,
  }: IDeleteSimulationDTO): Promise<Simulation> {
    const company = await CompanyModel.findById(companyID);
    if (!company) {
      throw new Error('Company does not exists');
    }
    const simulation = await SimulationModel.findOneAndDelete({
      _id: simulationID,
      company: companyID,
    });
    if (!simulation) {
      throw new Error('Simulation does not exists');
    }
    company.simulations = company.simulations.filter(
      companySimulation => companySimulation !== simulation.id,
    );
    await company.save();
    return simulation;
  }
}

export { DeleteSimulationService };
