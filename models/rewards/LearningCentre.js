const mongoose = require("mongoose");
const { Schema } = mongoose;


const learningCentreSchema = new Schema({
    name: { type: String, required: true },
    location: {type: String},
    schema_version: {type: String, default: 'v2'}
});

mongoose.model("LearningCentre", learningCentreSchema);
