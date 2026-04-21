import type { ProviderStatus } from '../../utils/prismaEnums';

export type UpdateProviderMeInput = {
    bio?: string | null;
    profileImageUrl?: string | null;
    profileImagePublicId?: string | null;
};

export type VerifyProviderInput = {
    status: ProviderStatus;
};
