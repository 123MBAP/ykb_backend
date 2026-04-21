import type { User } from '@prisma/client';
import type { Role } from '../../utils/prismaEnums';

export type SafeUser = Omit<User, 'passwordHash'>;

export type AuthResult = {
    user: SafeUser;
    accessToken: string;
};

export type RegisterInput = {
    email: string;
    phone?: string;
    name: string;
    password: string;
    role?: Exclude<Role, 'ADMIN'>;
};

export type LoginInput = {
    email: string;
    password: string;
};
