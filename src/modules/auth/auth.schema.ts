import { z } from 'zod';
import { Role } from '../../utils/prismaEnums';

export const registerSchema = z.object({
    body: z.object({
        email: z.string().email(),
        phone: z.string().min(6).max(32).optional(),
        name: z.string().min(2).max(120),
        password: z.string().min(8).max(200),
        role: z.enum([Role.CUSTOMER, Role.PROVIDER]).optional()
    })
});

export const loginSchema = z.object({
    body: z.object({
        email: z.string().email(),
        password: z.string().min(8).max(200)
    })
});
