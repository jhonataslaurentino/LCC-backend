import { GeneratePRICETableSimulationUseCase } from '../GeneratePRICETableSimulation/GeneratePRICETableSimulationUseCase';
import { GenerateSACTableSimulationUseCase } from '../GenerateSACTableSimulation/GenerateSACTableSimulationUseCase';
import { SimulationRepository } from '../../repositories/SimulationsRepository/SimulationRepository';
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
