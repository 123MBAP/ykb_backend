import type { ProviderStatus, RequestStatus } from '../../utils/prismaEnums';
import { prisma } from '../../config/prisma';

export const adminRepository = {
    listBookings: async () => {
        return prisma.booking.findMany({
            include: { customer: true, provider: { include: { user: true } }, service: { include: { category: true } }, payment: true },
            orderBy: { createdAt: 'desc' }
        });
    },

    listPayments: async () => {
        return prisma.payment.findMany({
            include: { booking: { include: { customer: true, provider: { include: { user: true } }, service: true } } },
            orderBy: { createdAt: 'desc' }
        });
    },

    listRequests: async () => {
        return prisma.request.findMany({ include: { user: true }, orderBy: { createdAt: 'desc' } });
    },

    updateProviderStatus: async (providerId: string, status: ProviderStatus) => {
        return prisma.provider.update({ where: { id: providerId }, data: { status }, include: { user: true } });
    },

    updateRequest: async (requestId: string, data: { status: RequestStatus; adminNotes?: string | null }) => {
        return prisma.request.update({ where: { id: requestId }, data, include: { user: true } });
    }
};
