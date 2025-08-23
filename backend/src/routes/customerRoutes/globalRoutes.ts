import { Router } from 'express';
import {
  getAvailableSeats,
  getGenres,
  getMovieDetail,
  getMovies,
  getMoviesFilter,
} from '../../controllers/globalController';
import { validateRequest } from '../../middlewares/validateRequest';
import { transactionSchema } from '../../utils/zodSchema';
import {
  getOrder,
  getOrderDetail,
  transactionTicket,
} from '../../controllers/ticketController';

const globalRoutes = Router();

globalRoutes.get('/movies', getMovies);
globalRoutes.get('/genres', getGenres);
globalRoutes.get('/movies/:id', getMovieDetail);
globalRoutes.get('/check-seats/:movieId', getAvailableSeats);
globalRoutes.get('/browse-movies/:genreId', getMoviesFilter);
globalRoutes.post(
  '/transaction/buy',
  validateRequest(transactionSchema),
  transactionTicket
);
globalRoutes.get('/orders', getOrder);
globalRoutes.get('/orders/:id', getOrderDetail);

export default globalRoutes;
