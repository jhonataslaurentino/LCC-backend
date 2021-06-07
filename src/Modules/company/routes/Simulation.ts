import { Response, Router, Request } from 'express';
import { generateSimulationPDFController } from '../useCases/GenerateSimulationPDF';

const simulationsRouter = Router();

simulationsRouter.post(
  '/pdf/:id',
  async (request: Request, response: Response) => {
    return generateSimulationPDFController.handle(request, response);
  },
);

export default simulationsRouter;
