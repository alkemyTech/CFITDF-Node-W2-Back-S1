import express from 'express';
import { loanControllers } from '../controllers/index.js';

const router = express.Router();

router.get('/active', loanControllers.getActiveLoans);
router.get('/overdue', loanControllers.getOverdueLoans);
router.get('/user/:userId', loanControllers.getUserLoans);
router.post('/', loanControllers.createLoan);
router.put('/:id/return', loanControllers.returnLoan);

export default router;