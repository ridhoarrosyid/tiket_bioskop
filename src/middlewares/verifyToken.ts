import type { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import type { customRequest } from '../types/Request';

type JWTPayload = {
  data: { id: string };
};

export const verifyToken = async (
  req: customRequest,
  res: Response,
  next: NextFunction
) => {
  const secretKey = process.env.SECRET_KEY ?? '';
  if (req.headers?.authorization?.split(' ')[0] === 'JWT') {
    const token = req.headers?.authorization?.split(' ')[1];
    const decoded = jwt.verify(token, secretKey) as JWTPayload;

    const user = await User.findById(decoded.data.id);
    if (!user) {
      return res.status(401).json({
        message: 'token invalid',
      });
    }

    req.user = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    next();
  } else {
    return res.status(401).json({
      message: 'Unauthorized',
    });
  }
};

export const verifyRole =
  (type: 'admin' | 'customer') =>
  async (req: customRequest, res: Response, next: NextFunction) => {
    if (req?.user?.role === type) {
      next();
      return;
    }
    return res.status(401).json({
      message: 'Unauthorized',
    });
  };
