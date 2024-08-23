import express from 'express';
import { isAuthenticated } from '../../middlewares/isAuthenticated.js';
import { isAdmin } from '../../middlewares/isAdmin.js';
import { OrdersHistorial } from '../../controllers/ordersHistorial/index.js';

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
