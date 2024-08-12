import Joi from 'joi';

export const post_productValidationSchema = Joi.object({
  name: Joi.string().trim().min(3).max(25).required().messages({
    'string.min': "El campo 'name' debe tener como mínimo 3 caracteres",
    'string.max': "El campo 'name' debe tener como máximo 25 caracteres",
    'any.required': "El campo 'name' es requerido",
    '*': "Revisa el campo 'name'",
  }),
  description: Joi.string().trim().min(10).max(50).required().messages({
    'string.min': "El campo 'description' debe tener como mínimo 10 caracteres",
    'string.max': "El campo 'description' debe tener como máximo 50 caracteres",
    'any.required': "El campo 'description' es requerido",
    '*': "Revisa el campo 'description'",
  }),
  imageUrl: Joi.string().trim().uri().required().messages({
    'string.uri': "El campo 'imageUrl' debe ser una URL válida",
    'any.required': "El campo 'imageUrl' es requerido",
    '*': "Revisa el campo 'imageUrl'",
  }),
  category: Joi.string().valid('comidas', 'bebidas').required().messages({
    'any.only': "El campo 'category' debe ser 'comidas' o 'bebidas'",
    'any.required': "El campo 'category' es requerido",
    '*': "Revisa el campo 'category'",
  }),
  price: Joi.number().positive().required().messages({
    'number.positive': "El campo 'price' debe ser un número positivo",
    'any.required': "El campo 'price' es requerido",
    '*': "Revisa el campo 'price'",
  }),
  stock: Joi.number().integer().min(0).required().messages({
    'number.min':
      "El campo 'stock' debe ser un número entero mayor o igual a 0",
    'any.required': "El campo 'stock' es requerido",
    '*': "Revisa el campo 'stock'",
  }),
});