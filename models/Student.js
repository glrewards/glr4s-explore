const mongoose = require("mongoose");
const { Schema } = mongoose;

const studentSchema = new Schema({
    _school: {type: Schema.Types.ObjectId, ref: 'School'},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    age: {type: Number, required:true},
    year: {type: Number, required: true},
    maxPoints: {type: Number, default: 0},
    currentPoints: {type: Number, default: 0},
    _currentActivities: [{type: Schema.Types.ObjectId, ref: 'CurrentActivities'}],
    _pastActivities: [{type: Schema.Types.ObjectId, ref: 'PastClasses'}]
});

mongoose.model("students", studentSchema);
