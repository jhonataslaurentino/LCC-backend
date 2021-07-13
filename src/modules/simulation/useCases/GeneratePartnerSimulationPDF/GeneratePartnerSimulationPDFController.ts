import { Request, Response } from 'express';
import { GeneratePartnerSimulationPDFUseCase } from './GeneratePartnerSimulationPDFUseCase';

class GeneratePartnerSimulationPDFController {
  constructor(
    private generatePartnerSimulationPDFUseCase: GeneratePartnerSimulationPDFUseCase,
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const pdfFile = await this.generatePartnerSimulationPDFUseCase.execute(id);
    response.contentType('application/pdf');
    return response.status(200).send(pdfFile);
  }
}

export { GeneratePartnerSimulationPDFController };
