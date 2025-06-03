// Validadores para autenticación usando express-validator
import { body } from 'express-validator';

// Validaciones para login
export const validateLogin = [
  body('email')
    .isEmail()
    .withMessage('El email no es válido')
    .normalizeEmail(),
  
  body('password')
    .notEmpty()
    .withMessage('La contraseña es obligatoria')
    .isLength({ min: 1 })
    .withMessage('La contraseña no puede estar vacía')
];

// Validaciones para registro
export const validateRegister = [
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
  
  body('password')
    .isLength({ min: 6 })
    .withMessage('La contraseña debe tener al menos 6 caracteres')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('La contraseña debe contener al menos una letra minúscula, una mayúscula y un número'),
  
  body('id_rol')
    .optional()
    .isInt({ min: 1 })
    .withMessage('El id del rol debe ser un número válido mayor a 0')
];

// Validaciones para cambio de contraseña
export const validatePasswordChange = [
  body('currentPassword')
    .notEmpty()
    .withMessage('La contraseña actual es obligatoria'),
  
  body('newPassword')
    .isLength({ min: 6 })
    .withMessage('La nueva contraseña debe tener al menos 6 caracteres')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('La nueva contraseña debe contener al menos una letra minúscula, una mayúscula y un número'),
  
  body('confirmPassword')
    .custom((value, { req }) => {
      if (value !== req.body.newPassword) {
        throw new Error('La confirmación de contraseña no coincide');
      }
      return true;
    })
];
