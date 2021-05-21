import CompanyModel from '../../Entities/Company';
import SimulationModel from '../../Entities/Simulation';
import Simulation from '../../Schemas/Simulation';

interface Request {
  companyID: string;
  simulationID: string;
}

class DeleteSimulationService {
  public async execute({
    companyID,
    simulationID,
  }: Request): Promise<Simulation> {
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

export default DeleteSimulationService;
