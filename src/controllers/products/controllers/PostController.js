import HttpCodes from 'http-status-codes';

import { internalError } from '../../../helpers/helpers.js';

import ProductModel from '../../../models/productSchema.js';

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
      isVegetarian: body.isVegetarian,
      isVegan: body.isVegan,
      isGlutenFree: body.isGlutenFree,
      isAvailable: body.isAvailable,
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
