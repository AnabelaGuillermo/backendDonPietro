import HttpCodes from 'http-status-codes';
import ProductModel from '../../../models/productSchema.js';
import { internalError } from '../../../helpers/helpers.js';

export class DeleteController {
  static async deleteProduct(req, res) {
    const {
      params: { id },
    } = req;

    try {
      const action = await ProductModel.updateOne(
        {
          _id: id,
          isActive: true,
        },

        {
          isActive: false,
        },
      );

      if (action.matchedCount === 0) {
        res.status(HttpCodes.BAD_REQUEST).json({
          data: null,
          message: 'El producto indicado no fue encontrado',
        });
        return;
      }

      res.json({
        data: null,
        message: 'Producto eliminado correctamente',
      });
    } catch (e) {
      internalError(res, e, 'Ocurrió un error eliminando el recurso indicado');
    }
  }
}
