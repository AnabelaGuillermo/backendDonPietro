import HttpCodes from 'http-status-codes';
import OrderHistorialModel from '../../../models/orderHistorialSchema.js';
import { internalError } from '../../../helpers/helpers.js';

export class GetController {
  static async getOrdersHistorial(_, res) {
    try {
      const data = await OrderHistorialModel.find();

      const filteredData = data.map((order) => {
        return {
          id: order._doc._id,
          userID: order._doc.userID,
          products: order._doc.products,
          comments: order._doc.comments,
          status: order._doc.status,
          paymentMethod: order._doc.paymentMethod,
          total: order._doc.total,
        };
      });

      res.json({
        data: filteredData,
        message: 'Historial encontrado correctamente',
      });
    } catch (e) {
      internalError(res, e, 'Ocurrió un error al leer la lista de productos');
    }
  }

  static async getOrderHistoralID(req, res) {
    try {
      const {
        params: { id },
      } = req;

      const data = await OrderHistorialModel.findOne({
        userId: id,
      });

      if (!data) {
        return res.status(HttpCodes.NOT_FOUND).json({
          data: null,
          message: 'Historial no encontrado',
        });
      }

      res.json({
        data,
        message: 'Historial encontrado correctamente',
      });
    } catch (e) {
      internalError(res, e, 'Ocurrió un error al leer la lista de productos');
    }
  }
}
