const mongoose = require("mongoose");
const { Schema } = mongoose;

const teacherSchema = new Schema({
    _school: {type: Schema.Types.ObjectId, ref: 'School'},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    classes: [{type: Schema.Types.ObjectId, ref: 'classes'}]
});

mongoose.model("teachers", teacherSchema);
