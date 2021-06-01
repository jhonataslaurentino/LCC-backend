import path from 'path';
import ejs from 'ejs';
import { launch } from 'puppeteer';
import AppError from '../../errors/AppError';
import SimulationModel from '../../Entities/Simulation';
import GetPriceTableSimulationService from './GetPriceTableSimulationService';
import GetSACTableSimulationService from './GetSACTableSimulationService';

interface Request {
  simulationID: string;
}

class GenerateSimulationPDFService {
  public async execute({ simulationID }: Request): Promise<Buffer> {
    const simulation = await SimulationModel.findById(simulationID);
    if (!simulation) {
      throw new AppError('Simulation not found', 404);
    }
    const getPriceTableSimulationService = new GetPriceTableSimulationService();
    const getSACTableSimulationService = new GetSACTableSimulationService();
    const installments =
      simulation.amortizationType === 0
        ? getSACTableSimulationService.execute({
            loanAmount: simulation.value,
            loanInterest: simulation.competitiveRate,
            numberOfInstallments: simulation.numberOfInstallments,
          })
        : getPriceTableSimulationService.execute({
            loanAmount: simulation.value,
            loanInterest: simulation.competitiveRate,
            numberOfInstallments: simulation.numberOfInstallments,
          });
    const sourceDirectory = path.resolve('.', 'src');
    const templateFilePath = path.join(
      sourceDirectory,
      'templates',
      'pdf',
      'simulation.ejs',
    );
    const pageContent: string = await new Promise(resolve => {
      ejs.renderFile(templateFilePath, { installments }, (error, html) => {
        if (error) {
          throw new AppError('read file error');
        }
        resolve(html);
      });
    });

    const browser = await launch();
    const page = await browser.newPage();
    await page.setContent(pageContent);
    const pdf = await page.pdf({
      printBackground: true,
      format: 'a4',
      margin: {
        top: '2cm',
        left: '2cm',
        bottom: '2cm',
        right: '2cm',
      },
      preferCSSPageSize: true,
    });
    await browser.close();
    return pdf;
  }
}

export default GenerateSimulationPDFService;
