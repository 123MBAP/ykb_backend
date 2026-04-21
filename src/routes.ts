import { Router } from 'express';
import { authRouter } from './modules/auth/auth.routes';
import { usersRouter } from './modules/users/users.routes';
import { providersRouter } from './modules/providers/providers.routes';
import { servicesRouter } from './modules/services/services.routes';
import { bookingsRouter } from './modules/bookings/bookings.routes';
import { paymentsRouter } from './modules/payments/payments.routes';
import { requestsRouter } from './modules/requests/requests.routes';
import { reviewsRouter } from './modules/reviews/reviews.routes';
import { uploadsRouter } from './modules/uploads/uploads.routes';
import { adminRouter } from './modules/admin/admin.routes';

export const routes = Router();

routes.use('/auth', authRouter);
routes.use('/users', usersRouter);
routes.use('/providers', providersRouter);
routes.use('/service-catalog', servicesRouter);
routes.use('/bookings', bookingsRouter);
routes.use('/payments', paymentsRouter);
routes.use('/requests', requestsRouter);
routes.use('/reviews', reviewsRouter);
routes.use('/uploads', uploadsRouter);
routes.use('/admin', adminRouter);
