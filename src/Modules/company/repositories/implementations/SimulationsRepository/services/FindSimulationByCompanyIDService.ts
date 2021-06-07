import { SimulationModel } from '../../../../models/Simulation';
import Simulation from '../../../../schemas/Simulation';

class FindSimulationByCompanyIDService {
  async execute(companyID: string): Promise<Simulation[]> {
    const simulations = await SimulationModel.find({
      company: companyID,
    });
    return simulations;
  }
}

export { FindSimulationByCompanyIDService };
