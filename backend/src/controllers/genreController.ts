import type { Request, Response } from 'express';
import Genre from '../models/Genre';
import { genreSchema } from '../utils/zodSchema';

export const getGenres = async (req: Request, res: Response) => {
  try {
    const genres = await Genre.find();
    return res.json({
      data: genres,
      message: 'Success get data',
      status: 'success',
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      massage: 'Failed to get data',
      data: null,
      status: 'failed',
    });
  }
};

export const getGenreDetail = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const genre = await Genre.findById(id);
    return res.json({
      data: genre,
      message: 'Success get single data',
      status: 'success',
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      massage: 'Failed to get single data',
      data: null,
      status: 'failed',
    });
  }
};

export const postGenre = async (req: Request, res: Response) => {
  try {
    const body = genreSchema.parse(req.body);
    const genre = new Genre({
      name: body.name,
    });
    const newData = await genre.save();

    return res.json({
      message: 'Success created data',
      data: newData,
      status: 'success',
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      massage: 'Failed to create data',
      data: null,
      status: 'failed',
    });
  }
};

export const putGenre = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const body = genreSchema.parse(req.body);
    await Genre.findByIdAndUpdate(id, {
      name: body.name,
    });

    const updatedData = await Genre.findById(id);

    return res.json({
      message: 'Success updated data',
      data: updatedData,
      status: 'success',
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      massage: 'Failed to updated data',
      data: null,
      status: 'failed',
    });
  }
};

export const deleteGenre = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedData = await Genre.findById(id);
    await Genre.findByIdAndDelete(id);

    return res.json({
      message: 'Success deleted data',
      data: deletedData,
      status: 'success',
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      massage: 'Failed to delete data',
      data: null,
      status: 'failed',
    });
  }
};
