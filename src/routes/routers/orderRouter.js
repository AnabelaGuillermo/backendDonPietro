import express from 'express';
import { isAuthenticated } from '../../middlewares/isAuthenticated.js';
import { post_orderValidationSchema } from '../../helpers/validationSchemas/orderValidationsSchemas.js';
import { Orders } from '../../controllers/orders/index.js';
import { validateBody } from '../../middlewares/validateBody.js';
import { isAdmin } from '../../middlewares/isAdmin.js';

export const orderRouter = express.Router();

// GET WAITING PAYMENT
orderRouter.get(
  '/waiting',
  isAuthenticated,
  isAdmin,
  Orders.GetController.getWaitingPYOrders,
);

// GET PPREPARING ORDERS
orderRouter.get(
  '/preparingorder',
  isAuthenticated,
  isAdmin,
  Orders.GetController.getPreparingOrders,
);

// GET PENDING ORDERS
orderRouter.get(
  '/pendingdelivery',
  isAuthenticated,
  isAdmin,
  Orders.GetController.getPendingDOrders,
);

// DELETE
orderRouter.delete(
  '/:id',
  isAuthenticated,
  isAdmin,
  Orders.DeleteController.deleteOrder,
);

// POST MP
orderRouter.post(
  '/mercadopago',
  isAuthenticated,
  (req, res, next) => validateBody(req, res, next, post_orderValidationSchema),
  Orders.PostController.postOrderMP,
);

// POST HAND
orderRouter.post(
  '/hand',
  isAuthenticated,
  (req, res, next) => validateBody(req, res, next, post_orderValidationSchema),
  Orders.PostController.postOrderHand,
);

// PATCH WAITING PAYMENT
orderRouter.patch(
  '/:id/waiting',
  isAuthenticated,
  isAdmin,
  Orders.StatusController.patchWaitingForPayment,
);

// PATCH PREPARING
orderRouter.patch(
  '/:id/preparingorder',
  isAuthenticated,
  isAdmin,
  Orders.StatusController.patchPreparingOrder,
);

// PATCH DELIVERED
orderRouter.patch(
  '/:id/pendingdelivery',
  isAuthenticated,
  isAdmin,
  Orders.StatusController.patchPendingDelivery,
);
