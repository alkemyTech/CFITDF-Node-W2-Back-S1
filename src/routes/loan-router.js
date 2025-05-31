import express from 'express';
import { loanControllers } from '../controllers/index.js';
import { checkTokenUser } from '../middlewares/check-user.js';
import authGuard from '../middlewares/auth-guard.js';

const router = express.Router();

// Rutas protegidas administrador 
router.post(
  '/',
  checkTokenUser,
  authGuard(['admin']),
  loanControllers.createLoan
);

router.put(
  '/:id/return',
  checkTokenUser,
  authGuard(['admin']),
  loanControllers.returnLoan
);

// Acceso a prestamos por usuario: administrador o el mismo usuario
router.get(
  '/user/:userId',
  checkTokenUser,
  authGuard(['admin', 'user']),
  loanControllers.getUserLoans
);

// Consultas generales (solo administrador)
router.get(
  '/active',
  checkTokenUser,
  authGuard(['admin']),
  loanControllers.getActiveLoans
);

router.get(
  '/overdue',
  checkTokenUser,
  authGuard(['admin']),
  loanControllers.getOverdueLoans
);

export default router;