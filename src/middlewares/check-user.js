import jwt from 'jsonwebtoken';
import CustomError from '../utils/custom-error.js';
import config from '../config/index.js';

export const checkTokenUser = (req, res, next) => {
    try {
        const tokenCookie = req.cookies.token;
        if (!tokenCookie) throw new CustomError('Usuario no autorizado', 401);
        const payload = jwt.verify(tokenCookie, config.SECRET_KEY_JWT);
        req.user = payload;

        next();
    } catch (error) {
        next(error);
    }
};