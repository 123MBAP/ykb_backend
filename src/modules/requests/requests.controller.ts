import type { Request, Response } from 'express';
import { asyncHandler } from '../../utils/asyncHandler';
import { requestsService } from './requests.service';

export const requestsController = {
    create: asyncHandler(async (req: Request, res: Response) => {
        const body = req.validated?.body;
        const request = await requestsService.create(req.auth!, body);
        res.status(201).json({ request });
    }),

    listMine: asyncHandler(async (req: Request, res: Response) => {
        const requests = await requestsService.listMine(req.auth!);
        res.status(200).json({ requests });
    })
};
