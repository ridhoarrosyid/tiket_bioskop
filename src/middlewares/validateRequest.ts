import { NextFunction, Request, Response } from 'express';
import z, { ZodError } from 'zod';

export const validateRequest =
  (schema: z.AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (e) {
      if (e instanceof ZodError) {
        const errorMessage = e.issues.map((err) => err.message);
        console.log(e);
        return res.status(500).json({
          error: 'Invalid request',
          details: errorMessage,
        });
      }
      return res.status(400).json({ error: 'Bad request' });
    }
  };
