const Role = require('../models/role');
const User = require('../models/user');
const UserClass = require('../models/class');
const ApiError = require('../error/apiError');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {validationResult} = require('express-validator');
const mongoose = require("mongoose");
require('dotenv').config();

const generateAccessToken = (username, id, role, userClass) => {
    const payLoad = {
        username,
        id,
        role,
        userClass
    }
    return jwt.sign(payLoad, process.env.SECRET_KEY, {expiresIn: "24h"}, undefined);
}

class UserController {
    async registration(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                console.log(errors);
                return next(ApiError.badRequest('Ошибка при регистрации'), req, res);
            }
            const {username, name, surname, patronymic, role, userClass} = req.body;
            console.log(req.body)
            const cl = await UserClass.findOneAndUpdate({name: userClass}, function (err) {
                if (err) return next(ApiError.notFound('Такого класса нет'), req, res);
            });
            const rl = await Role.findOneAndUpdate({value: role}, function (err) {
                if (err) return next(ApiError.notFound('Такой роли нет'), req, res);
            });
            const usernameCandidate = await User.findOne({username: username});
            if (usernameCandidate) {
                next(ApiError.badRequest('Такой пользователь уже существует'), req, res);
            }
            const userCandidate = await User.findOne({
                name: name,
                surname: surname,
                patronymic: patronymic,
                role: rl._id,
                userClass: cl._id
            })
            if (userCandidate) {
                return res.json({message: "Такой пользователь уже существует"});
            }
            const d = new Date();
            const pass = `${d}${username}`;
            const initialPass = bcrypt.hashSync(pass, 6);
            const newUser = new User({
                username: username,
                password: initialPass,
                name: name,
                surname: surname,
                role: rl._id,
                class: cl._id
            });
            await newUser.save(
                function (err) {
                    if (err) {
                        return next(ApiError.internal("Не удалось зарегистрировать пользователя"), req, res);
                    }
                }
            );
            return res.json({message: `Пользователь создан. Пароль: ${pass}`});
        } catch (e) {
            console.log(e);
            next(ApiError.internal("Ошибка при регистрации"), req, res);
        }
    }

    async login(req, res, next) {
        try {

            const {username, password} = req.body;
            const user = await User.findOne({username: username})
            if (!user) {
                return next(ApiError.badRequest('Пользователь с таким именем не существует'), req, res);
            }
            console.log(req.body);
            const validPassword = bcrypt.compareSync(password, user.password);
            if (!validPassword) {
                return next(ApiError.badRequest('Неверный пароль'), req, res);
            }
            console.log(user);
            const cl = await UserClass.findOneAndUpdate({_id: user.class._id}, function (err) {
                if (err) return next(ApiError.notFound('Такого класса нет'), req, res);
            });
            const rl = await Role.findOneAndUpdate({_id: user.role._id}, function (err) {
                if (err) return next(ApiError.notFound('Такой роли нет'), req, res);
            });
            const token = generateAccessToken(user.username, user._id, rl.value, cl.name);
            return res.json({token});
        } catch (e) {
            console.log(e);
            return next(new ApiError("Ошибка при авторизации", req, res));
        }
    }

    async check(req, res, next) {
        try {
            const token = generateAccessToken(req.user.username, req.user.id, req.user.role, req.user.userClass);
            return res.json({token});
        } catch (e) {
            next(new ApiError(e, req, res));
        }
    }

    async getOne(req, res, next) {
        const user = await User.findOne({_id: req.params['id']});
        const rl = await Role.findOneAndUpdate({_id: user.role}, function (err) {
            if (err) return next(ApiError.notFound('Такой роли нет'), req, res);
        });
        res.json({Name: user.name, Surname: user.surname, Role: rl.value});
    }

    async deleting(req, res, next) {
        try {
            const user = await User.findOne({username: req.body['username']});
            console.log(req.body['username'])
            if (!user) {
                return next(ApiError.badRequest('Пользователь с таким логином не существует'), req, res);
            }
            User.deleteOne({username: req.body['username']}, function(err) {
                if (err) return next(ApiError.badRequest('Не удалось удалить пользователь'), req, res);
            });
            res.json({message: "Пользователь удалён"});
        }
        catch(e) {
            next(ApiError.internal("Ошибка при удалении"), req, res);
        }
    }
}

module.exports = new UserController();
