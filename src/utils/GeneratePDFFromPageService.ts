import { launch, PDFOptions, WaitForOptions } from 'puppeteer';

interface GeneratePDFFromPageProps extends PDFOptions {
  pageURL: string;
}
class GeneratePDFFromPageService {
  public async execute({
    pageURL,
    ...rest
  }: GeneratePDFFromPageProps): Promise<Buffer> {
    const browser = await launch();
    const page = await browser.newPage();
    await page.goto(pageURL, {
      waitUntil: 'networkidle0',
    });
    const pdf = await page.pdf({
      printBackground: true,
      format: 'a4',
      ...rest,
    });
    await browser.close();
    return pdf;
  }
}

export default GeneratePDFFromPageService;
