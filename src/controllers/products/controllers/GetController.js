import HttpCodes from 'http-status-codes';
import ProductModel from '../../../models/productSchema.js';
import { internalError } from '../../../helpers/helpers.js';

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

  static async getProduct(req, res) {
    const {
      params: { id },
    } = req;

    try {
      const data = await ProductModel.findOne({
        isActive: true,
        _id: id,
      });

      if (!data) {
        return res.status(HttpCodes.NOT_FOUND).json({
          data: null,
          message: 'Producto no encontrado',
        });
      }

      const formattedData = {
        id: data._doc._id,
        name: data._doc.name,
        description: data._doc.description,
        imageUrl: data._doc.imageUrl,
        category: data._doc.category,
        price: data._doc.price,
        stock: data._doc.stock,
        ingredients: data._doc.ingredients,
        isVegan: data._doc.isVegan,
        isVegetarian: data._doc.isVegetarian,
        isGlutenFree: data._doc.isGlutenFree,
      };

      res.json({
        data: formattedData,
        message: 'Producto encontrado correctamente',
      });
    } catch (e) {
      internalError(res, e, 'Ocurrió un error al leer el producto solicitado');
    }
  }
}
