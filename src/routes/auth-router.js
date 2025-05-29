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
 */
authRouter.post('/login', loginController);

export default authRouter;