import { Router } from 'express';
import genreRoutes from './genreRoutes';

const adminRoutes = Router();

adminRoutes.use(genreRoutes);

export default adminRoutes;
