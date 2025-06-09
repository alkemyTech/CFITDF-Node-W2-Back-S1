/**
 * Role Router
 * 
 * Handles role-related routes.
 */

import express from 'express';
import { rolControllers } from '../controllers/index.js';
import { checkTokenUser } from '../middlewares/check-user.js';
import authGuard from '../middlewares/auth-guard.js';

const router = express.Router();

/**
 * Protected routes for administrators (GET, POST, PUT, DELETE)
 */

/**
 * Retrieves all roles.
 * 
 * @route GET /
 * @description Retrieves a list of all roles.
 * @access admin
 */
router.get(
  '/',
  checkTokenUser,
  authGuard(['admin']),
  rolControllers.getAll
);

/**
 * Retrieves a role by ID.
 * 
 * @route GET /:id
 * @description Retrieves a role by ID.
 * @access admin
 */
router.get(
  '/:id',
  checkTokenUser,
  authGuard(['admin']),
  rolControllers.getById
);

/**
 * Creates a new role.
 * 
 * @route POST /
 * @description Creates a new role and returns its ID.
 * @access admin
 */
router.post(
  '/',
  checkTokenUser,
  authGuard(['admin']),
  rolControllers.create
);

/**
 * Updates an existing role.
 * 
 * @route PUT /:id
 * @description Updates an existing role and returns its updated data.
 * @access admin
 */
router.put(
  '/:id',
  checkTokenUser,
  authGuard(['admin']),
  rolControllers.update
);

/**
 * Deletes a role.
 * 
 * @route DELETE /:id
 * @description Deletes a role and returns a success message.
 * @access admin
 */
router.delete(
  '/:id',
  checkTokenUser,
  authGuard(['admin']),
  rolControllers.delete
);


/**
 * Route not in use due to the lack of a corresponding controller.
 * 
 * Retrieves users by role.
 * 
 * @route GET /:id/users
 * @description Retrieves a list of users by role ID.
 */
// router.get('/:id/users', rolControllers.getRoleUsers);

export default router;