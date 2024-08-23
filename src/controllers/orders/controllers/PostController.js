import { internalError } from '../../../helpers/helpers.js';

import OrderModel from '../../../models/orderSchema.js';
import ProductModel from '../../../models/productSchema.js';

export class PostController {
  static async postOrderMP(req, res) {
    const {
      user: { id },
      body,
    } = req;

    try {
      const productChecks = body.products.map(async (product) => {
        const productInDB = await ProductModel.findById(product._id);

        if (!productInDB) {
          throw new Error(
            `Producto ${product.name} con ID ${product._id} no existe`,
          );
        }

        if (productInDB.stock < product.quantity) {
          throw new Error(
            `Stock insuficiente para el producto ${product.name} con ID ${product._id}`,
          );
        }

        return productInDB;
      });

      await Promise.all(productChecks);

      // Si hay stock suficiente, resta la cantidad pedida del stock
      const stockUpdates = body.products.map((product) =>
        ProductModel.findByIdAndUpdate(product._id, {
          $inc: { stock: -product.quantity },
        }),
      );

      await Promise.all(stockUpdates);

      const newOrder = new OrderModel({
        userID: id,
        products: body.products,
        comments: body.comments,
        status: 'PreparingOrder',
        paymentMethod: 'MercadoPago',
        Total: body.Total,
      });

      await newOrder.save();

      res.status(201).json({
        data: null,
        message: 'Orden de compra creada',
      });
    } catch (e) {
      internalError(res, e, 'Ocurrio un error');
    }
  }

  static async postOrderHand(req, res) {
    const {
      user: { id },
      body,
    } = req;

    try {
      const productChecks = body.products.map(async (product) => {
        const productInDB = await ProductModel.findById(product._id);

        if (!productInDB) {
          throw new Error(
            `Producto ${product.name} con ID ${product._id} no existe`,
          );
        }

        if (productInDB.stock < product.quantity) {
          throw new Error(
            `Stock insuficiente para el producto ${product.name} con ID ${product._id}`,
          );
        }

        return productInDB;
      });

      // Esperar a que todas las verificaciones se completen
      await Promise.all(productChecks);

      // Si hay stock suficiente, resta la cantidad pedida del stock
      const stockUpdates = body.products.map((product) =>
        ProductModel.findByIdAndUpdate(product._id, {
          $inc: { stock: -product.quantity },
        }),
      );

      await Promise.all(stockUpdates);

      const newOrder = new OrderModel({
        userID: id,
        products: body.products,
        comments: body.comments,
        status: 'WaitingForPayment',
        paymentMethod: 'Caja',
        Total: body.Total,
      });

      await newOrder.save();

      res.status(201).json({
        data: null,
        message: 'Orden de compra creada',
      });
    } catch (e) {
      internalError(res, e, 'Ocurrio un error');
    }
  }
}
