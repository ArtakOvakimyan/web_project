const User = require("../models/user");
const Role = require("../models/role");
const Subject = require("../models/subject");
const Mark = require("../models/mark");
const Class = require("../models/class");
const ApiError = require("../error/apiError");

class GradesController {
    async creating(req, res, next) {
        try {
            let mark = req.body;
            const user_id = await User.findOneAndUpdate({username: mark.username}, function (err) {
                if (err) return next(ApiError.notFound('Такого логина не существует'), req, res);
            });
            const subject_id = await Subject.findOneAndUpdate({name: mark.subject}, function (err) {
                if (err) return next(ApiError.notFound('Такого предмета нет'), req, res);
            });
            const newMark = new Mark({
                student: user_id,
                subject: subject_id,
                value: mark.value
            });
            await newMark.save(
                function (err) {
                    if (err) {
                        return next(ApiError.internal("Не удалось добавить оценку"), req, res);
                    }
                }
            );
            res.json({message: "Оценка добавлена"});
        }
        catch (e) {
            console.log(e);
            next(ApiError.internal("Ошибка при добавлении"), req, res);
        }
    }

    async getClasses(req, res, next) {
        try {
            const classesList = await Class.find({});
            res.json(classesList);
        }
        catch (e) {
            console.log(e);
            next(ApiError.internal("Возникла ошибка"), req, res);
        }
    }

    async getAllGrades(req, res, next) {
        try {
            const gradesList = await Mark.find({});
            const resList = [];
            for (let grade of gradesList) {
                let user = await User.findById(grade.student);
                let subject = await Subject.findById(grade.subject);
                resList.push(
                    {
                        _id: grade._id,
                        student: `${user.name} ${user.surname} ${user.patronymic ?? ''}`,
                        subject: subject.name,
                        value: grade.value
                    });
            }
            res.json(resList);
        }
        catch (e) {
            console.log(e);
            next(ApiError.internal("Возникла ошибка"), req, res);
        }
    }

    async getGrades(req, res, next) {
        try {
            const students = await User.find({class: req.params['gradeId']})
            const resList = [];
            const resList2 = [];
            for (let student of students) {
                let lst = await Mark.find({student: student._id});
                for (let grade of lst) {
                    resList.push(grade);
                }
            }
            for (let grade of resList) {
                let user = await User.findById(grade.student);
                let subject = await Subject.findById(grade.subject);
                resList2.push(
                    {
                        _id: grade._id,
                        student: `${user.name} ${user.surname} ${user.patronymic ?? ''}`,
                        subject: subject.name,
                        value: grade.value
                    });
            }
            res.json(resList2);
        }
        catch (e) {
            console.log(e);
            next(ApiError.internal("Возникла ошибка"), req, res);
        }
    }
}

module.exports = new GradesController();