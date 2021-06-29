import { Router } from 'express';
import multer from 'multer';
import ensureAuthenticated from '../../../middlewares/AuthenticatedCheckerExpress';
import { changePlatformLogoController } from '../useCases/ChangePlatformLogo';
import { getPlatformLogoController } from '../useCases/getPlatformLogo';

const partnerRouter = Router();

const upload = multer({
  dest: './tmp',
});

partnerRouter.patch(
  '/platform/logo',
  ensureAuthenticated,
  upload.single('file'),
  async (request, response) => {
    return changePlatformLogoController.handle(request, response);
  },
);

partnerRouter.get('/platform/logo/:id', async (request, response) =>
  getPlatformLogoController.handle(request, response),
);

export { partnerRouter };
