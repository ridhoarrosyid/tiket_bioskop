import { Router } from 'express';
import genreRoutes from './genreRoutes';
import theaterRoutes from './theaterRoutes';
import movieRoutes from './movieRoutes';

const adminRoutes = Router();

adminRoutes.use(genreRoutes);
adminRoutes.use(theaterRoutes);
adminRoutes.use(movieRoutes);

export default adminRoutes;
