const mongoose = require("mongoose");
const { Schema } = mongoose;

const studentSchema = new Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    maxPoints: {type: Number, default: 0},
    currentPoints: {type: Number, default: 0}
});

mongoose.model("students", studentSchema);
