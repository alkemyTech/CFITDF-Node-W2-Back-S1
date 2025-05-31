// Middleware de autorización por rol.
import CustomError from '../utils/custom-error.js';

const authGuard = (allowedRoles = []) => {
  return (req, res, next) => {
    const user = req.user;

    if (!user) {
      return next(new CustomError('No autenticado', 401));
    }

    if (!allowedRoles.includes(user.rol)) {
      return next(new CustomError('No autorizado', 403));
    }

    next(); 
  };
};

export default authGuard;
