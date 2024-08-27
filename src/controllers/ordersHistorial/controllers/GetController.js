import HttpCodes from 'http-status-codes';

import { internalError } from '../../../helpers/helpers.js';

import OrderHistorialModel from '../../../models/orderHistorialSchema.js';

export class GetController {
  static async getOrderHistoralID(req, res) {
    try {
      const {
        params: { id },
      } = req;

      const data = await OrderHistorialModel.find({
        userId: id,
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
          createdAt: order._doc.createdAt,
          table: order._doc.table,
        };
      });

      if (!data) {
        return res.status(HttpCodes.NOT_FOUND).json({
          data: null,
          message: 'Historial no encontrado',
        });
      }

      res.json({
        data: filteredData,
        message: 'Historial encontrado correctamente',
      });
    } catch (e) {
      internalError(res, e, 'Ocurrió un error al leer la lista de productos');
    }
  }
}
