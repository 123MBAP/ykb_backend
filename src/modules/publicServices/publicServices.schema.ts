import { z } from 'zod';

export const createPublicServiceSchema = z.object({
    body: z.object({
        title: z.string().min(1),
        description: z.string().min(1)
    })
});

export const publicServiceIdSchema = z.object({
    params: z.object({
        id: z.coerce.number().int().positive()
    })
});

export const updatePublicServiceSchema = z.object({
    params: publicServiceIdSchema.shape.params,
    body: z
        .object({
            title: z.string().min(1).optional(),
            description: z.string().min(1).optional()
        })
        .refine((val) => Object.keys(val).length > 0, { message: 'At least one field is required' })
});
