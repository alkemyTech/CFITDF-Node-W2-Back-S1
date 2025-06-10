import jwt from 'jsonwebtoken';
import config from '../config/index.js';
import  { AuthService } from '../services/auth-service.js';

const authService = new AuthService();

/**
 * Login Controller
 * 
 * Handles user login and returns a JWT token upon successful authentication.
 * 
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
export const loginController = async (req, res, next) => {
    try {
        // Extract email and password from the request body
        const { email, password } = req.body;

        // Validate request body
        if (!email || !password) {
        return res.status(400).json({ message: 'Se requieren email y password' });
        }

        // Authenticate the user using the AuthService
        const user = await authService.login(email, password);

        // Generate a JWT token for the authenticated user
        const token = jwt.sign(
            {
                id: user.id,
                id_rol: user.id_rol,      // <-- agrega el rol
                email: user.email         
            },
            config.SECRET_KEY_JWT,
            { expiresIn: '2h' }
            );

        // Set the token in a cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
            maxAge: 2 * 60 * 60 * 1000 // 2 hour
        });

        
        user.password = token;

        // Respond with the authenticated user data
        res.status(200).json({ message: 'Login exitoso', user });
    } catch (error) {
        next(error);
    }
};