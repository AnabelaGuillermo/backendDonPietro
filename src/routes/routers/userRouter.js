import express from 'express';

import { Users } from '../../controllers/users/index.js';

import { isAuthenticated } from '../../middlewares/isAuthenticated.js';
import { isAdmin } from '../../middlewares/isAdmin.js';
import { isAlreadyRegistered } from '../../middlewares/isAlreadyRegistered.js';
import { validateBody } from '../../middlewares/validateBody.js';

import { post_userValidationSchema } from '../../helpers/validationSchemas/usersValidationSchemas.js';

export const userRouter = express.Router();

userRouter.get('/', isAuthenticated, isAdmin, Users.GetController.getUsers);

userRouter.post(
  '/',
  isAlreadyRegistered,
  (req, res, next) => validateBody(req, res, next, post_userValidationSchema),
  Users.PostController.postUser,
);

userRouter.delete(
  '/:id',
  isAuthenticated,
  isAdmin,
  Users.DeleteController.deleteUser,
);

userRouter.put(
  '/:id/toggle-admin',
  isAuthenticated,
  isAdmin,
  Users.AdminController.toggleAdminStatus,
);
