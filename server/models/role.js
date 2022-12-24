const mongoose = require('mongoose');
const {Schema, model} =  mongoose;

const roleSchema = new Schema({
    value: {
        type: String,
        unique: true,
        default: "Student"
    }
});

module.exports = model("Role", roleSchema);