import { Response, Router, Request } from 'express';
import { generatePartnerSimulationPDFController } from '../useCases/GeneratePartnerSimulationPDF';
import { generateSimulationPDFController } from '../useCases/GenerateSimulationPDF';

const simulationsRouter = Router();

simulationsRouter.post(
  '/pdf/:id',
  async (request: Request, response: Response) => {
    return generateSimulationPDFController.handle(request, response);
  },
);

simulationsRouter.post('/pdf/partner/:id', async (request, response) => {
  return generatePartnerSimulationPDFController.handle(request, response);
});

export default simulationsRouter;
