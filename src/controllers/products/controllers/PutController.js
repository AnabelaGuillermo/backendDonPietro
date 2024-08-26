import HttpCodes from 'http-status-codes';

import { internalError } from '../../../helpers/helpers.js';

import ProductModel from '../../../models/productSchema.js';

export class PutController {
  static async putProduct(req, res) {
    const {
      body,
      params: { id },
    } = req;

    try {
      const action = await ProductModel.updateOne(
        {
          _id: id,
          isActive: true,
        },
        body,
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
        message: 'Producto actualizado correctamente',
      });
    } catch (e) {
      internalError(
        res,
        e,
        'Ocurrió un error actualizando el recurso indicado',
      );
    }
  }
}
