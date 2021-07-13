import { Router } from 'express';
import multer from 'multer';
import { createPartnerConsignedDealController } from '../useCases/CreatePartnerConsignedDeal';
import { createPartnerPersonalDealController } from '../useCases/CreatePartnerPersonalDeal';

const partnerDealsRouter = Router();

const upload = multer({
  dest: './tmp',
});

partnerDealsRouter.post(
  '/personal',
  upload.fields([
    { name: 'CNH', maxCount: 1 },
    { name: 'proofOfAddress', maxCount: 1 },
  ]),
  async (request, response) =>
    createPartnerPersonalDealController.handle(request, response),
);

partnerDealsRouter.post(
  '/consigned',
  upload.fields([
    { name: 'CNH', maxCount: 1 },
    { name: 'proofOfAddress', maxCount: 1 },
  ]),
  async (request, response) =>
    createPartnerConsignedDealController.handle(request, response),
);

export { partnerDealsRouter };
