// Validadores para usuarios usando express-validator
import { body, param, query } from 'express-validator';

// Validaciones para crear usuario
export const validateCreateUser = [
  body('dni')
    .isInt({ min: 1000000, max: 99999999 })
    .withMessage('El DNI debe ser un número válido entre 1000000 y 99999999'),
  
  body('nombres')
    .notEmpty()
    .withMessage('El nombre es obligatorio')
    .isLength({ min: 2, max: 50 })
    .withMessage('El nombre debe tener entre 2 y 50 caracteres')
    .matches(/^[a-zA-ZáéíóúñÑ\s]+$/)
    .withMessage('El nombre solo puede contener letras y espacios'),
  
  body('apellidos')
    .notEmpty()
    .withMessage('El apellido es obligatorio')
    .isLength({ min: 2, max: 50 })
    .withMessage('El apellido debe tener entre 2 y 50 caracteres')
    .matches(/^[a-zA-ZáéíóúñÑ\s]+$/)
    .withMessage('El apellido solo puede contener letras y espacios'),
  
  body('email')
    .isEmail()
    .withMessage('El email no es válido')
    .normalizeEmail(),
  
  body('id_rol')
    .isInt({ min: 1 })
    .withMessage('El id del rol debe ser un número válido mayor a 0'),
  
  body('password')
    .optional()
    .isLength({ min: 6 })
    .withMessage('La contraseña debe tener al menos 6 caracteres')
];

// Validaciones para actualizar usuario
export const validateUpdateUser = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('El ID debe ser un número válido'),
  
  body('dni')
    .optional()
    .isInt({ min: 1000000, max: 99999999 })
    .withMessage('El DNI debe ser un número válido entre 1000000 y 99999999'),
  
  body('nombres')
    .optional()
    .isLength({ min: 2, max: 50 })
    .withMessage('El nombre debe tener entre 2 y 50 caracteres')
    .matches(/^[a-zA-ZáéíóúñÑ\s]+$/)
    .withMessage('El nombre solo puede contener letras y espacios'),
  
  body('apellidos')
    .optional()
    .isLength({ min: 2, max: 50 })
    .withMessage('El apellido debe tener entre 2 y 50 caracteres')
    .matches(/^[a-zA-ZáéíóúñÑ\s]+$/)
    .withMessage('El apellido solo puede contener letras y espacios'),
  
  body('email')
    .optional()
    .isEmail()
    .withMessage('El email no es válido')
    .normalizeEmail(),
  
  body('id_rol')
    .optional()
    .isInt({ min: 1 })
    .withMessage('El id del rol debe ser un número válido mayor a 0')
];

// Validación para obtener usuario por ID
export const validateUserId = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('El ID debe ser un número válido')
];

// Validaciones para búsqueda y paginación
export const validateUserQuery = [
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('La página debe ser un número mayor a 0'),
  
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('El límite debe ser un número entre 1 y 100'),
  
  query('search')
    .optional()
    .isLength({ min: 2 })
    .withMessage('La búsqueda debe tener al menos 2 caracteres')
];
