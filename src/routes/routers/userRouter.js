import express from 'express';
import { Users } from '../../controllers/users/index.js';

export const userRouter = express.Router();
// GET ----------------------------
userRouter.get('/', Users.GetController.getUsers);
// POST ----------------------------
// /api/v1/users/
userRouter.post('/', Users.PostController.postUser);
