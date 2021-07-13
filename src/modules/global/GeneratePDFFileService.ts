import { launch, PDFOptions } from 'puppeteer';

interface Request {
  pageContent: string;
  pdfOptions?: PDFOptions;
}

class GeneratePDFFileService {
  async execute({ pageContent, pdfOptions }: Request): Promise<Buffer> {
    const browser = await launch();
    const page = await browser.newPage();
    await page.setContent(pageContent);
    const pdfFileOptions = pdfOptions || {
      printBackground: true,
      format: 'a4',
      margin: {
        top: '2cm',
        left: '2cm',
        bottom: '2cm',
        right: '2cm',
      },
      preferCSSPageSize: true,
    };
    const pdf = await page.pdf(pdfFileOptions);
    await browser.close();
    return pdf;
  }
}
export { GeneratePDFFileService };
