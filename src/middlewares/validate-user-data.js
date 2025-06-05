// Validación de usuarios.
import { body, validationResult } from 'express-validator';

export const validateUserData = [
  // Validar DNI: debe ser un entero y tener al menos 7 dígitos
  body('dni')
    .isInt({ min: 1000000 }).withMessage('El DNI debe ser un número entero de al menos 7 dígitos.')
    .notEmpty().withMessage('El DNI es obligatorio.'),

  // Validar nombres: debe ser un string no vacío
  body('nombres')
    .isString().withMessage('El nombre debe ser un texto.')
    .trim()
    .notEmpty().withMessage('El nombre es obligatorio.'),

  // Validar apellidos: debe ser un string no vacío
  body('apellidos')
    .isString().withMessage('El apellido debe ser un texto.')
    .trim()
    .notEmpty().withMessage('El apellido es obligatorio.'),

  // Validar email: debe ser un email válido
  body('email')
    .isEmail().withMessage('El email no tiene un formato válido.')
    .normalizeEmail() // Normaliza el email (ej. a minúsculas)
    .notEmpty().withMessage('El email es obligatorio.'),

  // Validar id_rol: debe ser un entero
  body('id_rol')
    .isInt().withMessage('El ID del rol debe ser un número entero.')
    .notEmpty().withMessage('El ID del rol es obligatorio.'),
  
  // Validar password (opcional, solo en creación o si se envía)
  body('password')
    .optional() // Solo valida si se envía
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
