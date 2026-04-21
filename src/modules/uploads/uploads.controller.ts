import type { Request, Response } from 'express';
import { asyncHandler } from '../../utils/asyncHandler';
import { uploadsService } from './uploads.service';

export const uploadsController = {
    uploadProviderProfileImage: asyncHandler(async (req: Request, res: Response) => {
        const upload = await uploadsService.uploadImage(req.file, 'you-kigali-bestie/providers');
        res.status(201).json({ upload });
    }),

    uploadServiceImage: asyncHandler(async (req: Request, res: Response) => {
        const upload = await uploadsService.uploadImage(req.file, 'you-kigali-bestie/services');
        res.status(201).json({ upload });
    })
};
