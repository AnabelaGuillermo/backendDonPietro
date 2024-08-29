import HttpCodes from 'http-status-codes';

import { internalError } from '../../../helpers/helpers.js';

import UserModel from '../../../models/userSchema.js';

export class DeleteController {
  static async deleteUser(req, res) {
    const {
      params: { id },
    } = req;

    try {
      const action = await UserModel.updateOne(
        {
          _id: id,
          isActive: true,
          superAdmin: false,
        },
        {
          isActive: false,
        },
      );

      if (action.matchedCount === 0) {
        res.status(HttpCodes.BAD_REQUEST).json({
          data: null,
          message: 'El usuario indicado no fue encontrado',
        });
        return;
      }

      res.json({
        data: null,
        message: 'Usuario eliminado correctamente',
      });
    } catch (e) {
      internalError(res, e, 'Ocurrio un error eliminando al usuario indicado');
    }
  }
}
