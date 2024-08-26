import OrderModel from '../../../models/orderSchema.js';

import { internalError } from '../../../helpers/helpers.js';

export class GetController {
  static async getWaitingPYOrders(_, res) {
    try {
      const data = await OrderModel.find({
        status: 'WaitingForPayment',
      });

      const filteredData = data.map((order) => {
        return {
          id: order._doc._id,
          userID: order._doc.userID,
          userName: order._doc.userName,
          products: order._doc.products,
          comments: order._doc.comments,
          status: order._doc.status,
          paymentMethod: order._doc.paymentMethod,
          total: order._doc.total,
          table: order._doc.table,
        };
      });

      res.json({
        data: filteredData,
        message: 'Ordenes encontradas correctamente',
      });
    } catch (e) {
      internalError(res, e, 'Ocurrió un error al leer la lista de ordenes');
    }
  }

  static async getPreparingOrders(_, res) {
    try {
      const data = await OrderModel.find({
        status: 'PreparingOrder',
      });

      const filteredData = data.map((order) => {
        return {
          id: order._doc._id,
          userID: order._doc.userID,
          userName: order._doc.userName,
          products: order._doc.products,
          comments: order._doc.comments,
          status: order._doc.status,
          paymentMethod: order._doc.paymentMethod,
          total: order._doc.total,
          table: order._doc.table,
        };
      });

      res.json({
        data: filteredData,
        message: 'Ordenes encontradas correctamente',
      });
    } catch (e) {
      internalError(res, e, 'Ocurrió un error al leer la lista de ordenes');
    }
  }

  static async getPendingDOrders(_, res) {
    try {
      const data = await OrderModel.find({
        status: 'PendingDelivery',
      });

      const filteredData = data.map((order) => {
        return {
          id: order._doc._id,
          userID: order._doc.userID,
          userName: order._doc.userName,
          products: order._doc.products,
          comments: order._doc.comments,
          status: order._doc.status,
          paymentMethod: order._doc.paymentMethod,
          total: order._doc.total,
          table: order._doc.table,
        };
      });

      res.json({
        data: filteredData,
        message: 'Ordenes encontradas correctamente',
      });
    } catch (e) {
      internalError(res, e, 'Ocurrió un error al leer la lista de ordenes');
    }
  }
}
