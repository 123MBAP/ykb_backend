import { Router } from 'express';
import { validate } from '../../middlewares/validate.middleware';
import { languagesController } from './languages.controller';
import { createLanguageSchema, languageIdSchema, updateLanguageSchema } from './languages.schema';

export const languagesRouter = Router();

languagesRouter.get('/', languagesController.list);
languagesRouter.post('/', validate(createLanguageSchema), languagesController.create);
languagesRouter.patch('/:id', validate(updateLanguageSchema), languagesController.update);
languagesRouter.delete('/:id', validate(languageIdSchema), languagesController.remove);
