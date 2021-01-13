const mongoose = require("mongoose");
const { Schema } = mongoose;

const learningCentreSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    location: {
        type: String,
        required: true,
        unique: true
    }
});

mongoose.model("LearningCentre", learningCentreSchema);
