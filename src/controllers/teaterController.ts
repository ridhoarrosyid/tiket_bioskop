import type { Request, Response } from 'express';
import Theater from '../models/Theater';
import { theaterSchema } from '../utils/zodSchema';

export const getTheaters = async (req: Request, res: Response) => {
  try {
    const theaters = await Theater.find();
    return res.json({
      data: theaters,
      message: 'Success get data',
      status: 'success',
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      messaga: 'Failed get data',
      data: null,
      status: 'failed',
    });
  }
};

export const getTheaterDetail = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const theater = await Theater.findById(id);
    return res.json({
      data: theater,
      message: 'Success get detail data',
      status: 'success',
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: 'Fail get detail data',
      data: null,
      status: 'failed',
    });
  }
};

export const postTheater = async (req: Request, res: Response) => {
  try {
    const body = theaterSchema.parse(req.body);
    const theater = new Theater({
      name: body.name,
      city: body.city,
    });
    const newData = await theater.save();
    return res.json({
      message: 'Success create data',
      data: newData,
      status: 'success',
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: 'Failed create data',
      data: null,
      status: 'failed',
    });
  }
};

export const putTheater = async (req: Request, res: Response) => {
  try {
    const body = theaterSchema.parse(req.body);
    const { id } = req.params;
    await Theater.findByIdAndUpdate(id, {
      name: body.name,
      city: body.city,
    });
    const updatedData = await Theater.findById(id);
    return res.json({
      message: 'Success update data',
      data: updatedData,
      status: 'success',
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: 'Failed update data',
      data: null,
      status: 'failed',
    });
  }
};

export const deleteTheater = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedData = await Theater.findById(id);
    await Theater.findByIdAndDelete(id);
    return res.json({
      message: 'Success delete data',
      data: deletedData,
      status: 'success',
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Failed delete data',
      data: null,
      status: 'failde',
    });
  }
};
