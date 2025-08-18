import { Router } from 'express';
import {
  deleteMovie,
  getDetailMovie,
  getMovies,
  postMovie,
  putMovie,
} from '../../controllers/movieController';
import multer from 'multer';
import { imageFilter, thumbnailStorage } from '../../utils/multer';

const upload = multer({ storage: thumbnailStorage(), fileFilter: imageFilter });

const movieRoutes = Router();

movieRoutes.get('/movies', getMovies);
movieRoutes.get('/movies/:id', getDetailMovie);
movieRoutes.post('/movies', upload.single('thumbnail'), postMovie);
movieRoutes.put('/movies/:id', upload.single('thumbnail'), putMovie);
movieRoutes.delete('/movies/:id', deleteMovie);

export default movieRoutes;
