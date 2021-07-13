import { SimulationModel } from '../../../models/Simulation';
import Simulation from '../../../schemas/Simulation';

class FindSimulationsByPartnerIDService {
  async execute(partnerID: string): Promise<Simulation[]> {
    const simulations = await SimulationModel.find({
      company: partnerID,
    });
    return simulations;
  }
}

export { FindSimulationsByPartnerIDService };
