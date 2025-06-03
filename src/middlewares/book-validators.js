// Validadores para libros usando express-validator
import { body, param, query } from 'express-validator';

// Validaciones para crear libro
export const validateCreateBook = [
  body('titulo')
    .notEmpty()
    .withMessage('El título es obligatorio')
    .isLength({ min: 2, max: 200 })
    .withMessage('El título debe tener entre 2 y 200 caracteres'),
  
  body('isbn')
    .notEmpty()
    .withMessage('El ISBN es obligatorio')
    .isLength({ min: 10, max: 17 })
    .withMessage('El ISBN debe tener entre 10 y 17 caracteres')
    .matches(/^[\d-]+$/)
    .withMessage('El ISBN solo puede contener números y guiones'),
  
  body('editorial')
    .notEmpty()
    .withMessage('La editorial es obligatoria')
    .isLength({ min: 2, max: 100 })
    .withMessage('La editorial debe tener entre 2 y 100 caracteres'),
  
  body('autor')
    .notEmpty()
    .withMessage('El autor es obligatorio')
    .isLength({ min: 2, max: 100 })
    .withMessage('El autor debe tener entre 2 y 100 caracteres')
    .matches(/^[a-zA-ZáéíóúñÑ\s.,'-]+$/)
    .withMessage('El autor solo puede contener letras, espacios y algunos caracteres especiales'),
  
  body('disponible')
    .isBoolean()
    .withMessage('El campo disponible debe ser true o false'),
  
  body('id_categoria')
    .isInt({ min: 1 })
    .withMessage('El id de la categoría debe ser un número válido mayor a 0'),
  
  body('fechaPublicacion')
    .optional()
    .isISO8601()
    .withMessage('La fecha de publicación debe tener un formato válido'),
  
  body('descripcion')
    .optional()
    .isLength({ max: 1000 })
    .withMessage('La descripción no puede exceder los 1000 caracteres')
];

// Validaciones para actualizar libro
export const validateUpdateBook = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('El ID debe ser un número válido'),
  
  body('titulo')
    .optional()
    .isLength({ min: 2, max: 200 })
    .withMessage('El título debe tener entre 2 y 200 caracteres'),
  
  body('isbn')
    .optional()
    .isLength({ min: 10, max: 17 })
    .withMessage('El ISBN debe tener entre 10 y 17 caracteres')
    .matches(/^[\d-]+$/)
    .withMessage('El ISBN solo puede contener números y guiones'),
  
  body('editorial')
    .optional()
    .isLength({ min: 2, max: 100 })
    .withMessage('La editorial debe tener entre 2 y 100 caracteres'),
  
  body('autor')
    .optional()
    .isLength({ min: 2, max: 100 })
    .withMessage('El autor debe tener entre 2 y 100 caracteres')
    .matches(/^[a-zA-ZáéíóúñÑ\s.,'-]+$/)
    .withMessage('El autor solo puede contener letras, espacios y algunos caracteres especiales'),
  
  body('disponible')
    .optional()
    .isBoolean()
    .withMessage('El campo disponible debe ser true o false'),
  
  body('id_categoria')
    .optional()
    .isInt({ min: 1 })
    .withMessage('El id de la categoría debe ser un número válido mayor a 0'),
  
  body('fechaPublicacion')
    .optional()
    .isISO8601()
    .withMessage('La fecha de publicación debe tener un formato válido'),
  
  body('descripcion')
    .optional()
    .isLength({ max: 1000 })
    .withMessage('La descripción no puede exceder los 1000 caracteres')
];

// Validación para obtener libro por ID
export const validateBookId = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('El ID debe ser un número válido')
];

// Validaciones para búsqueda de libros
export const validateBookQuery = [
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
    .withMessage('La búsqueda debe tener al menos 2 caracteres'),
  
  query('categoria')
    .optional()
    .isInt({ min: 1 })
    .withMessage('La categoría debe ser un número válido'),
  
  query('disponible')
    .optional()
    .isBoolean()
    .withMessage('El filtro disponible debe ser true o false'),
  
  query('autor')
    .optional()
    .isLength({ min: 2 })
    .withMessage('El filtro por autor debe tener al menos 2 caracteres')
];
