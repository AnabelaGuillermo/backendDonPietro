import Joi from 'joi';

export const post_orderValidationSchema = Joi.object({
  comments: Joi.string().trim().max(300).messages({
    'string.max': "El campo 'comments' debe tener como máximo 300 caracteres",
    '*': "Revisa el campo 'comments'",
  }),
  total: Joi.number().positive().required().messages({
    'number.positive': "El campo 'total' debe ser un número positivo",
    'any.required': "El campo 'total' es requerido",
    '*': "Revisa el campo 'total'",
  }),
});
