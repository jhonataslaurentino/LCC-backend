import { Router } from 'express';
import { provideLCCLogoController } from '../useCases/ProvideLCCLogo';

const assetsRouter = Router();

assetsRouter.get('/logo', (request, response) => {
  return provideLCCLogoController.handle(request, response);
});

export { assetsRouter };
