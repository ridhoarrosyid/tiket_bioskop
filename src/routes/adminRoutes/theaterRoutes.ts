import { Router } from 'express';
import {
  deleteTheater,
  getTheaterDetail,
  getTheaters,
  postTheater,
  putTheater,
} from '../../controllers/teaterController';
import { validateRequest } from '../../middlewares/validateRequest';
import { theaterSchema } from '../../utils/zodSchema';

const theaterRoutes = Router();

theaterRoutes.get('/theaters', getTheaters);
theaterRoutes.get('/theaters/:id', getTheaterDetail);
theaterRoutes.post('/theaters', validateRequest(theaterSchema), postTheater);
theaterRoutes.put('/theaters/:id', validateRequest(theaterSchema), putTheater);
theaterRoutes.delete('/theaters/:id', deleteTheater);

export default theaterRoutes;
