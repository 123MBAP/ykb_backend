import { Router } from 'express';
import { protect } from '../../middlewares/auth.middleware';
import { validate } from '../../middlewares/validate.middleware';
import { addMyRequestNoteSchema, createRequestSchema, updateMyRequestSchema } from './requests.schema';
import { requestsController } from './requests.controller';

export const requestsRouter = Router();

requestsRouter.post('/', protect, validate(createRequestSchema), requestsController.create);
requestsRouter.get('/me', protect, requestsController.listMine);
requestsRouter.patch('/:requestId', protect, validate(updateMyRequestSchema), requestsController.updateMine);
requestsRouter.post('/:requestId/notes', protect, validate(addMyRequestNoteSchema), requestsController.addNoteMine);
