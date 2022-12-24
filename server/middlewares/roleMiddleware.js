const handleError = require('../middlewares/errorHandlingMiddleware');
const ApiError = require("../error/apiError");
const Role = require('../models/role');
require('dotenv').config();
const jwt = require('jsonwebtoken');

module.exports = function(roles) {
    return async function (req, res, next) {
        if (req.method === 'OPTIONS') {
            next();
        }
        try {
            const token = req.headers.authorization.split(' ')[1];
            if (!token) {
                return handleError(ApiError.forbidden('Пользователь не авторизован'), req, res);
            }
            const {role: role_} = jwt.verify(token, process.env.SECRET_KEY, undefined, undefined);
            const hasRight = roles.includes(role_);
            if (!hasRight) {
                return handleError(ApiError.forbidden('Недостаточно прав'), req, res);
            }
            req.user = jwt.verify(token, process.env.SECRET_KEY, undefined, undefined);
            next();
        } catch (e) {
            console.log(e);
            return handleError(ApiError.internal('Произошла ошибка авторизации'), req, res);
        }
    }
}