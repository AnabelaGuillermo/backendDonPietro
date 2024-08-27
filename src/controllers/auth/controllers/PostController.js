import HttpCodes from 'http-status-codes';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { internalError } from '../../../helpers/helpers.js';

import UserModel from '../../../models/userSchema.js';

export class PostController {
  static async postLogin(req, res) {
    const { body } = req;

    try {
      const user = await UserModel.findOne({
        email: body.email,
        isActive: true,
      });

      if (!user || !bcryptjs.compareSync(body.password, user.password)) {
        res.status(HttpCodes.UNAUTHORIZED).json({
          data: null,
          message: 'Usuario y/o contraseña incorrectos',
        });
        return;
      }

      const userInfo = {
        user: {
          id: user._doc._id,
          fullname: user._doc.fullname,
          email: user._doc.email,
          isAdmin: user._doc.isAdmin,
        },
      };

      const token = jwt.sign(userInfo, process.env.SECRET_KEY, {
        expiresIn: '8h',
      });

      res.json({
        data: token,
        message: 'Logueo exitoso',
      });
    } catch (e) {
      internalError(res, e, 'Ocurrió un error intentando iniciar sesión');
    }
  }
}
