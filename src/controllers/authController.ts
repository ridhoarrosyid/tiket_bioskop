import type { Request, Response } from 'express';
import { authSchema } from '../utils/zodSchema';
import User from '../models/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Wallet from '../models/Wallet';

export const login = async (req: Request, res: Response) => {
  try {
    const parse = authSchema.omit({ name: true }).parse(req.body);

    const checkUser = await User.findOne({
      email: parse.email,
      role: parse.role,
    });

    if (!checkUser) {
      return res.status(400).json({
        message: 'Email is not registered',
        status: 'failed',
        data: null,
      });
    }

    const comparePassword = bcrypt.compareSync(
      parse.password,
      checkUser.password
    );

    if (!comparePassword) {
      return res.status(400).json({
        message: 'Email/Password incorrect',
        status: 'failed',
        data: null,
      });
    }

    const secretKey = process.env.SECRET_KEY ?? '';
    const token = jwt.sign(
      {
        data: {
          id: checkUser.id,
        },
      },
      secretKey,
      { expiresIn: '24h' }
    );

    return res.json({
      message: 'Success login',
      data: {
        name: checkUser.name,
        email: checkUser.email,
        role: checkUser.email,
        photoUrl: checkUser.photoUrl,
        token,
      },
      status: 'success',
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Failet to login',
      status: 'failed',
      data: null,
    });
  }
};

export const register = async (req: Request, res: Response) => {
  try {
    const parse = authSchema.omit({ role: true }).safeParse(req.body);

    if (!parse.success) {
      const errorMessages = parse.error.issues.map((err) => err.message);
      return res.status(400).json({
        message: 'Invalid Request',
        data: errorMessages,
        status: 'failed',
      });
    }

    const existEmail = await User.findOne({ email: parse.data.email });
    if (existEmail) {
      return res.status(400).json({
        message: 'Email Already Exists',
        data: null,
        status: 'failed',
      });
    }

    const hashPassword = bcrypt.hashSync(parse.data.password, 12);
    const user = new User({
      name: parse.data.name,
      email: parse.data.email,
      password: hashPassword,
      role: 'customer',
      photo: req.file?.filename,
    });

    const wallet = new Wallet({
      balance: 0,
      user: user._id,
    });

    await user.save();
    await wallet.save();

    return res.json({
      message: 'Success sign up',
      data: {
        name: user.name,
        email: user.email,
      },
      status: 'success',
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Failet to register',
      status: 'failed',
      data: null,
    });
  }
};
