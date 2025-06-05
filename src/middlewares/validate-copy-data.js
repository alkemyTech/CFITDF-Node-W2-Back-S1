// Middleware para validar parámetros de ruta y body en las rutas de copias
// Se usa para asegurar que los datos recibidos sean del tipo y formato esperado antes de llegar al controlador
import { body, param, validationResult } from 'express-validator'; // Importamos las funciones necesarias

export const validateCopyData = [
  // Validar parámetros de ruta
  // param('id') verifica que el parámetro 'id' en la ruta exista
  // .optional() lo hace opcional, útil si no todas las rutas de copias tienen 'id'
  // .isInt() asegura que, si existe, sea un entero
  // .withMessage() personaliza el mensaje de error
  param('id').optional().isInt().withMessage('El id debe ser numérico'),
  param('bookId').optional().isInt().withMessage('El bookId debe ser numérico'),

  // Validar campo de body
  // body('estado') verifica que el campo 'estado' en el body exista
  // .optional() lo hace opcional
  // .isString() asegura que, si existe, sea un string
  // .trim() elimina espacios al inicio y al final
  // .notEmpty() asegura que no esté vacío después de trim
  body('estado').optional().isString().trim().notEmpty().withMessage('El estado debe ser un string y no puede estar vacío'),

  // Middleware para manejar los resultados de la validación
  // Este es el "manejador" que se ejecuta después de las validaciones anteriores
  (req, res, next) => {
    const errors = validationResult(req); // Obtenemos los errores de validación
    if (!errors.isEmpty()) {
      // Si hay errores, respondemos con un 400 y los errores formateados
      return res.status(400).json({ errors: errors.array() });
    }
    next(); // Si no hay errores, continuamos al siguiente middleware o controlador
  }
];
