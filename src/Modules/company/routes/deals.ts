import { Router } from 'express';
import multer from 'multer';
import ensureAuthenticated from '../../../middlewares/AuthenticatedCheckerExpress';
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

export { dealsRouter };
