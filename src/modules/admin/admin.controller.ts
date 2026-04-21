import type { Request, Response } from 'express';
import { asyncHandler } from '../../utils/asyncHandler';
import { adminService } from './admin.service';

export const adminController = {
    listBookings: asyncHandler(async (_req: Request, res: Response) => {
        const bookings = await adminService.listBookings();
        res.status(200).json({ bookings });
    }),

    listPayments: asyncHandler(async (_req: Request, res: Response) => {
        const payments = await adminService.listPayments();
        res.status(200).json({ payments });
    }),

    listRequests: asyncHandler(async (_req: Request, res: Response) => {
        const requests = await adminService.listRequests();
        res.status(200).json({ requests });
    }),

    verifyProvider: asyncHandler(async (req: Request, res: Response) => {
        const providerId = req.validated?.params?.providerId;
        const status = req.validated?.body?.status;
        const provider = await adminService.verifyProvider(providerId, status);
        res.status(200).json({ provider });
    }),

    updateRequest: asyncHandler(async (req: Request, res: Response) => {
        const requestId = req.validated?.params?.requestId;
        const status = req.validated?.body?.status;
        const adminNotes = req.validated?.body?.adminNotes;
        const request = await adminService.updateRequest(requestId, status, adminNotes);
        res.status(200).json({ request });
    })
};
