import express from 'express';

import { Products } from '../../controllers/products/index.js';
import { validateBody } from '../../middlewares/validateBody.js';
import { isAuthenticated } from '../../middlewares/isAuthenticated.js';
import { isAdmin } from '../../middlewares/isAdmin.js';
import { post_put_productValidationSchema } from '../../helpers/validationSchemas/productValidationSchemas.js';

export const productRouter = express.Router();

// GET ----------------------------
productRouter.get('/', Products.GetController.getProducts);
productRouter.get('/:id', Products.GetController.getProduct);

// POST ----------------------------
// /api/v1/products/
productRouter.post(
  '/',
  isAuthenticated,
  isAdmin,
  (req, res, next) =>
    validateBody(req, res, next, post_put_productValidationSchema),
  Products.PostController.postProduct,
);

// PUT ----------------------------
productRouter.put(
  '/:id',
  isAuthenticated,
  isAdmin,
  (req, res, next) =>
    validateBody(req, res, next, post_put_productValidationSchema),
  Products.PostController.postProduct,
);

// DELETE -------------------------
productRouter.delete(
  '/:id',
  isAuthenticated,
  isAdmin,
  Products.DeleteController.deleteProduct,
);
