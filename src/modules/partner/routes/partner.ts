import { Router } from 'express';
import multer from 'multer';
import ensureAuthenticated from '../../../middlewares/AuthenticatedCheckerExpress';
import { changePartnerAvatarController } from '../useCases/ChangePartnerAvatar';
import { changePlatformLogoController } from '../useCases/ChangePlatformLogo';
import { getPartnerAvatarController } from '../useCases/GetPartnerAvatar';
import { getPlatformLogoController } from '../useCases/GetPlatformLogo';

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

partnerRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('file'),
  async (request, response) =>
    changePartnerAvatarController.handle(request, response),
);

partnerRouter.get('/avatar/:id', async (request, response) =>
  getPartnerAvatarController.handle(request, response),
);

export { partnerRouter };
