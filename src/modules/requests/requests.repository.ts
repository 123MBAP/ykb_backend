import { prisma } from '../../config/prisma';

export const requestsRepository = {
    create: async (data: any) => {
        return prisma.request.create({ data });
    },

    listMine: async (userId: string) => {
        return prisma.request.findMany({ where: { userId }, orderBy: { createdAt: 'desc' } });
    },

    listAll: async () => {
        return prisma.request.findMany({ include: { user: true }, orderBy: { createdAt: 'desc' } });
    },

    findById: async (requestId: string) => {
        return prisma.request.findUnique({ where: { id: requestId } });
    },

    updateById: async (requestId: string, data: any) => {
        return prisma.request.update({ where: { id: requestId }, data, include: { user: true } });
    }
};
