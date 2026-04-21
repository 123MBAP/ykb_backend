import type { ProviderStatus, RequestStatus } from '../../utils/prismaEnums';

export type VerifyProviderInput = {
    status: ProviderStatus;
};

export type UpdateRequestInput = {
    status: RequestStatus;
    adminNotes?: string | null;
};
