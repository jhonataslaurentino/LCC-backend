import { Router } from 'express';
import multer from 'multer';
import ensureAuthenticated from '../../../middlewares/AuthenticatedCheckerExpress';
import { createPersonalDealController } from '../../Bitrix/useCases/CreatePersonalDeal';
import { commentDealTimelineController } from '../useCases/CommentDealTimeline';

const dealsRouter = Router();
const upload = multer({
  dest: './tmp',
});
dealsRouter.post(
  '/comment',
  ensureAuthenticated,
  upload.array('files'),
  async (request, response) =>
    commentDealTimelineController.handle(request, response),
);

dealsRouter.post(
  '/personal',
  upload.fields([
    { name: 'CNH', maxCount: 1 },
    { name: 'proofOfAddress', maxCount: 1 },
  ]),
  async (request, response) =>
    createPersonalDealController.handle(request, response),
);

export { dealsRouter };
