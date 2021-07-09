import ejs from 'ejs';
import path from 'path';
import AppError from '../../../../errors/AppError';
import { GeneratePDFFileService } from '../../../global/GeneratePDFFileService';
import { IPartnerRepository } from '../../../partner/repositories/IPartnerRepository';
import { ISimulationRepository } from '../../repositories/ISimulationRepository';
import { GeneratePRICETableSimulationUseCase } from '../GeneratePRICETableSimulation/GeneratePRICETableSimulationUseCase';
import { GenerateSACTableSimulationUseCase } from '../GenerateSACTableSimulation/GenerateSACTableSimulationUseCase';

class GeneratePartnerSimulationPDFUseCase {
  constructor(
    private partnersRepository: IPartnerRepository,
    private simulationsRepository: ISimulationRepository,
    private generateSACTableSimulationUseCase: GenerateSACTableSimulationUseCase,
    private generatePriceTableSimulationUseCase: GeneratePRICETableSimulationUseCase,
  ) {}

  async execute(simulationID: string): Promise<Buffer> {
    const simulation = await this.simulationsRepository.findByID(simulationID);
    if (!simulation) {
      throw new AppError('Simulation not found', 404);
    }

    const partnerID = simulation.company;
    const partner = await this.partnersRepository.findById(String(partnerID));
    if (!partner) {
      throw new AppError('Company does not have any partner', 404);
    }
    const installments =
      simulation.amortizationType === 0
        ? await this.generateSACTableSimulationUseCase.execute(simulationID)
        : await this.generatePriceTableSimulationUseCase.execute(simulationID);
    const sourceDirectory = path.resolve('.', 'src');

    const templateFilePath = path.join(
      sourceDirectory,
      'views',
      'pdf',
      'partnerSimulation.ejs',
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
          primaryColor: partner.primaryColor,
          secondaryColor: partner.secondaryColor,
          partnerID,
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

export { GeneratePartnerSimulationPDFUseCase };
