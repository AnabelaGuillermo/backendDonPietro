import express from 'express';
import { Users } from '../../controllers/users/index.js';
import { validateBody } from '../../middlewares/validateBody.js';
import { isAuthenticated } from '../../middlewares/isAuthenticated.js';
import { isAdmin } from '../../middlewares/isAdmin.js';
import { post_userValidationSchema } from '../../helpers/validationSchemas/usersValidationSchemas.js';
import { isAlreadyRegistered } from '../../middlewares/isAlreadyRegistered.js';

export const userRouter = express.Router();
// GET ----------------------------
userRouter.get('/', isAuthenticated, isAdmin, Users.GetController.getUsers);
// POST ----------------------------
// /api/v1/users/
userRouter.post(
  '/',
  isAlreadyRegistered,
  (req, res, next) => validateBody(req, res, next, post_userValidationSchema),
  Users.PostController.postUser,
);

// DELETE
userRouter.delete(
  '/:id',
  isAuthenticated,
  isAdmin,
  Users.DeleteController.deleteUser,
);

// ADMIN TOGGLE
userRouter.put(
  '/:id/toggle-admin',
  isAuthenticated,
  isAdmin,
  Users.AdminController.toggleAdminStatus,
);
