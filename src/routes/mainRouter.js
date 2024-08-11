import express from 'express';
import { productRouter } from './routers/productRouter.js';

export const mainRouter = express.Router();

mainRouter.use('/products', productRouter);
