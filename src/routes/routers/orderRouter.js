import express from 'express';
import { isAuthenticated } from '../../middlewares/isAuthenticated.js';
import { post_orderValidationSchema } from '../../helpers/validationSchemas/orderValidationsSchemas.js';
import { Orders } from '../../controllers/orders/index.js';
import { validateBody } from '../../middlewares/validateBody.js';
import { isAdmin } from '../../middlewares/isAdmin.js';

export const orderRouter = express.Router();

// GET WAITING FOR PAYMENT
orderRouter.get(
  '/waiting',
  isAuthenticated,
  isAdmin,
  Orders.GetController.getWaitingPYOrders,
);

// GET PPREPARING ORDERS
orderRouter.get(
  '/preparing',
  isAuthenticated,
  isAdmin,
  Orders.GetController.getPreparingOrders,
);

// GET PPREPARING ORDERS
orderRouter.get(
  '/pending',
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
  '/mercadopago',
  isAuthenticated,
  (req, res, next) => validateBody(req, res, next, post_orderValidationSchema),
  Orders.PostController.postOrderHand,
);

// PATCH PENDING
orderRouter.patch(
  '/:id/pending',
  isAuthenticated,
  isAdmin,
  Orders.StatusController.patchOrderPending,
);

// PATCH DELIVERED
orderRouter.patch(
  '/:id/delivered',
  isAuthenticated,
  isAdmin,
  Orders.StatusController.patchOrderDelivered,
);

// PATCH COMPLETED
orderRouter.patch(
  '/:id/completed',
  isAuthenticated,
  isAdmin,
  Orders.StatusController.patchOrderCompleted,
);
