import { PartnerRepository } from '../../../partner/repositories/implementations/PartnerRepository';
import { SimulationRepository } from '../../repositories/SimulationsRepository/SimulationRepository';
import { generatePRICETableSimulationUseCase } from '../GeneratePRICETableSimulation';
import { generateSACTableSimulationUseCase } from '../GenerateSACTableSimulation';
import { GeneratePartnerSimulationPDFController } from './GeneratePartnerSimulationPDFController';
import { GeneratePartnerSimulationPDFUseCase } from './GeneratePartnerSimulationPDFUseCase';

const simulationsRepository = new SimulationRepository();
const partnersRepository = new PartnerRepository();
const generatePartnerSimulationPDFUseCase = new GeneratePartnerSimulationPDFUseCase(
  partnersRepository,
  simulationsRepository,
  generateSACTableSimulationUseCase,
  generatePRICETableSimulationUseCase,
);
const generatePartnerSimulationPDFController = new GeneratePartnerSimulationPDFController(
  generatePartnerSimulationPDFUseCase,
);

export { generatePartnerSimulationPDFController };
