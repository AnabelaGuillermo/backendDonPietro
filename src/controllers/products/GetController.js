import HttpCodes from 'http-status-codes';
import ProductModel from '../../../models/productSchema.js';
import { internalError } from '../../../helpers/helpers.js';

export class GetController {
  static async getProducts(req, res) {
    try {
      const products = await ProductModel.find();
      res.status(HttpCodes.OK).json({
        data: products,
        message: 'Productos obtenidos exitosamente',
      });
    } catch (e) {
      internalError(res, e, 'Ocurrió un error obteniendo los productos');
    }
  }

  static async getProduct(req, res) {
    const { id } = req.params;

    try {
      const product = await ProductModel.findById(id);
      if (!product) {
        res.status(HttpCodes.NOT_FOUND).json({
          data: null,
          message: 'Producto no encontrado',
        });
        return;
      }

      res.status(HttpCodes.OK).json({
        data: product,
        message: 'Producto obtenido exitosamente',
      });
    } catch (e) {
      internalError(res, e, 'Ocurrió un error obteniendo el producto');
    }
  }
}