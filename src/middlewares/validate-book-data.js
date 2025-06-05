// Validación de datos de los libros.
import { body, param, validationResult } from 'express-validator';

export const validateBookData = [
  // Validar parámetro de ruta 'id' (opcional, para rutas como /books/:id)
  param('id').optional().isInt().withMessage('El ID del libro debe ser numérico.'),

  // Validar título: debe ser un string no vacío
  body('titulo')
    .isString().withMessage('El título debe ser un texto.')
    .trim()
    .notEmpty().withMessage('El título es obligatorio.'),

  // Validar ISBN: debe ser un string con al menos 10 caracteres
  body('isbn')
    .isString().withMessage('El ISBN debe ser un texto.')
    .trim()
    .isLength({ min: 10 }).withMessage('El ISBN debe tener al menos 10 caracteres.')
    .notEmpty().withMessage('El ISBN es obligatorio.'),

  // Validar editorial: debe ser un string no vacío
  body('editorial')
    .isString().withMessage('La editorial debe ser un texto.')
    .trim()
    .notEmpty().withMessage('La editorial es obligatoria.'),

  // Validar autor: debe ser un string no vacío
  body('autor')
    .isString().withMessage('El autor debe ser un texto.')
    .trim()
    .notEmpty().withMessage('El autor es obligatorio.'),

  // Validar disponible: debe ser un booleano
  body('disponible')
    .isBoolean().withMessage('El campo \'disponible\' debe ser verdadero o falso.')
    .notEmpty().withMessage('El campo \'disponible\' es obligatorio.'),

  // Validar id_categoria: debe ser un entero
  body('id_categoria')
    .isInt().withMessage('El ID de la categoría debe ser un número entero.')
    .notEmpty().withMessage('El ID de la categoría es obligatorio.'),

  // Middleware para manejar los resultados de la validación
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];
