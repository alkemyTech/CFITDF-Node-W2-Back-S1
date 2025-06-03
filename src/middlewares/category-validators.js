// Validadores para categorías usando express-validator
import { body, param, query } from 'express-validator';

// Validaciones para crear categoría
export const validateCreateCategory = [
  body('nombre')
    .notEmpty()
    .withMessage('El nombre es obligatorio')
    .isLength({ min: 2, max: 50 })
    .withMessage('El nombre debe tener entre 2 y 50 caracteres')
    .matches(/^[a-zA-ZáéíóúñÑ\s]+$/)
    .withMessage('El nombre solo puede contener letras y espacios'),
  
  body('descripcion')
    .optional()
    .isLength({ max: 200 })
    .withMessage('La descripción no puede exceder los 200 caracteres')
];

// Validaciones para actualizar categoría
export const validateUpdateCategory = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('El ID debe ser un número válido'),
  
  body('nombre')
    .optional()
    .isLength({ min: 2, max: 50 })
    .withMessage('El nombre debe tener entre 2 y 50 caracteres')
    .matches(/^[a-zA-ZáéíóúñÑ\s]+$/)
    .withMessage('El nombre solo puede contener letras y espacios'),
  
  body('descripcion')
    .optional()
    .isLength({ max: 200 })
    .withMessage('La descripción no puede exceder los 200 caracteres')
];

// Validación para obtener categoría por ID
export const validateCategoryId = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('El ID debe ser un número válido')
];

// Validaciones para búsqueda de categorías
export const validateCategoryQuery = [
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
