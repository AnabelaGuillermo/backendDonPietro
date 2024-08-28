import OrderModel from '../../../models/orderSchema.js';

import { internalError } from '../../../helpers/helpers.js';

export class GetController {
  static async getOrders(req, res) {
    try {
      const {
        params: { status },
      } = req;

      const data = await OrderModel.find({
        status,
      });

      const filteredData = data.map((order) => {
        return {
          id: order._doc._id,
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
        message: `Ordenes con status "${status}" encontradas correctamente`,
      });
    } catch (e) {
      internalError(res, e, 'Ocurrió un error al leer la lista de ordenes');
    }
  }

  static async getOrdersTV(req, res) {
    try {
      const {
        params: { status },
      } = req;

      const data = await OrderModel.find({
        status,
      });

      const filteredData = data.map((order) => {
        return {
          id: order._doc._id,
          userName: order._doc.userName,
        };
      });

      res.json({
        data: filteredData,
        message: `Ordenes con status "${status}" encontradas correctamente`,
      });
    } catch (e) {
      internalError(res, e, 'Ocurrió un error al leer la lista de ordenes');
    }
  }

  static async getPreparingOrdersTV(_, res) {
    try {
      const data = await OrderModel.find({
        status: 'PreparingOrder',
      });

      const filteredData = data.map((order) => {
        return {
          id: order._doc._id,
          userName: order._doc.userName,
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

  static async getPendingDOrdersTV(_, res) {
    try {
      const data = await OrderModel.find({
        status: 'PendingDelivery',
      });

      const filteredData = data.map((order) => {
        return {
          id: order._doc._id,
          userName: order._doc.userName,
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
