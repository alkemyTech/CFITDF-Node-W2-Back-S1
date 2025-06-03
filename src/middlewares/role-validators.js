// Validadores para roles usando express-validator
import { body, param, query } from 'express-validator';

// Validaciones para crear rol
export const validateCreateRole = [
  body('nombre')
    .notEmpty()
    .withMessage('El nombre es obligatorio')
    .isLength({ min: 2, max: 30 })
    .withMessage('El nombre debe tener entre 2 y 30 caracteres')
    .matches(/^[a-zA-ZáéíóúñÑ\s]+$/)
    .withMessage('El nombre solo puede contener letras y espacios'),
  
  body('descripcion')
    .optional()
    .isLength({ max: 150 })
    .withMessage('La descripción no puede exceder los 150 caracteres'),
  
  body('permisos')
    .optional()
    .isArray()
    .withMessage('Los permisos deben ser un array')
];

// Validaciones para actualizar rol
export const validateUpdateRole = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('El ID debe ser un número válido'),
  
  body('nombre')
    .optional()
    .isLength({ min: 2, max: 30 })
    .withMessage('El nombre debe tener entre 2 y 30 caracteres')
    .matches(/^[a-zA-ZáéíóúñÑ\s]+$/)
    .withMessage('El nombre solo puede contener letras y espacios'),
  
  body('descripcion')
    .optional()
    .isLength({ max: 150 })
    .withMessage('La descripción no puede exceder los 150 caracteres'),
  
  body('permisos')
    .optional()
    .isArray()
    .withMessage('Los permisos deben ser un array')
];

// Validación para obtener rol por ID
export const validateRoleId = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('El ID debe ser un número válido')
];

// Validaciones para búsqueda de roles
export const validateRoleQuery = [
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('La página debe ser un número mayor a 0'),
  
  query('limit')
    .optional()
    .isInt({ min: 1, max: 50 })
    .withMessage('El límite debe ser un número entre 1 y 50'),
  
  query('search')
    .optional()
    .isLength({ min: 2 })
    .withMessage('La búsqueda debe tener al menos 2 caracteres')
];
