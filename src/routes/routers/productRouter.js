import express from 'express';

import { Products } from '../../controllers/products/index.js';

export const productRouter = express.Router();

// GET ----------------------------
productRouter.get('/', Products.GetController.getProducts);
productRouter.get('/:id', Products.GetController.getProduct);

// POST ----------------------------
// /api/v1/products/
productRouter.post('/', Products.PostController.postProduct);

// PUT ----------------------------
productRouter.put('/:id', Products.PutController.putProduct);

// DELETE -------------------------
productRouter.delete('/:id', Products.DeleteController.deleteProduct);
