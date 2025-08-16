import { Router } from 'express';
import genreRoutes from './genreRoutes';
import theaterRoutes from './theaterRoutes';

const adminRoutes = Router();

adminRoutes.use(genreRoutes);
adminRoutes.use(theaterRoutes);

export default adminRoutes;
