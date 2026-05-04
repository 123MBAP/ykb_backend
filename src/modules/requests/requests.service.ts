import { Prisma } from '@prisma/client';
import { Role } from '../../utils/prismaEnums';
import { AppError } from '../../utils/appError';
import { requestsRepository } from './requests.repository';
import type { AdminUpdateRequestInput, CreateRequestInput } from './requests.types';
import { RequestStatus } from '../../utils/prismaEnums';

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

    updateMine: async (
        auth: { userId: string; role: Role },
        requestId: string,
        input: { description?: string; location?: string; preferredDate?: string | null; budget?: string | null }
    ) => {
        if (auth.role !== Role.CUSTOMER && auth.role !== Role.ADMIN) {
            throw new AppError('Only customers can update requests', 403, 'FORBIDDEN');
        }

        const existing = await requestsRepository.findById(requestId);
        if (!existing) throw new AppError('Request not found', 404, 'NOT_FOUND');
        if (existing.userId !== auth.userId) throw new AppError('Not allowed', 403, 'FORBIDDEN');

        if (existing.status !== RequestStatus.PENDING) {
            throw new AppError('Only pending requests can be edited', 403, 'FORBIDDEN');
        }

        const data: any = {};
        if (typeof input.description === 'string') data.description = input.description;
        if (typeof input.location === 'string') data.location = input.location;
        if (input.preferredDate !== undefined) data.preferredDate = input.preferredDate ? new Date(input.preferredDate) : null;
        if (input.budget !== undefined) data.budget = input.budget ? new Prisma.Decimal(input.budget) : null;

        return requestsRepository.updateById(requestId, data);
    },

    addNoteMine: async (auth: { userId: string; role: Role }, requestId: string, note: string) => {
        if (auth.role !== Role.CUSTOMER && auth.role !== Role.ADMIN) {
            throw new AppError('Only customers can add notes', 403, 'FORBIDDEN');
        }

        const existing = await requestsRepository.findById(requestId);
        if (!existing) throw new AppError('Request not found', 404, 'NOT_FOUND');
        if (existing.userId !== auth.userId) throw new AppError('Not allowed', 403, 'FORBIDDEN');

        if (existing.status === RequestStatus.PENDING) {
            throw new AppError('Add notes after the request is received', 403, 'FORBIDDEN');
        }
        if (existing.status === RequestStatus.CANCELLED) {
            throw new AppError('Cancelled requests cannot be updated', 403, 'FORBIDDEN');
        }

        const stamp = new Date().toISOString();
        const entry = `[${stamp}] ${note.trim()}`;
        const nextCustomerNotes = existing.customerNotes?.trim()
            ? `${existing.customerNotes.trim()}\n\n${entry}`
            : entry;

        const nextStatus = existing.status === RequestStatus.RESOLVED ? RequestStatus.IN_REVIEW : existing.status;

        return requestsRepository.updateById(requestId, {
            customerNotes: nextCustomerNotes,
            status: nextStatus
        });
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
