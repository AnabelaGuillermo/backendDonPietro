import express from 'express';
import { isAuthenticated } from '../../middlewares/isAuthenticated.js';
import { post_orderValidationSchema } from '../../helpers/validationSchemas/orderValidationsSchemas.js';
import { Orders } from '../../controllers/orders/index.js';
import { validateBody } from '../../middlewares/validateBody.js';
import { isAdmin } from '../../middlewares/isAdmin.js';

export const orderRouter = express.Router();

orderRouter.get(
  '/waiting',
  isAuthenticated,
  isAdmin,
  Orders.GetController.getWaitingPYOrders,
);

orderRouter.get(
  '/preparingorder',
  isAuthenticated,
  isAdmin,
  Orders.GetController.getPreparingOrders,
);

orderRouter.get(
  '/pendingdelivery',
  isAuthenticated,
  isAdmin,
  Orders.GetController.getPendingDOrders,
);

orderRouter.delete(
  '/:id',
  isAuthenticated,
  isAdmin,
  Orders.DeleteController.deleteOrder,
);

orderRouter.post(
  '/mercadopago',
  isAuthenticated,
  (req, res, next) => validateBody(req, res, next, post_orderValidationSchema),
  Orders.PostController.postOrderMP,
);

orderRouter.post(
  '/hand',
  isAuthenticated,
  (req, res, next) => validateBody(req, res, next, post_orderValidationSchema),
  Orders.PostController.postOrderHand,
);

orderRouter.patch(
  '/:id/waiting',
  isAuthenticated,
  isAdmin,
  Orders.StatusController.patchWaitingForPayment,
);

orderRouter.patch(
  '/:id/preparingorder',
  isAuthenticated,
  isAdmin,
  Orders.StatusController.patchPreparingOrder,
);

orderRouter.patch(
  '/:id/pendingdelivery',
  isAuthenticated,
  isAdmin,
  Orders.StatusController.patchPendingDelivery,
);
