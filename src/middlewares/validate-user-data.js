// Validación de usuarios.
import { body, validationResult } from 'express-validator';

export const validateUserData = [
  // Middleware de validación para actualizar usuario
  // Nombres: opcional, pero si viene debe ser string y no vacío
  body('nombres')
    .optional()
    .isString().withMessage('El nombre debe ser un texto.')
    .trim()
    .notEmpty().withMessage('El nombre es obligatorio.'),

  // Apellidos: opcional, pero si viene debe ser string y no vacío
  body('apellidos')
    .optional()
    .isString().withMessage('El apellido debe ser un texto.')
    .trim()
    .notEmpty().withMessage('El apellido es obligatorio.'),

  // Email: opcional, pero si viene debe ser email válido
  body('email')
    .optional()
    .isEmail().withMessage('El email no tiene un formato válido.')
    .normalizeEmail()
    .notEmpty().withMessage('El email es obligatorio.'),

  // id_rol: opcional, pero si viene debe ser entero
  body('id_rol')
    .optional()
    .isInt().withMessage('El ID del rol debe ser un número entero.')
    .notEmpty().withMessage('El ID del rol es obligatorio.'),

  // Password: opcional, pero si viene debe tener mínimo 8 caracteres
  body('password')
    .optional()
    .isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres.'),

  // Middleware para manejar los resultados de la validación
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];
