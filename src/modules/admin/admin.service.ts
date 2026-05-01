import type { ProviderStatus, RequestStatus } from '../../utils/prismaEnums';
import { adminRepository } from './admin.repository';

export const adminService = {
    listBookings: async () => adminRepository.listBookings(),
    listPayments: async () => adminRepository.listPayments(),
    listRequests: async () => adminRepository.listRequests(),
	listProviders: async () => adminRepository.listProviders(),
	getProviderById: async (providerId: string) => adminRepository.getProviderById(providerId),
    verifyProvider: async (providerId: string, status: ProviderStatus) => adminRepository.updateProviderStatus(providerId, status),
    updateRequest: async (requestId: string, status: RequestStatus, adminNotes?: string | null) =>
        adminRepository.updateRequest(requestId, { status, adminNotes })
};
