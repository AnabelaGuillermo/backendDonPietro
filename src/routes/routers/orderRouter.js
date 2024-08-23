import express from 'express';
import { isAuthenticated } from '../../middlewares/isAuthenticated.js';
import { post_orderValidationSchema } from '../../helpers/validationSchemas/orderValidationsSchemas.js';
import { Orders } from '../../controllers/orders/index.js';
import { validateBody } from '../../middlewares/validateBody.js';
import { isAdmin } from '../../middlewares/isAdmin.js';

export const orderRouter = express.Router();

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

// GET
orderRouter.get(
  '/pending',
  isAuthenticated,
  isAdmin,
  Orders.GetController.getPendingOrders,
);

// GET ID
orderRouter.get('/:id', isAuthenticated, Orders.GetController.getUserOrders);

// PATCH PENDING
orderRouter.post(
  '/:id/pending',
  isAuthenticated,
  Orders.StatusController.patchOrderPending,
);

// PATCH DELIVERED
orderRouter.post(
  '/:id/pending',
  isAuthenticated,
  Orders.StatusController.patchOrderDelivered,
);
