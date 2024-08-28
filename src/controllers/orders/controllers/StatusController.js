import HttpCodes from 'http-status-codes';

import { internalError } from '../../../helpers/helpers.js';

import OrderModel from '../../../models/orderSchema.js';
import OrderHistorialModel from '../../../models/orderHistorialSchema.js';

export class StatusController {
  static async patchOrder(req, res) {
    const {
      params: { id, status, newStatus },
    } = req;

    try {
      if (newStatus === 'Completed') {
        const order = await OrderModel.findOneAndUpdate(
          { _id: id, status: 'PendingDelivery' },
          {},
          { new: true },
        );

        if (!order) {
          res.status(HttpCodes.BAD_REQUEST).json({
            data: null,
            message: 'La orden indicada no fue encontrada',
          });
          return;
        }

        order.status = 'Completed';

        const orderHistorial = new OrderHistorialModel(order.toObject());
        await orderHistorial.save();
        await OrderModel.deleteOne({ _id: id });

        res.json({
          data: null,
          message: 'Orden movida a historial correctamente',
        });
      } else {
        const action = await OrderModel.updateOne(
          {
            _id: id,
            status,
          },
          {
            status: newStatus,
          },
        );

        if (action.matchedCount === 0) {
          res.status(HttpCodes.BAD_REQUEST).json({
            data: null,
            message: 'La orden indicada no fue encontrado',
          });
          return;
        }

        res.json({
          data: null,
          message: 'Orden actualizada correctamente',
        });
      }
    } catch (e) {
      internalError(
        res,
        e,
        'Ocurrió un error actualizando el recurso indicado',
      );
    }
  }

  static async patchPendingDelivery(req, res) {
    const {
      params: { id },
    } = req;

    try {
      const order = await OrderModel.findOneAndUpdate(
        { _id: id, status: 'PendingDelivery' },
        {},
        { new: true },
      );

      if (!order) {
        res.status(HttpCodes.BAD_REQUEST).json({
          data: null,
          message: 'La orden indicada no fue encontrada',
        });
        return;
      }

      order.status = 'Completed';

      const orderHistorial = new OrderHistorialModel(order.toObject());
      await orderHistorial.save();
      await OrderModel.deleteOne({ _id: id });

      res.json({
        data: null,
        message: 'Orden movida a historial correctamente',
      });
    } catch (e) {
      internalError(
        res,
        e,
        'Ocurrió un error moviendo el recurso indicado a historial',
      );
    }
  }
}
