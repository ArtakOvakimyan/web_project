const Router = require('express');
const router = new Router();
const {check} = require('express-validator');
const userController = require('../controllers/userController');
const gradesController = require('../controllers/gradesController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
//[
//     check('username', "Имя пользователя не может быть пустым").notEmpty,
//     ]
//roleMiddleware(['Principle', 'Gov'])
router.post('/registration', roleMiddleware(['Principle', 'Gov']), jsonParser, userController.registration);
router.post('/login', jsonParser, userController.login);
router.get('/auth', authMiddleware, jsonParser, userController.check);
router.get('/id::id', roleMiddleware(["Principle", 'Gov', 'Teacher']), userController.getOne);
router.get('/isStudent', roleMiddleware(['Student', 'Gov']), (req, res, next) => {return res.json({a: true})});
// router.get('/id::id', roleMiddleware(["Principle", 'Gov', 'Teacher']), userController.getOne);
router.post('/deleteUser', roleMiddleware(['Principle', 'Gov']), jsonParser, userController.deleting);

module.exports = router;