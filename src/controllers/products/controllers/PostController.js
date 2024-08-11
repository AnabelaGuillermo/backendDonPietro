import HttpCodes from 'http-status-codes';
import ProductModel from '../../../models/productSchema.js';
import { internalError } from '../../../helpers/helpers.js';

export class PostController {
  static async postProduct(req, res) {
    const { body } = req;

    const newProduct = new ProductModel({
      name: body.name,
      description: body.description,
      imageUrl: body.imageUrl,
      category: body.category,
      price: body.price,
      stock: body.stock,
    });

    try {
      await newProduct.save();

      res.status(HttpCodes.CREATED).json({
        data: newProduct,
        message: 'Producto guardado correctamente',
      });
    } catch (e) {
      internalError(res, e, 'Ocurrió un error al guardar el producto');
    }
  }
}
