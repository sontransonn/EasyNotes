import jwt from 'jsonwebtoken';

import errorUtil from "../utils/error.util.js"

class authMiddleware {
    static authToken = async (req, res, next) => {
        const token = req.cookies.access_token;

        if (!token) {
            return next(errorUtil.generateError(401, 'Unauthorized'));
        }

        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
            if (err) {
                return next(errorUtil.generateError(401, 'Unauthorized'));
            }
            req.user = user;
            next();
        });
    }
}

export default authMiddleware