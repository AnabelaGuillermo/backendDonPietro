import express from 'express';
import { isAuthenticated } from '../../middlewares/isAuthenticated.js';
import { isAdmin } from '../../middlewares/isAdmin.js';
import { Config } from '../../controllers/config/index.js';

export const configRouter = express.Router();

// GET
configRouter.get('/', isAuthenticated, isAdmin, Config.GetController.getConfig);

// PUT
configRouter.put('/', isAuthenticated, isAdmin, Config.PutController.putConfig);
