import express from 'express';
import bookRoutes from './book-router.js';
import userRoutes from './user-router.js';
import categoryRoutes from './category-router.js';
import copyRoutes from './copy-router.js';
import loanRoutes from './loan-router.js';
import rolRoutes from './rol-router.js';
import authRoutes from './auth-router.js'; 
const router = express.Router();

router.use('/books', bookRoutes);
router.use('/users', userRoutes);
router.use('/categories', categoryRoutes);
router.use('/copies', copyRoutes);
router.use('/loans', loanRoutes);
router.use('/roles', rolRoutes);
router.use('/auth', authRoutes); // 

// Ruta no encontrada
router.use('*', (req, res) => {
  res.status(404).json({ 
    message: 'Ruta no encontrada',
    path: req.originalUrl
  });
});

export default router;
