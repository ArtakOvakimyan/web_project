require('dotenv').config()
const mongoose = require('mongoose');
const cors = require('cors');
const router = require('./routes/index');
const errorHandler = require('./middlewares/errorHandlingMiddleware');
const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();
const path = require('path');

const PORT = process.env.PORT || 3000;
const ADDRESS = process.env.ADDRESS;

app.use('/api', router);
app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'static')));
app.use(fileUpload({}));
app.use(errorHandler); // last Middleware



async function start() {
    try {
        await mongoose.connect(ADDRESS, {
            useNewUrlParser: true, // no warnings
        })
        app.listen(PORT, () => {
            console.log(`Server started on ${PORT}`);
        });
    }
    catch (e) {
        console.log(e);
    }
}
start()
app.get('/', function (request, response){
    response.send("<h2>Privet</h2>");
})


