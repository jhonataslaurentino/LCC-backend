import path from 'path';
import ejs from 'ejs';
import { launch } from 'puppeteer';
import { Installment } from './GetPriceTableSimulationService';
import ExpressError from '../../errors/ExpressError';

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
          throw new ExpressError('read file error');
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
    });
    await browser.close();
    return pdf;
  }
}

export default GenerateSimulationPDFService;
