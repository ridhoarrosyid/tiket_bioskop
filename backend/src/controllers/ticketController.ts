import type { Response } from 'express';
import type { customRequest } from '../types/Request';
import { transactionSchema } from '../utils/zodSchema';
import Wallet from '../models/Wallet';
import Transaction from '../models/Transaction';
import TransactionSeat from '../models/TransactionSeat';

export const transactionTicket = async (req: customRequest, res: Response) => {
  try {
    const parse = transactionSchema.parse(req.body);
    const wallet = await Wallet.findOne({ user: req.user?.id });

    if (!wallet || (wallet && wallet.balance < parse.total)) {
      return res.status(400).json({
        status: 'failed',
        message: 'insufficient balance, please topup your balance first',
        data: null,
      });
    }

    const transaction = new Transaction({
      bookingFee: parse.bookingFee,
      total: parse.total,
      subtotal: parse.subtotal,
      tax: parse.tax,
      movie: parse.movieId,
      theater: parse.theaterId,
      user: req.user?.id,
      date: parse.date,
    });

    for (const seat of parse.seats) {
      const newSeat = new TransactionSeat({
        transaction: transaction._id,
        seat: seat,
      });
      await newSeat.save();
    }
    const transactionSeats = await TransactionSeat.find({
      transaction: transaction._id,
    });
    transaction.seats = transactionSeats.map(
      (transactionSeat) => transactionSeat._id
    );

    const currentBalance = wallet.balance ?? 0;
    await Wallet.findByIdAndUpdate(wallet.id, {
      balance: currentBalance - parse.total,
    });
    await transaction.save();

    return res.json({
      message: 'success transaction ticket',
      status: 'success',
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      messaga: 'Failed to transaction ticket',
      data: null,
      status: 'failed',
    });
  }
};

export const getOrder = async (req: customRequest, res: Response) => {
  try {
    const transactions = await Transaction.find({ user: req.user?.id })
      .select('seats movie theater date status')
      .populate({
        path: 'movie',
        select: 'thumbnail title genre -_id',
        populate: {
          path: 'genre',
          select: 'name -_id',
        },
      })
      .populate({
        path: 'theater',
        select: 'name city -_id',
      })
      .populate({
        path: 'seats',
        select: 'seat -_id',
      });
    return res.json({
      message: 'success to get Data',
      data: transactions,
      status: 'success',
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      messaga: 'Failed to transaction ticket',
      data: null,
      status: 'failed',
    });
  }
};

export const getOrderDetail = async (req: customRequest, res: Response) => {
  try {
    const { id } = req.params;
    const transaction = await Transaction.findById(id)
      .select('seats movie theater date status')
      .populate({
        path: 'movie',
        select: 'thumbnail title genre -_id',
        populate: {
          path: 'genre',
          select: 'name -_id',
        },
      })
      .populate({
        path: 'theater',
        select: 'name city -_id',
      })
      .populate({
        path: 'seats',
        select: 'seat -_id',
      });
    return res.json({
      message: 'success to get Data',
      data: transaction,
      status: 'success',
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      messaga: 'Failed to transaction ticket',
      data: null,
      status: 'failed',
    });
  }
};
