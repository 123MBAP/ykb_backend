import { z } from 'zod';
import { ProviderStatus, RequestStatus } from '../../utils/prismaEnums';

export const verifyProviderSchema = z.object({
    params: z.object({ providerId: z.string().min(1) }),
    body: z.object({
        status: z.nativeEnum(ProviderStatus).refine((s) => s !== ProviderStatus.PENDING, { message: 'Status must be APPROVED or REJECTED' })
    })
});

export const updateRequestSchema = z.object({
    params: z.object({ requestId: z.string().min(1) }),
    body: z.object({
        status: z.nativeEnum(RequestStatus),
        adminNotes: z.string().max(3000).nullable().optional()
    })
});
