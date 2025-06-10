/**
 * Authentication Router
 * 
 * Handles user authentication-related routes.
 */

import express from "express";
import { loginController } from '../controllers/auth-controller.js';

const authRouter = express.Router();

/**
 * Handles user login.
 * 
 * @route POST /login
 * @description Authenticates a user and returns a token.
 */
authRouter.post('/login', loginController);

export default authRouter;