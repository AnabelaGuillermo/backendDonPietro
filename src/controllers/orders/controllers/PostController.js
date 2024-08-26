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

      const stockUpdates = body.products.map((product) =>
        ProductModel.findByIdAndUpdate(product._id, {
          $inc: { stock: -product.quantity },
        }),
      );

      await Promise.all(stockUpdates);

      const newOrder = new OrderModel({
        userId: id,
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
      const productChecks = body.products.map(async (item) => {
        const productInDB = await ProductModel.findById(item.product.id);

        if (!productInDB) {
          throw new Error(`Producto con ID ${item.product.id} no existe`);
        }

        if (productInDB.stock < item.product.quantity) {
          throw new Error(
            `Stock insuficiente para el producto con ID ${item.product.id}`,
          );
        }

        return productInDB;
      });

      await Promise.all(productChecks);

      const stockUpdates = body.products.map((item) =>
        ProductModel.findByIdAndUpdate(item.product.id, {
          $inc: { stock: -item.product.quantity },
        }),
      );

      await Promise.all(stockUpdates);

      const newOrder = new OrderModel({
        userId: id,
        userName: body.userName,
        products: body.products,
        comments: body.comments,
        status: 'WaitingForPayment',
        paymentMethod: 'Caja',
        total: body.total,
        table: body.table,
      });

      await newOrder.save();

      res.status(201).json({
        data: null,
        message: 'Orden de compra creada',
      });
    } catch (e) {
      internalError(res, e, 'Ocurrio un error al crear la orden');
    }
  }
}
