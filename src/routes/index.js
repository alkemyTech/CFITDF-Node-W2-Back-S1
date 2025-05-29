import express from 'express';
import bookRoutes from './book-routes.js';
import userRoutes from './user-routes.js';
import categoryRoutes from './category-routes.js';
import copyRoutes from './copy-routes.js';
import loanRoutes from './loan-routes.js';
import rolRoutes from './rol-routes.js';
import authRoutes from './auth-router.js';

const router = express.Router();

router.use('/books', bookRoutes);
router.use('/users', userRoutes);
router.use('/categories', categoryRoutes);
router.use('/copies', copyRoutes);
router.use('/loans', loanRoutes);
router.use('/roles', rolRoutes);
router.use('/auth', authRoutes);


// Ruta no encontrada
router.use('*', (req, res) => {
  res.status(404).json({ 
    message: 'Ruta no encontrada',
    path: req.originalUrl
  });
});

export default router;