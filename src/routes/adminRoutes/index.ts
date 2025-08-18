import { Router } from 'express';
import genreRoutes from './genreRoutes';
import theaterRoutes from './theaterRoutes';
import movieRoutes from './movieRoutes';
import customerRoutes from './customerRoutes';

const adminRoutes = Router();

adminRoutes.use(genreRoutes);
adminRoutes.use(theaterRoutes);
adminRoutes.use(movieRoutes);
adminRoutes.use(customerRoutes);

export default adminRoutes;
