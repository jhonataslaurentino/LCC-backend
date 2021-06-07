import { SimulationRepository } from '../../repositories/implementations/SimulationsRepository/SimulationRepository';
import { GeneratePRICETableSimulationUseCase } from '../GeneratePRICETableSimulation/GeneratePRICETableSimulationUseCase';
import { GenerateSACTableSimulationUseCase } from '../GenerateSACTableSimulation/GenerateSACTableSimulationUseCase';
import { GenerateSimulationPDFController } from './GenerateSimulationPDFController';
import { GenerateSimulationPDFUseCase } from './GenerateSimulationPDFUseCase';

const simulationsRepository = new SimulationRepository();
const generateSACTableSimulationUseCase = new GenerateSACTableSimulationUseCase(
  simulationsRepository,
);
const generatePRICETableSimulationUseCase = new GeneratePRICETableSimulationUseCase(
  simulationsRepository,
);
const generateSimulationPDFUseCase = new GenerateSimulationPDFUseCase(
  simulationsRepository,
  generateSACTableSimulationUseCase,
  generatePRICETableSimulationUseCase,
);
const generateSimulationPDFController = new GenerateSimulationPDFController(
  generateSimulationPDFUseCase,
);

export { generateSimulationPDFController };
