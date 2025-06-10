import jwt from 'jsonwebtoken';
import CustomError from '../utils/custom-error.js';
import config from '../config/index.js';

/**
 * Middleware function to verify the JWT token in the request cookie.
 * If the token is valid, it extracts the user data from the token and assigns it to the request object.
 * If the token is invalid or missing, it throws a CustomError with a 401 status code.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function in the stack.
 */

// export const checkTokenUser = (req, res, next) => {
//     try {
//         // Extract the token from the request cookie
//         const tokenCookie = req.cookies.token;

//         // Check if the token is missing
//         if (!tokenCookie) {
//             throw new CustomError('Usuario no autorizado', 401);
//         }
//         // Verify the token using the secret key
//         const payload = jwt.verify(tokenCookie, config.SECRET_KEY_JWT);

//         // Assign the user data to the request object
//         req.user = payload;

//         // Call the next middleware function
//         next();
//     } catch (error) {
//         // If an error occurs, pass it to the next error-handling middleware function
//         next(error);
//     }
// };
export const checkTokenUser = (req, res, next) => {
  try {
    // Busca el token SOLO en el header Authorization
    let token;
    if (req.headers.authorization) {
      const parts = req.headers.authorization.split(' ');
      if (parts.length === 2 && parts[0] === 'Bearer') {
        token = parts[1];
      }
    }

    if (!token) {
      throw new CustomError('Usuario no autorizado', 401);
    }

    const payload = jwt.verify(token, config.SECRET_KEY_JWT);
    req.user = payload;
    next();
  } catch (error) {
    console.error('Error en checkTokenUser:', error);
    next(error);
  }
};
