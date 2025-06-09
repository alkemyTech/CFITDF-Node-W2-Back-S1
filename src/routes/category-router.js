/**
 * Category Router
 * 
 * Handles category-related routes.
 */

import express from 'express';
import { categoryControllers } from '../controllers/index.js';
import { checkTokenUser } from '../middlewares/check-user.js';
import authGuard from '../middlewares/auth-guard.js';

const router = express.Router();

/**
 * Protected routes for administrators (POST, PUT, DELETE)
 */
/**
 * Creates a new category.
 * 
 * @route POST /
 * @description Creates a new category and returns its ID.
 * @access admin
 */
router.post(
  '/',
  checkTokenUser,
  authGuard(['admin']),
  categoryControllers.create
);

/**
 * Updates an existing category.
 * 
 * @route PUT /:id
 * @description Updates an existing category and returns its updated data.
 * @access admin
 */
router.put(
  '/:id',
  checkTokenUser,
  authGuard(['admin']),
  categoryControllers.update
);

/**
 * Deletes a category.
 * 
 * @route DELETE /:id
 * @description Deletes a category and returns a success message.
 * @access admin
 */
router.delete(
  '/:id',
  checkTokenUser,
  authGuard(['admin']),
  categoryControllers.delete
);

/**
 * Public routes (GET)
 */
/**
 * Retrieves all categories.
 * 
 * @route GET /
 * @description Retrieves a list of all categories.
 */
router.get('/', categoryControllers.getAll);

/**
 * Retrieves a category by ID.
 * 
 * @route GET /:id
 * @description Retrieves a category by ID.
 */
router.get('/:id', categoryControllers.getById);

// ROUTE NOT IN USE. Due to the corresponding controller not being created yet.
// /**
//  * Retrieves books by category.
//  * 
//  * @route GET /:id/books
//  * @description Retrieves a list of books by category ID.
//  *
// router.get('/:id/books', categoryControllers.getCategoryBooks);

export default router;
