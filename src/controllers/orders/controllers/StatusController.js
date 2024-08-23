import HttpCodes from 'http-status-codes';
import OrderModel from '../../../models/orderSchema.js';
import { internalError } from '../../../helpers/helpers.js';

export class StatusController {
  static async patchOrderPending(req, res) {
    const {
      params: { id },
    } = req;

    try {
      const action = await OrderModel.updateOne(
        {
          _id: id,
          status: 'WaitingForPayment',
        },
        {
          status: 'Pending',
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
    } catch (e) {
      internalError(
        res,
        e,
        'Ocurrió un error actualizando el recurso indicado',
      );
    }
  }

  static async patchOrderDelivered(req, res) {
    const {
      params: { id },
    } = req;

    try {
      const action = await OrderModel.updateOne(
        {
          _id: id,
          status: 'Pending',
        },
        {
          status: 'Delivered',
        },
      );

      if (action.matchedCount === 0) {
        res.status(HttpCodes.BAD_REQUEST).json({
          data: null,
          message: 'La orden indicado no fue encontrado',
        });
        return;
      }

      res.json({
        data: null,
        message: 'Orden actualizada correctamente',
      });
    } catch (e) {
      internalError(
        res,
        e,
        'Ocurrió un error actualizando el recurso indicado',
      );
    }
  }
}
