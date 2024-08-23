import { DeleteController } from './controllers/DeleteController.js';
import { GetController } from './controllers/GetController.js';
import { PostController } from './controllers/PostController.js';
import { AdminController } from './controllers/AdminController.js';
import { PasswordController } from './controllers/PasswordController.js';

export const Users = {
  GetController,
  PostController,
  DeleteController,
  AdminController,
  PasswordController,
};
