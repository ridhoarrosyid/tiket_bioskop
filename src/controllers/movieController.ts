import type { Request, Response } from 'express';
import Movie from '../models/Movie';
import { movieSchema } from '../utils/zodSchema';
import path from 'path';
import fs from 'fs';
import Genre from '../models/Genre';
import Theater from '../models/Theater';

export const getMovies = async (req: Request, res: Response) => {
  try {
    const movies = await Movie.find()
      .populate({
        path: 'genre',
        select: 'name',
      })
      .populate({
        path: 'theaters',
        select: 'name',
      });

    return res.json({
      message: 'Success to get data',
      status: 'success',
      data: movies,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: 'Failed to get data',
      status: 'failed',
      data: null,
    });
  }
};

export const getDetailMovie = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const movie = await Movie.findById(id)
      .populate({ path: 'theaters', select: 'name' })
      .populate({ path: 'genre', select: 'name' });
    if (!movie) {
      return res.status(404).json({
        message: 'Data not found',
        status: 'failed',
        data: null,
      });
    }
    return res.json({
      message: 'Success to get data',
      status: 'success',
      data: movie,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: 'Failed to get data',
      status: 'failed',
      data: null,
    });
  }
};

export const postMovie = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: 'Thumbnail is required',
        status: 'failed',
        data: 'null',
      });
    }
    const parse = movieSchema.safeParse({
      title: req.body.title,
      genre: req.body.genre,
      theaters: req.body.theaters.split(','),
      available: req.body.available === '1' ? true : false,
      description: req.body.description,
      price: Number.parseInt(req.body.price),
      bonus: req.body?.bonus,
    });

    if (!parse.success) {
      const errorMessages = parse.error.issues.map((err) => err.message);
      return res.status(400).json({
        message: 'Invalid request',
        status: 'failed',
        details: errorMessages,
      });
    }
    const movie = new Movie({
      title: parse.data.title,
      genre: parse.data.genre,
      theaters: parse.data.theaters,
      available: parse.data.available,
      thumbnail: req.file?.filename,
      description: parse.data.description,
      price: parse.data.price,
      bonus: parse.data.bonus,
    });

    await movie.save();

    return res.json({
      message: 'Success to create data',
      status: 'success',
      data: movie,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: 'Failed to create data',
      status: 'failed',
      data: null,
    });
  }
};

export const putMovie = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const parse = movieSchema.safeParse({
      title: req.body.title,
      genre: req.body.genre,
      theaters: req.body.theaters.split(','),
      available: req.body.available === '1' ? true : false,
      description: req.body.description,
      price: Number.parseInt(req.body.price),
      bonus: req.body?.bonus,
    });

    if (!parse.success) {
      const errorMessages = parse.error.issues.map((err) => err.message);
      return res.status(400).json({
        message: 'Invalid request',
        status: 'failed',
        details: errorMessages,
      });
    }

    const oldMovie = await Movie.findById(id);
    if (!oldMovie) {
      return res.status(404).json({
        message: 'Data not found',
        status: 'failed',
        data: null,
      });
    }

    if (req.file) {
      const dirname = path.resolve();
      const filepath = path.join(
        dirname,
        'public/uploads/thumbnails',
        oldMovie.thumbnail ?? ''
      );

      if (fs.existsSync(filepath)) {
        fs.unlinkSync(filepath);
      }
    }

    await Genre.findByIdAndUpdate(oldMovie.genre, {
      $pull: {
        movies: oldMovie._id,
      },
    });

    for (const theater of oldMovie.theaters) {
      await Theater.findByIdAndUpdate(theater, {
        $pull: {
          movies: oldMovie._id, //kayaknya oldMovie._id deh
        },
      });
    }

    await Movie.findByIdAndUpdate(oldMovie._id, {
      title: parse.data.title,
      genre: parse.data.genre,
      theaters: parse.data.theaters,
      available: parse.data.available,
      thumbnail: req.file ? req.file?.filename : oldMovie.thumbnail,
      description: parse.data.description,
      price: parse.data.price,
      bonus: parse.data.bonus,
    });

    await Genre.findByIdAndUpdate(parse.data.genre, {
      $push: {
        movies: id,
      },
    });

    for (const theater of parse.data.theaters) {
      await Theater.findByIdAndUpdate(theater, {
        $push: {
          movies: id, //kayaknya oldMovie._id deh
        },
      });
    }

    const updatedMovie = await Movie.findById(id);

    return res.json({
      message: 'Success to update data',
      status: 'success',
      data: updatedMovie,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: 'Failed to update data',
      status: 'failed',
      data: null,
    });
  }
};

export const deleteMovie = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const oldMovie = await Movie.findById(id);
    if (!oldMovie) {
      return res.status(404).json({
        message: 'Data not found',
        status: 'failed',
        data: null,
      });
    }
    const dirname = path.resolve();
    const filepath = path.join(
      dirname,
      'public/uploads/thumbnails',
      oldMovie.thumbnail ?? ''
    );
    if (fs.existsSync(filepath)) {
      fs.unlinkSync(filepath);
    }

    await Movie.findByIdAndDelete(id);
    return res.json({
      message: 'Success to delete data',
      status: 'success',
      data: oldMovie,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: 'Failed to delete data',
      status: 'failed',
      data: null,
    });
  }
};
