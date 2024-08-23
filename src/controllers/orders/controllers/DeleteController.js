import HttpCodes from 'http-status-codes';
import OrderModel from '../../../models/orderSchema.js';
import ProductModel from '../../../models/productSchema.js';
import { internalError } from '../../../helpers/helpers.js';

export class DeleteController {
  static async deleteOrder(req, res) {
    const {
      params: { id },
    } = req;

    try {
      const order = await OrderModel.findById(id);

      if (!order) {
        res.status(HttpCodes.BAD_REQUEST).json({
          data: null,
          message: 'La orden indicado no fue encontrado',
        });
        return;
      }

      const stockUpdates = order.products.map(async (product) => {
        await ProductModel.findByIdAndUpdate(product._id, {
          $inc: { stock: product.quantity },
        });
      });

      await Promise.all(stockUpdates);

      // Eliminar la orden
      await OrderModel.deleteOne({ _id: id });

      res.json({
        data: null,
        message: 'Orden eliminado correctamente',
      });
    } catch (e) {
      internalError(res, e, 'Ocurrió un error eliminando el recurso indicado');
    }
  }
}
