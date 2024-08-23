import OrderModel from '../../../models/orderSchema.js';
import { internalError } from '../../../helpers/helpers.js';

export class GetController {
  static async getPendingOrders(_, res) {
    try {
      const data = await OrderModel.find({
        status: 'Pending',
      });

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
        message: 'Ordenes encontradas correctamente',
      });
    } catch (e) {
      internalError(res, e, 'Ocurrió un error al leer la lista de ordenes');
    }
  }

  static async getUserOrders(req, res) {
    const {
      params: { id },
    } = req;

    try {
      const data = await OrderModel.find({
        userId: id,
        status: 'Completed',
      });

      res.json({
        data,
        message: 'Ordenes encontradas correctamente',
      });
    } catch (e) {
      internalError(res, e, 'Ocurrió un error al leer la lista de ordenes');
    }
  }
}
