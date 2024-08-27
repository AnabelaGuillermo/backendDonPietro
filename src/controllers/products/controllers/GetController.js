import HttpCodes from 'http-status-codes';

import { internalError } from '../../../helpers/helpers.js';

import ProductModel from '../../../models/productSchema.js';

export class GetController {
  static async getProducts(_, res) {
    try {
      const data = await ProductModel.find({
        isActive: true,
      });

      const filteredData = data.map((product) => {
        return {
          id: product._doc._id,
          name: product._doc.name,
          description: product._doc.description,
          imageUrl: product._doc.imageUrl,
          category: product._doc.category,
          price: product._doc.price,
          stock: product._doc.stock,
          ingredients: product._doc.ingredients,
          isVegan: product._doc.isVegan,
          isVegetarian: product._doc.isVegetarian,
          isGlutenFree: product._doc.isGlutenFree,
          isAvailable: product._doc.isAvailable,
        };
      });

      res.json({
        data: filteredData,
        message: 'Productos encontrados correctamente',
      });
    } catch (e) {
      internalError(res, e, 'Ocurrió un error al leer la lista de productos');
    }
  }
}
