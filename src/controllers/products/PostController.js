import HttpCodes from 'http-status-codes';
import ProductModel from '../../../models/productSchema.js';
import { internalError } from '../../../helpers/helpers.js';

export class PostController {
  static async postProduct(req, res) {
    const { body } = req;

    try {
      const product = new ProductModel(body);
      await product.save();

      res.status(HttpCodes.CREATED).json({
        data: product,
        message: 'Producto creado exitosamente',
      });
    } catch (e) {
      internalError(res, e, 'Ocurrió un error creando el producto');
    }
  }
}