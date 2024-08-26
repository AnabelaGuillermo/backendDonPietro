import HttpCodes from 'http-status-codes';
import ProductsModel from '../models/productSchema.js';
import { internalError } from '../helpers/helpers.js';

export const isAlreadyCharged = async (req, res, next) => {
  const { name } = req.body;

  try {
    const product = await ProductsModel.findOne({
      name,
      isActive: true,
    });

    if (product) {
      res.status(HttpCodes.CONFLICT).json({
        data: null,
        message: 'El producto ya esta registrado',
      });
      return;
    }

    next();
  } catch (e) {
    internalError(
      res,
      e,
      'Ocurrió un Error al verificar el correo electrónico',
    );
  }
};
