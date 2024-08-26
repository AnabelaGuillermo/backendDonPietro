import { internalError } from '../../../helpers/helpers.js';

import ConfigModel from '../../../models/configSchema.js';

export class PutController {
  static async putConfig(req, res) {
    const { body } = req;

    try {
      const existingConfig = await ConfigModel.findOneAndUpdate(
        {},
        { $set: { cantidadMesas: body.cantidadMesas } },
        { new: true, upsert: true },
      );

      if (existingConfig) {
        res.status(200).json({
          data: null,
          message: 'Configuración actualizada',
        });
      } else {
        const newConfig = new ConfigModel({
          text: body,
        });

        await newConfig.save();

        res.status(201).json({
          data: null,
          message: 'Configuración creada',
        });
      }
    } catch (e) {
      internalError(res, e, 'Ocurrió un error');
    }
  }
}
