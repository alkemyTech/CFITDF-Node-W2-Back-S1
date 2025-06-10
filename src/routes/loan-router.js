import express from 'express';
import { loanControllers } from '../controllers/index.js';
import { checkTokenUser } from '../middlewares/check-user.js';
import authGuard from '../middlewares/auth-guard.js';

const router = express.Router();

// Rutas protegidas administrador 
router.post(
  '/',
  checkTokenUser,
  authGuard([1]),
  loanControllers.createLoan
);

router.put(
  '/:id/return',
  checkTokenUser,
  authGuard([1]),
  loanControllers.returnLoan
);

// Acceso a prestamos por usuario: administrador o el mismo usuario
router.get(
  '/user/:userId',
  checkTokenUser,
  authGuard([1, 2]),
  loanControllers.getUserLoans
);

// Consultas generales (solo administrador)
router.get(
  '/active',
  checkTokenUser,
  authGuard([1]),
  loanControllers.getActiveLoans
);

router.get(
  '/overdue',
  checkTokenUser,
  authGuard([1]),
  loanControllers.getOverdueLoans
);

export default router;