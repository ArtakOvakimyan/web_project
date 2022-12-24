const handleError = require('../middlewares/errorHandlingMiddleware');
const ApiError = require("../error/apiError");
require('dotenv').config()
const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    if (req.method === 'OPTIONS'){
        next();
    }
    try {
        const token = req.head.authorization.split(' ')[1];
        if (!token) {
            return handleError(ApiError.forbidden('Пользователь не авторизован'), req, res);
        }
        req.user = jwt.verify(token, process.env.SECRET_KEY, undefined, undefined);
        next();
    }
    catch(e) {
        return handleError(ApiError.forbidden('Пользователь не авторизован'), req, res);
    }
}