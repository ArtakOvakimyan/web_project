const mongoose = require('mongoose');
const {Schema, model} =  mongoose;

const subjectSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    }
});

module.exports = model("Subject", subjectSchema);