import Joi from 'joi';

export const post_orderValidationSchema = Joi.object({
  products: Joi.array()
    .items(
      Joi.object({
        product: Joi.string().required().messages({
          'any.required': "El campo 'product' es requerido",
        }),
        quantity: Joi.number().integer().positive().required().messages({
          'number.positive': "El campo 'quantity' debe ser un número positivo",
          'any.required': "El campo 'quantity' es requerido",
        }),
      }),
    )
    .required()
    .messages({
      'array.base': "El campo 'products' debe ser un array",
      'any.required': "El campo 'products' es requerido",
    }),
  comments: Joi.string().trim().max(300).allow('').optional().messages({
    'string.max': "El campo 'comments' debe tener como máximo 300 caracteres",
    '*': "Revisa el campo 'comments'",
  }),
  total: Joi.number().positive().required().messages({
    'number.positive': "El campo 'total' debe ser un número positivo",
    'any.required': "El campo 'total' es requerido",
    '*': "Revisa el campo 'total'",
  }),
});
