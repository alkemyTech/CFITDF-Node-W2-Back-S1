/**
 * Index Router
 * 
 * Handles routing for the entire application.
 */

import express from 'express';
import bookRoutes from './book-router.js';
import userRoutes from './user-router.js';
import categoryRoutes from './category-router.js';
import copyRoutes from './copy-router.js';
import loanRoutes from './loan-router.js';
import rolRoutes from './rol-router.js';
import authRoutes from './auth-router.js';

const router = express.Router();

/**
 * Mounts routes for each module
 */

/**
 * Books routes
 */
router.use('/books', bookRoutes);

/**
 * Users routes
 */
router.use('/users', userRoutes);

/**
 * Categories routes
 */
router.use('/categories', categoryRoutes);

/**
 * Copies routes
 */
router.use('/copies', copyRoutes);

/**
 * Loans routes
 */
router.use('/loans', loanRoutes);

/**
 * Roles routes
 */
router.use('/roles', rolRoutes);

/**
 * Authentication routes
 */
router.use('/auth', authRoutes); // 

/**
 * 404 Not Found route
 */
router.use('*', (req, res) => {
  res.status(404).json({ 
    message: 'Ruta no encontrada',
    path: req.originalUrl
  });
});

export default router;
