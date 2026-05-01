import { Router } from 'express';
import { Role } from '../../utils/prismaEnums';
import { protect } from '../../middlewares/auth.middleware';
import { requireRoles } from '../../middlewares/role.middleware';
import { validate } from '../../middlewares/validate.middleware';
import { adminController } from './admin.controller';
import { updateRequestSchema, verifyProviderSchema } from './admin.schema';

export const adminRouter = Router();

adminRouter.use(protect, requireRoles(Role.ADMIN));

adminRouter.get('/bookings', adminController.listBookings);
adminRouter.get('/payments', adminController.listPayments);
adminRouter.get('/requests', adminController.listRequests);
adminRouter.get('/providers', adminController.listProviders);
adminRouter.get('/providers/:providerId', adminController.getProviderById);
adminRouter.patch('/providers/:providerId/verify', validate(verifyProviderSchema), adminController.verifyProvider);
adminRouter.patch('/requests/:requestId', validate(updateRequestSchema), adminController.updateRequest);
