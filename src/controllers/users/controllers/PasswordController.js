import HttpCodes from 'http-status-codes';
import bcryptjs from 'bcryptjs';
import UserModel from '../../../models/userSchema.js';
import { internalError } from '../../../helpers/helpers.js';

export class PasswordController {
  static async passwordChange(req, res) {
    const {
      params: { id },
      body,
    } = req;
    const newPasswordValue = bcryptjs.hashSync(body.password, 10);

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

      if (user.password === newPasswordValue) {
        res.status(HttpCodes.BAD_REQUEST).json({
          data: null,
          message:
            'La nueva contraseña no puede ser la misma que la contraseña actual. Por favor, elige una contraseña diferente para continuar',
        });
        return;
      }

      const action = await UserModel.updateOne(
        {
          _id: id,
          isActive: true,
        },
        { password: newPasswordValue },
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
        message: 'Contraseña actualizada correctamente',
      });
    } catch (e) {
      internalError(
        res,
        e,
        'Ocurrio un error actualizando la contraseña del usuario indicado',
      );
    }
  }
}
