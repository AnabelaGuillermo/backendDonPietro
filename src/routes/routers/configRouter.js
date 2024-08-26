import express from 'express';
import { isAuthenticated } from '../../middlewares/isAuthenticated.js';
import { isAdmin } from '../../middlewares/isAdmin.js';
import { Config } from '../../controllers/config/index.js';
import { configValidationSchema } from '../../helpers/validationSchemas/configValidationSchemas.js';

export const configRouter = express.Router();

configRouter.get('/', Config.GetController.getConfig);

configRouter.put(
  '/',
  isAuthenticated,
  isAdmin,
  (req, res, next) => validateBody(req, res, next, configValidationSchema),
  Config.PutController.putConfig,
);
