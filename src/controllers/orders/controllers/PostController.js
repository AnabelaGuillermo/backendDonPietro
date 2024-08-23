import { internalError } from '../../../helpers/helpers.js';

import OrderModel from '../../../models/orderSchema.js';

export class PostController {
  static async postOrderMP(req, res) {
    const {
      user: { id },
      body,
    } = req;

    try {
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
