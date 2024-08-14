import express from 'express';

import { Auth } from '../../controllers/auth/index.js';
import { validateBody } from '../../middlewares/validateBody.js';
import { post_loginValidationSchema } from '../../helpers/validationSchemas/authValidationSchemas.js';

export const authRouter = express.Router();

authRouter.post(
  '/login',
  (req, res, next) => validateBody(req, res, next, post_loginValidationSchema),
  Auth.PostController.postLogin,
);
