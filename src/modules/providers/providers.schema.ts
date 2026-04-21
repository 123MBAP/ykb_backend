import { z } from 'zod';
import { ProviderStatus } from '../../utils/prismaEnums';

export const updateProviderMeSchema = z.object({
    body: z.object({
        bio: z.string().max(2000).nullable().optional(),
        profileImageUrl: z.string().url().nullable().optional(),
        profileImagePublicId: z.string().min(1).nullable().optional()
    })
});

export const verifyProviderSchema = z.object({
    params: z.object({
        providerId: z.string().min(1)
    }),
    body: z.object({
        status: z.nativeEnum(ProviderStatus).refine((s: ProviderStatus) => s !== ProviderStatus.PENDING, {
            message: 'Status must be APPROVED or REJECTED'
        })
    })
});
