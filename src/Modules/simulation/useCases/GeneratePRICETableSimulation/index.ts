import { SimulationRepository } from '../../repositories/SimulationsRepository/SimulationRepository';
import { GeneratePRICETableSimulationUseCase } from './GeneratePRICETableSimulationUseCase';

const simulationsRepository = new SimulationRepository();
const generatePRICETableSimulationUseCase = new GeneratePRICETableSimulationUseCase(
  simulationsRepository,
);

export { generatePRICETableSimulationUseCase };
