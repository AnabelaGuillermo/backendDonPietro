import HttpCodes from 'http-status-codes';

import { internalError } from '../../../helpers/helpers.js';

import UserModel from '../../../models/userSchema.js';

export class AdminController {
  static async toggleAdminStatus(req, res) {
    const {
      params: { id },
    } = req;

    try {
      const user = await UserModel.findOne({
        _id: id,
        isActive: true,
      });

      if (!user) {
        res.status(HttpCodes.BAD_REQUEST).json({
          data: null,
          message: 'El usuario indicado no fue encontrado',
        });
        return;
      }

      const newIsAdminValue = !user.isAdmin;

      const action = await UserModel.updateOne(
        {
          _id: id,
          isActive: true,
        },
        { isAdmin: newIsAdminValue },
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
        message: 'Usuario actualizado correctamente',
      });
    } catch (e) {
      internalError(
        res,
        e,
        'Ocurrio un error actualizando al usuario indicado',
      );
    }
  }
}
