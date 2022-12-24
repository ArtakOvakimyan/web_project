const mongoose = require('mongoose');
const {Schema, model} =  mongoose;

const markSchema = new Schema({
    student: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    subject: {
        type: Schema.Types.ObjectId,
        ref: "Subject"
    },
    value: {
        type: Number,
        min: 0,
        max: 5
    }
});

module.exports = model("Mark", markSchema);