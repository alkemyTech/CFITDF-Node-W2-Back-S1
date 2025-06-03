// Validadores para préstamos usando express-validator
import { body, param, query } from 'express-validator';

// Validaciones para crear préstamo
export const validateCreateLoan = [
  body('id_usuario')
    .isInt({ min: 1 })
    .withMessage('El id del usuario debe ser un número válido mayor a 0'),
  
  body('id_copia')
    .isInt({ min: 1 })
    .withMessage('El id de la copia debe ser un número válido mayor a 0'),
  
  body('fecha_prestamo')
    .isISO8601()
    .withMessage('La fecha de préstamo debe tener un formato válido (YYYY-MM-DD)')
    .custom((value) => {
      const today = new Date();
      const loanDate = new Date(value);
      if (loanDate > today) {
        throw new Error('La fecha de préstamo no puede ser futura');
      }
      return true;
    }),
  
  body('fecha_devolucion_esperada')
    .isISO8601()
    .withMessage('La fecha de devolución esperada debe tener un formato válido (YYYY-MM-DD)')
    .custom((value, { req }) => {
      const loanDate = new Date(req.body.fecha_prestamo);
      const returnDate = new Date(value);
      if (returnDate <= loanDate) {
        throw new Error('La fecha de devolución debe ser posterior a la fecha de préstamo');
      }
      return true;
    }),
  
  body('observaciones')
    .optional()
    .isLength({ max: 500 })
    .withMessage('Las observaciones no pueden exceder los 500 caracteres')
];

// Validaciones para actualizar préstamo
export const validateUpdateLoan = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('El ID debe ser un número válido'),
  
  body('fecha_devolucion_real')
    .optional()
    .isISO8601()
    .withMessage('La fecha de devolución real debe tener un formato válido (YYYY-MM-DD)'),
  
  body('fecha_devolucion_esperada')
    .optional()
    .isISO8601()
    .withMessage('La fecha de devolución esperada debe tener un formato válido (YYYY-MM-DD)'),
  
  body('estado')
    .optional()
    .isIn(['activo', 'devuelto', 'vencido', 'renovado'])
    .withMessage('El estado debe ser: activo, devuelto, vencido o renovado'),
  
  body('observaciones')
    .optional()
    .isLength({ max: 500 })
    .withMessage('Las observaciones no pueden exceder los 500 caracteres')
];

// Validaciones para devolver préstamo
export const validateReturnLoan = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('El ID debe ser un número válido'),
  
  body('fecha_devolucion_real')
    .isISO8601()
    .withMessage('La fecha de devolución real debe tener un formato válido (YYYY-MM-DD)')
    .custom((value) => {
      const today = new Date();
      const returnDate = new Date(value);
      if (returnDate > today) {
        throw new Error('La fecha de devolución no puede ser futura');
      }
      return true;
    }),
  
  body('estado_copia')
    .optional()
    .isIn(['bueno', 'dañado', 'perdido'])
    .withMessage('El estado de la copia debe ser: bueno, dañado o perdido'),
  
  body('observaciones')
    .optional()
    .isLength({ max: 500 })
    .withMessage('Las observaciones no pueden exceder los 500 caracteres')
];

// Validación para obtener préstamo por ID
export const validateLoanId = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('El ID debe ser un número válido')
];

// Validaciones para búsqueda de préstamos
export const validateLoanQuery = [
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
    .isIn(['activo', 'devuelto', 'vencido', 'renovado'])
    .withMessage('El estado debe ser: activo, devuelto, vencido o renovado'),
  
  query('usuario')
    .optional()
    .isInt({ min: 1 })
    .withMessage('El filtro por usuario debe ser un número válido'),
  
  query('fecha_desde')
    .optional()
    .isISO8601()
    .withMessage('La fecha desde debe tener un formato válido (YYYY-MM-DD)'),
  
  query('fecha_hasta')
    .optional()
    .isISO8601()
    .withMessage('La fecha hasta debe tener un formato válido (YYYY-MM-DD)')
    .custom((value, { req }) => {
      if (req.query.fecha_desde) {
        const fechaDesde = new Date(req.query.fecha_desde);
        const fechaHasta = new Date(value);
        if (fechaHasta < fechaDesde) {
          throw new Error('La fecha hasta debe ser posterior a la fecha desde');
        }
      }
      return true;
    }),
  
  query('vencidos')
    .optional()
    .isBoolean()
    .withMessage('El filtro de vencidos debe ser true o false')
];
