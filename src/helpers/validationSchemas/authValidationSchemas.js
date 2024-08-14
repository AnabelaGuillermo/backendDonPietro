import Joi from 'joi';

export const post_loginValidationSchema = Joi.object({
  usernameOrEmail: Joi.string().trim().min(3).max(50).required().messages({
    'string.min':
      "El campo 'usernameOrEmail' debe tener como mínimo 3 caracteres",
    'string.max':
      "El campo 'usernameOrEmail' debe tener como máximo 50 caracteres",
    'any.required': "El campo 'usernameOrEmail' es requerido",
    '*': "Revisa el campo 'usernameOrEmail'",
  }),
  password: Joi.string().trim().min(8).required().messages({
    'string.min': "El campo 'password' debe tener al menos 8 caracteres",
    'any.required': "El campo 'password' es requerido",
    '*': "Revisa el campo 'password'",
  }),
});
