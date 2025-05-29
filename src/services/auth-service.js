import bcrypt from 'bcryptjs';
import CustomError from '../utils/custom-error.js';
import { UserService } from './user-service.js';

const userService = new UserService();

/**
 * Authentication service class.
 */
export class AuthService {

      /**
   * Authenticates a user with the provided email and password.
   * 
   * @param {string} email - The user's email.
   * @param {string} password - The user's password.
   * @returns {Promise<object>} The authenticated user object.
   * @throws {CustomError} If the credentials are invalid.
   */
    async login(email, password) {
        try {
            // Retrieve the user by email
            const user = await userService.getByEmail(email);
            if (!user) {
                // If the user is not found, throw an error
                throw new CustomError("User  not found", 404);
            }

            // Compare the provided password with the stored hash
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            // If the password is invalid, throw an error
            throw new CustomError("Invalid password", 401);
        }

        // Return the authenticated user
        return user;
    } catch (error) {
      // If any error occurs, rethrow it with a more informative message
      throw new CustomError("Authentication failed", 401, error);
    }
  }
}