import { Prisma } from '@prisma/client';
import { Role } from '../../utils/prismaEnums';
import { AppError } from '../../utils/appError';
import { requestsRepository } from './requests.repository';
import type { AdminUpdateRequestInput, CreateRequestInput } from './requests.types';

export const requestsService = {
    create: async (auth: { userId: string; role: Role }, input: CreateRequestInput) => {
        if (auth.role !== Role.CUSTOMER && auth.role !== Role.ADMIN) {
            throw new AppError('Only customers can create requests', 403, 'FORBIDDEN');
        }

        const preferredDate = input.preferredDate ? new Date(input.preferredDate) : null;
        const budget = input.budget ? new Prisma.Decimal(input.budget) : null;

        return requestsRepository.create({
            userId: auth.userId,
            description: input.description,
            location: input.location,
            preferredDate,
            budget
        });
    },

    listMine: async (auth: { userId: string; role: Role }) => {
        return requestsRepository.listMine(auth.userId);
    },

    listAll: async () => {
        return requestsRepository.listAll();
    },

    adminUpdate: async (requestId: string, input: AdminUpdateRequestInput) => {
        const existing = await requestsRepository.findById(requestId);
        if (!existing) throw new AppError('Request not found', 404, 'NOT_FOUND');

        return requestsRepository.updateById(requestId, {
            status: input.status,
            adminNotes: input.adminNotes
        });
    }
};
