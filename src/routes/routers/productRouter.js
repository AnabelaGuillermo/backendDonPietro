import express from 'express';

import { Products } from '../../controllers/products/index.js';
import { validateBody } from '../../middlewares/validateBody.js';
import { isAuthenticated } from '../../middlewares/isAuthenticated.js';
import { isAdmin } from '../../middlewares/isAdmin.js';
import { post_put_productValidationSchema } from '../../helpers/validationSchemas/productValidationSchemas.js';
import { isAlreadyCharged } from '../../middlewares/isAlreadyCharged.js';

export const productRouter = express.Router();

productRouter.get('/', Products.GetController.getProducts);
productRouter.get('/:id', Products.GetController.getProduct);

productRouter.post(
  '/',
  isAuthenticated,
  isAdmin,
  isAlreadyCharged,
  (req, res, next) =>
    validateBody(req, res, next, post_put_productValidationSchema),
  Products.PostController.postProduct,
);

productRouter.put(
  '/:id',
  isAuthenticated,
  isAdmin,
  (req, res, next) =>
    validateBody(req, res, next, post_put_productValidationSchema),
  Products.PutController.putProduct,
);

productRouter.delete(
  '/:id',
  isAuthenticated,
  isAdmin,
  Products.DeleteController.deleteProduct,
);
