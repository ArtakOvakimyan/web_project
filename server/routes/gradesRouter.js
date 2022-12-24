const Router = require('express');
const router = new Router();
const roleMiddleware = require("../middlewares/roleMiddleware");
const gradesController = require("../controllers/gradesController");
const userController = require("../controllers/userController");
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json()

router.post('/createGrade', roleMiddleware(['Principle', 'Gov', 'Teacher']), jsonParser, gradesController.creating);
router.get('/classes', roleMiddleware(["Principle", 'Gov', 'Teacher']), gradesController.getClasses);
router.get('/allGrades', roleMiddleware(["Principle", 'Gov', 'Teacher']), gradesController.getAllGrades);
router.get('/grades/:gradeId', roleMiddleware(["Principle", 'Gov', 'Teacher']), gradesController.getGrades);

module.exports = router;