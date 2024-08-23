import { internalError } from '../../../helpers/helpers.js';
import ConfigModel from '../../../models/configSchema.js';

export class GetController {
  static async getConfig(req, res) {
    try {
      // Suponiendo que estás buscando la configuración única en la colección
      const config = await ConfigModel.findOne({});

      if (config) {
        res.status(200).json({
          data: config,
          message: 'Configuración encontrada',
        });
      } else {
        res.status(404).json({
          data: null,
          message: 'Configuración no encontrada',
        });
      }
    } catch (e) {
      internalError(res, e, 'Ocurrió un error al obtener la configuración');
    }
  }
}
