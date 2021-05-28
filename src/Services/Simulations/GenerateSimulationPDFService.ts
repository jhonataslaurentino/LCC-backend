import path from 'path';
import ejs from 'ejs';
import { launch } from 'puppeteer';
import { Installment } from './GetPriceTableSimulationService';
import AppError from '../../errors/AppError';

interface Request {
  installments: Installment[];
}

class GenerateSimulationPDFService {
  public async execute({ installments }: Request): Promise<Buffer> {
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
