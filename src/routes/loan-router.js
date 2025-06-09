/**
 * Loan Router
 * 
 * Handles loan-related routes.
 */

import express from 'express';
import { loanControllers } from '../controllers/index.js';
import { checkTokenUser } from '../middlewares/check-user.js';
import authGuard from '../middlewares/auth-guard.js';

const router = express.Router();

/**
 * Protected routes for administrators (POST, PUT)
 */

/**
 * Creates a new loan.
 * 
 * @route POST /
 * @description Creates a new loan and returns its ID.
 * @access admin
 */
router.post(
  '/',
  checkTokenUser,
  authGuard(['admin']),
  loanControllers.createLoan
);

/**
 * Returns a loan.
 * 
 * @route PUT /:id/return
 * @description Returns a loan and updates its status.
 * @access admin
 */
router.put(
  '/:id/return',
  checkTokenUser,
  authGuard(['admin']),
  loanControllers.returnLoan
);

/**
 * Public routes (GET)
 */

/**
 * Retrieves loans by user ID.
 * 
 * @route GET /user/:userId
 * @description Retrieves a list of loans by user ID.
 * @access admin, user
 */
router.get(
  '/user/:userId',
  checkTokenUser,
  authGuard(['admin', 'user']),
  loanControllers.getUserLoans
);

/**
 * Retrieves active loans.
 * 
 * @route GET /active
 * @description Retrieves a list of active loans.
 * @access admin
 */
router.get(
  '/active',
  checkTokenUser,
  authGuard(['admin']),
  loanControllers.getActiveLoans
);

/**
 * Retrieves overdue loans.
 * 
 * @route GET /overdue
 * @description Retrieves a list of overdue loans.
 * @access admin
 */
router.get(
  '/overdue',
  checkTokenUser,
  authGuard(['admin']),
  loanControllers.getOverdueLoans
);

export default router;