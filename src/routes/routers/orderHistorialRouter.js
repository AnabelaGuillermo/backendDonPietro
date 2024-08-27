import express from 'express';

import { OrdersHistorial } from '../../controllers/ordersHistorial/index.js';

import { isAuthenticated } from '../../middlewares/isAuthenticated.js';

export const orderHistorialRouter = express.Router();

orderHistorialRouter.get(
  '/:id',
  isAuthenticated,
  OrdersHistorial.GetController.getOrderHistoralID,
);
