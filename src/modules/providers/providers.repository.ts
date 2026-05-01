import type { Provider } from '@prisma/client';
import type { ProviderStatus } from '../../utils/prismaEnums';
import { prisma } from '../../config/prisma';

export const providersRepository = {
    findApproved: async (): Promise<Provider[]> => {
        return prisma.provider.findMany({
            where: { status: 'APPROVED' },
            include: { user: true }
        });
    },

    findById: async (id: string): Promise<Provider | null> => {
        return prisma.provider.findUnique({ where: { id }, include: { user: true } });
    },

    findByUserId: async (userId: string): Promise<Provider | null> => {
        return prisma.provider.findUnique({ where: { userId }, include: { user: true } });
    },

    updateByUserId: async (
        userId: string,
        data: {
            bio?: string | null;
            profileImageUrl?: string | null;
            profileImagePublicId?: string | null;
            businessName?: string | null;
            mainService?: string | null;
            location?: string | null;
            moneyRange?: string | null;
            serviceOfferings?: any;
        }
    ) => {
        return prisma.provider.update({ where: { userId }, data, include: { user: true } });
    },

    updateStatus: async (providerId: string, status: ProviderStatus) => {
        return prisma.provider.update({ where: { id: providerId }, data: { status }, include: { user: true } });
    }
};
