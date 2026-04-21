import { Router } from 'express';
import { protect } from '../../middlewares/auth.middleware';
import { validate } from '../../middlewares/validate.middleware';
import { createRequestSchema } from './requests.schema';
import { requestsController } from './requests.controller';

export const requestsRouter = Router();

requestsRouter.post('/', protect, validate(createRequestSchema), requestsController.create);
requestsRouter.get('/me', protect, requestsController.listMine);
