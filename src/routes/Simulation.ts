import { Response, Router, Request } from 'express';
import GenerateSimulationPDFService from '../Services/Simulations/GenerateSimulationPDFService';

const simulationsRouter = Router();

simulationsRouter.post('/pdf', async (request: Request, response: Response) => {
  const { installments } = request.body;
  const generateSimulationPDFService = new GenerateSimulationPDFService();
  const pdfFile = await generateSimulationPDFService.execute({ installments });
  response.contentType('application/pdf');
  return response.send(pdfFile);
});

export default simulationsRouter;
