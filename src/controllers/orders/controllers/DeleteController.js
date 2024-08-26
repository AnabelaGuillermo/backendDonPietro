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

      const stockUpdates = order.products.map(async (item) => {
        const { id: productId, quantity } = item.product;
        if (typeof quantity === 'number' && quantity > 0) {
          await ProductModel.findByIdAndUpdate(productId, {
            $inc: { stock: quantity },
          });
        } else {
          console.error(
            `Cantidad inválida para el producto con ID ${productId}. Valor de quantity: ${quantity}`,
          );
        }
      });

      await Promise.all(stockUpdates);

      await OrderModel.deleteOne({ _id: id });

      res.json({
        data: null,
        message: 'Orden eliminada correctamente',
      });
    } catch (e) {
      internalError(res, e, 'Ocurrió un error eliminando el recurso indicado');
    }
  }
}
