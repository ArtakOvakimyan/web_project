const mongoose = require('mongoose');
const {Schema, model} =  mongoose;

const classSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    }
});

module.exports = model("Class", classSchema);