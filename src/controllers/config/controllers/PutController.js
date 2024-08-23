import { internalError } from '../../../helpers/helpers.js';
import ConfigModel from '../../../models/configSchema.js';

export class PutController {
  static async putConfig(req, res) {
    const { body } = req;

    try {
      const existingConfig = await ConfigModel.findOneAndUpdate(
        {},
        { text: body.text },
      );

      if (existingConfig) {
        res.status(200).json({
          data: null,
          message: 'Configuración actualizada',
        });
      } else {
        // Si no se encontró ninguna configuración, crea una nueva
        const newConfig = new ConfigModel({
          text: body.text,
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
