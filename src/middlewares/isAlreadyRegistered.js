import HttpCodes from 'http-status-codes';

import { internalError } from '../helpers/helpers.js';

import UsersModel from '../models/userSchema.js';

export const isAlreadyRegistered = async (req, res, next) => {
  const { email } = req.body;

  try {
    const user = await UsersModel.findOne({ email });

    if (user) {
      res.status(HttpCodes.CONFLICT).json({
        data: null,
        message: 'El correo electrónico ya está registrado',
      });
      return;
    }

    next();
  } catch (e) {
    internalError(
      res,
      e,
      'Ocurrió un Error al verificar el correo electrónico',
    );
  }
};
