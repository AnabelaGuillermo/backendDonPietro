import Joi from 'joi';

export const configValidationSchema = Joi.object({
  cantidadMesas: Joi.number().min(1).max(100).required().messages({
    'number.min': "El campo 'mesa' debe ser un número entero mayor o igual a 1",
    'number.max':
      "El campo 'mesa' debe ser un número entero menor o igual a 100",
    'any.required': "El campo 'mesa' es requerido",
    '*': "Revisa el campo 'Mesas'",
  }),
});
