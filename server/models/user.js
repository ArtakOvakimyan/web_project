const mongoose = require('mongoose');
const {Schema, model} =  mongoose;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    patronymic: {
        type: String
    },
    role: {
        type: Schema.Types.ObjectId,
        ref: "Subject",
        required: true
    },
    class: {
        type: Schema.Types.ObjectId,
        ref: "Class",
        required: true
    }
});

module.exports = model("User", userSchema)