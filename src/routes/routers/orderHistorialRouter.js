import express from 'express';
import { isAuthenticated } from '../../middlewares/isAuthenticated';
import { isAdmin } from '../../middlewares/isAdmin';
import { OrdersHistorial } from '../../controllers/ordersHistorial';

export const orderHistorialRouter = express.Router();

// GET HISTORIAL
orderHistorialRouter.get(
  '/',
  isAuthenticated,
  isAdmin,
  OrdersHistorial.GetController.getOrdersHistorial,
);

// GET ID HISTORIAL
orderHistorialRouter.get(
  '/:id',
  isAuthenticated,
  OrdersHistorial.GetController.getOrderHistoralID,
);
