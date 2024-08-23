import express from 'express';
import { isAuthenticated } from '../../middlewares/isAuthenticated';
import { isAdmin } from '../../middlewares/isAdmin';
import { Config } from '../../controllers/config';

export const configRouter = express.Router();

// GET
configRouter.get(
  '/config',
  isAuthenticated,
  isAdmin,
  Config.GetController.getConfig,
);

// PUT
configRouter.put(
  'config',
  isAuthenticated,
  isAdmin,
  Config.PutController.putConfig,
);
