import { Response, Router, Request } from 'express';
import GenerateSimulationPDFService from '../Services/Simulations/GenerateSimulationPDFService';

const simulationsRouter = Router();

simulationsRouter.post(
  '/pdf/:id',
  async (request: Request, response: Response) => {
    const { id } = request.params;
    const generateSimulationPDFService = new GenerateSimulationPDFService();
    const pdfFile = await generateSimulationPDFService.execute({
      simulationID: id,
    });
    response.contentType('application/pdf');
    return response.status(200).send(pdfFile);
  },
);

export default simulationsRouter;
