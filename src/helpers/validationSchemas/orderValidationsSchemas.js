import Joi from 'joi';

export const post_orderValidationSchema = Joi.object({
  comments: Joi.string().trim().min(15).max(300).required().messages({
    'string.min': "El campo 'comments' debe tener como mínimo 15 caracteres",
    'string.max': "El campo 'comments' debe tener como máximo 300 caracteres",
    'any.required': "El campo 'comments' es requerido",
    '*': "Revisa el campo 'comments'",
  }),
  status: Joi.string()
    .valid('WaitingForPayment', 'Pending', 'Completed')
    .required()
    .messages({
      'any.only':
        "El campo 'status' debe ser 'WaitingForPayment', 'Pending', 'Completed'",
      'any.required': "El campo 'status' es requerido",
      '*': "Revisa el campo 'status'",
    }),
  paymentMethod: Joi.string().valid('MercadoPago', 'Caja').required().messages({
    'any.only': "El campo 'status' debe ser 'MercadoPago', 'Caja'",
    'any.required': "El campo 'status' es requerido",
    '*': "Revisa el campo 'status'",
  }),
  total: Joi.number().positive().required().messages({
    'number.positive': "El campo 'total' debe ser un número positivo",
    'any.required': "El campo 'total' es requerido",
    '*': "Revisa el campo 'total'",
  }),
});
