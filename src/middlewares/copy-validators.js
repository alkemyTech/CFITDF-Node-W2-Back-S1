// Validadores para copias usando express-validator
import { body, param, query } from 'express-validator';

// Validaciones para crear copia
export const validateCreateCopy = [
  body('id_libro')
    .isInt({ min: 1 })
    .withMessage('El id del libro debe ser un número válido mayor a 0'),
  
  body('estado')
    .notEmpty()
    .withMessage('El estado es obligatorio')
    .isIn(['disponible', 'prestado', 'reservado', 'dañado', 'perdido'])
    .withMessage('El estado debe ser: disponible, prestado, reservado, dañado o perdido'),
  
  body('ubicacion')
    .optional()
    .isLength({ min: 2, max: 100 })
    .withMessage('La ubicación debe tener entre 2 y 100 caracteres'),
  
  body('observaciones')
    .optional()
    .isLength({ max: 500 })
    .withMessage('Las observaciones no pueden exceder los 500 caracteres')
];

// Validaciones para actualizar copia
export const validateUpdateCopy = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('El ID debe ser un número válido'),
  
  body('estado')
    .optional()
    .isIn(['disponible', 'prestado', 'reservado', 'dañado', 'perdido'])
    .withMessage('El estado debe ser: disponible, prestado, reservado, dañado o perdido'),
  
  body('ubicacion')
    .optional()
    .isLength({ min: 2, max: 100 })
    .withMessage('La ubicación debe tener entre 2 y 100 caracteres'),
  
  body('observaciones')
    .optional()
    .isLength({ max: 500 })
    .withMessage('Las observaciones no pueden exceder los 500 caracteres')
];

// Validación para obtener copia por ID
export const validateCopyId = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('El ID debe ser un número válido')
];

// Validación para obtener copias por libro
export const validateBookId = [
  param('bookId')
    .isInt({ min: 1 })
    .withMessage('El ID del libro debe ser un número válido')
];

// Validaciones para búsqueda de copias
export const validateCopyQuery = [
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('La página debe ser un número mayor a 0'),
  
  query('limit')
    .optional()
    .isInt({ min: 1, max: 50 })
    .withMessage('El límite debe ser un número entre 1 y 50'),
  
  query('estado')
    .optional()
    .isIn(['disponible', 'prestado', 'reservado', 'dañado', 'perdido'])
    .withMessage('El estado debe ser: disponible, prestado, reservado, dañado o perdido'),
  
  query('libro')
    .optional()
    .isInt({ min: 1 })
    .withMessage('El filtro por libro debe ser un número válido'),
  
  query('ubicacion')
    .optional()
    .isLength({ min: 2 })
    .withMessage('El filtro por ubicación debe tener al menos 2 caracteres')
];
