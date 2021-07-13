import { Response, Request } from 'express';
import { GenerateSimulationPDFUseCase } from './GenerateSimulationPDFUseCase';

class GenerateSimulationPDFController {
  constructor(
    private generateSimulationPDFUseCase: GenerateSimulationPDFUseCase,
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const pdfFile = await this.generateSimulationPDFUseCase.execute({
      simulationID: id,
    });
    response.contentType('application/pdf');
    return response.status(200).send(pdfFile);
  }
}

export { GenerateSimulationPDFController };
