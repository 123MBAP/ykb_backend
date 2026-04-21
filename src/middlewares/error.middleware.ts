import type { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';
import { AppError } from '../utils/appError';
import { Prisma } from '@prisma/client';

const isPrismaKnownError = (err: unknown): err is Prisma.PrismaClientKnownRequestError => {
    return err instanceof Prisma.PrismaClientKnownRequestError;
};

export const errorHandler = (err: unknown, _req: Request, res: Response, _next: NextFunction) => {
    if (err instanceof ZodError) {
        return res.status(400).json({
            error: {
                code: 'VALIDATION_ERROR',
                message: 'Validation failed',
                details: err.flatten()
            }
        });
    }

    if (isPrismaKnownError(err)) {
        if (err.code === 'P2002') {
            return res.status(409).json({
                error: {
                    code: 'CONFLICT',
                    message: 'Unique constraint violation',
                    details: err.meta
                }
            });
        }

        return res.status(400).json({
            error: {
                code: 'DB_ERROR',
                message: err.message
            }
        });
    }

    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            error: {
                code: err.code,
                message: err.message
            }
        });
    }

    return res.status(500).json({
        error: {
            code: 'INTERNAL_ERROR',
            message: 'Something went wrong'
        }
    });
};
