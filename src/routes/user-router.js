/**
 * User Router
 * 
 * Handles user-related routes.
 */

import express from "express";
import { userControllers } from "../controllers/index.js";
import { checkTokenUser } from "../middlewares/check-user.js";
import authGuard from "../middlewares/auth-guard.js";
import { validateUserData } from "../middlewares/validate-user-data.js";

const router = express.Router();

/**
 * Protected routes for administrators (POST, PUT, DELETE)
 */

/**
 * Creates a new user.
 * 
 * @route POST /
 * @description Creates a new user and returns its ID.
 * @access admin
 */
router.post(
  "/",
  checkTokenUser,
  authGuard(["admin"]),
  validateUserData,
  userControllers.create
);

/**
 * Updates an existing user.
 * 
 * @route PUT /:id
 * @description Updates an existing user and returns its updated data.
 * @access admin
 */
router.put(
  "/:id",
  checkTokenUser,
  authGuard(["admin"]),
  validateUserData,
  userControllers.update
);

/**
 * Deletes a user.
 * 
 * @route DELETE /:id
 * @description Deletes a user and returns a success message.
 * @access admin
 */
router.delete(
  "/:id",
  checkTokenUser,
  authGuard(["admin"]),
  userControllers.delete
);

/**
 * Public routes (GET)
 */

/**
 * Retrieves all users.
 * 
 * @route GET /
 * @description Retrieves a list of all users.
 */
router.get("/", userControllers.getAll);

/**
 * Retrieves a user by DNI.
 * 
 * @route GET /dni/:dni
 * @description Retrieves a user by DNI.
 */
router.get("/dni/:dni", userControllers.getByDni);

/**
 * Retrieves users by role.
 * 
 * @route GET /role/:roleId
 * @description Retrieves a list of users by role ID.
 */
router.get("/role/:roleId", userControllers.getByRole);

/**
 * Retrieves a user by ID.
 * 
 * @route GET /:id
 * @description Retrieves a user by ID.
 */
router.get("/:id", userControllers.getById); 

export default router;
