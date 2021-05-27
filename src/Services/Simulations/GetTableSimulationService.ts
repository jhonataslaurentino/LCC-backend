import SimulationModel from '../../Entities/Simulation';
import Installment from '../../Schemas/Installment';
import GetPriceTableSimulationService from './GetPriceTableSimulationService';
import GetSACTableSimulationService from './GetSACTableSimulationService';

interface Request {
  simulationID: string;
  companyID: string;
}

class GetTableSimulationService {
  public async execute({
    companyID,
    simulationID,
  }: Request): Promise<Installment[]> {
    const simulation = await SimulationModel.findOne({
      _id: simulationID,
      company: companyID,
    });
    if (!simulation) {
      throw new Error('Simulation not found.');
    }
    const getSACTableSimulationService = new GetSACTableSimulationService();
    const getPriceTableSimulationService = new GetPriceTableSimulationService();
    const installments =
      simulation.amortizationType === 0
        ? getSACTableSimulationService.execute({
            loanAmount: simulation.value,
            loanInterest: simulation.competitiveRate + simulation.selicRate,
            numberOfInstallments: simulation.numberOfInstallments,
          })
        : getPriceTableSimulationService.execute({
            loanAmount: simulation.value,
            loanInterest: simulation.competitiveRate + simulation.selicRate,
            numberOfInstallments: simulation.numberOfInstallments,
          });
    return installments;
  }
}

export default GetTableSimulationService;
