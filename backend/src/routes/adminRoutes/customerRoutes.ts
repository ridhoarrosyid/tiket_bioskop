import { Router } from 'express';
import {
  getCustormers,
  getTransactions,
  getWalletTransactions,
} from '../../controllers/userController';

const customerRoutes = Router();

customerRoutes.get('/customers', getCustormers);
customerRoutes.get('/wallet-transactions', getWalletTransactions);
customerRoutes.get('/ticket-transactions', getTransactions);

export default customerRoutes;
