import { internalError } from '../../../helpers/helpers.js';
import ConfigModel from '../../../models/configSchema.js';

export class PutController {
  static async putConfig(req, res) {
    const { body } = req;
    console.log(body);

    try {
      const existingConfig = await ConfigModel.findOneAndUpdate(
        {}, // Filtro para seleccionar el documento a actualizar
        { $set: { cantidadMesas: body.cantidadMesas } }, // Actualiza el campo cantidadMesas con el valor en body
        { new: true, upsert: true }, // Retorna el documento actualizado, o lo crea si no existe
      );

      if (existingConfig) {
        console.log(existingConfig);
        res.status(200).json({
          data: null,
          message: 'Configuración actualizada',
        });
      } else {
        // Si no se encontró ninguna configuración, crea una nueva
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
