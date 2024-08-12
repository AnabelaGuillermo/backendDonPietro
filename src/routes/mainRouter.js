import express from 'express';
import { productRouter } from './routers/productRouter.js';
import { userRouter } from './routers/userRouter.js';

export const mainRouter = express.Router();

mainRouter.use('/products', productRouter);
mainRouter.use('/users', userRouter);
