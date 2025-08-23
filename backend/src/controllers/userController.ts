import type { Request, Response } from 'express';
import User from '../models/User';
import WalletTransaction from '../models/WalletTransaction';
import Transaction from '../models/Transaction';

export const getCustormers = async (req: Request, res: Response) => {
  try {
    const customers = await User.find({ role: 'customer' }).select(
      'name email'
    );
    return res.json({
      message: 'Success to get data',
      status: 'success',
      data: customers,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      messaga: 'Failed get data',
      data: null,
      status: 'failed',
    });
  }
};

export const getWalletTransactions = async (req: Request, res: Response) => {
  try {
    const transactions = await WalletTransaction.find().populate({
      path: 'wallet',
      select: 'user -_id',
      populate: {
        path: 'user',
        select: 'name',
      },
    });
    return res.json({
      message: 'Success to get data',
      status: 'success',
      data: transactions,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      messaga: 'Failed get data',
      data: null,
      status: 'failed',
    });
  }
};

export const getTransactions = async (req: Request, res: Response) => {
  try {
    const transactions = await Transaction.find()
      .populate({
        path: 'user',
        select: 'name -_id',
      })
      .populate({
        path: 'movie',
        select: 'title -_id',
      })
      .populate({
        path: 'theater',
        select: 'name -_id',
      });
    return res.json({
      message: 'Success to get data',
      status: 'success',
      data: transactions,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      messaga: 'Failed get data',
      data: null,
      status: 'failed',
    });
  }
};
