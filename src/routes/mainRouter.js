import express from 'express';
import { productRouter } from './routers/productRouter.js';
import { userRouter } from './routers/userRouter.js';
import { authRouter } from './routers/authRouter.js';
import { orderRouter } from './routers/orderRouter.js';
import { orderHistorialRouter } from './routers/orderHistorialRouter.js';
import { configRouter } from './routers/configRouter.js';

export const mainRouter = express.Router();

mainRouter.use('/products', productRouter);
mainRouter.use('/users', userRouter);
mainRouter.use('/auth', authRouter);
mainRouter.use('/order', orderRouter);
mainRouter.use('/orderhistorial', orderHistorialRouter);
mainRouter.use('/config', configRouter);
