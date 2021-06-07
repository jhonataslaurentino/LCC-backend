import ejs from 'ejs';
import path from 'path';
import AppError from '../../../../errors/AppError';
import { GeneratePDFFileService } from '../../../global/GeneratePDFFileService';
import { ISimulationRepository } from '../../repositories/ISimulationRepository';
import { GeneratePRICETableSimulationUseCase } from '../GeneratePRICETableSimulation/GeneratePRICETableSimulationUseCase';
import { GenerateSACTableSimulationUseCase } from '../GenerateSACTableSimulation/GenerateSACTableSimulationUseCase';

interface Request {
  simulationID: string;
}

class GenerateSimulationPDFUseCase {
  constructor(
    private simulationsRepository: ISimulationRepository,
    private generateSACTableSimulationUseCase: GenerateSACTableSimulationUseCase,
    private generatePRICETableSimulationUseCase: GeneratePRICETableSimulationUseCase,
  ) {}

  async execute({ simulationID }: Request): Promise<Buffer> {
    const simulation = await this.simulationsRepository.findByID(simulationID);
    if (!simulation) {
      throw new AppError('Simulation not found', 404);
    }
    const installments =
      simulation.amortizationType === 0
        ? await this.generateSACTableSimulationUseCase.execute(simulationID)
        : await this.generatePRICETableSimulationUseCase.execute(simulationID);
    const sourceDirectory = path.resolve('.', 'src');
    const templateFilePath = path.join(
      sourceDirectory,
      'views',
      'pdf',
      'simulation.ejs',
    );
    const pageContent: string = await new Promise(resolve => {
      ejs.renderFile(
        templateFilePath,
        {
          installments,
          name: simulation.name,
          phone: simulation.phone,
          email: simulation.email,
          averageRate: simulation.averageRate,
          betterRate: simulation.competitiveRate,
        },
        (error, html) => {
          if (error) {
            throw new AppError('read file error');
          }
          resolve(html);
        },
      );
    });

    const generatePDFFileService = new GeneratePDFFileService();
    const pdf = await generatePDFFileService.execute({
      pageContent,
    });
    return pdf;
  }
}

export { GenerateSimulationPDFUseCase };
