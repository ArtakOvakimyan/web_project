const Router = require('express');
const router = new Router();

const userRouter = require('./userRouter');
const gradesRouter = require('./gradesRouter');

router.use('/user', userRouter);
router.use('/grades', gradesRouter)

module.exports = router;