const mongoose = require("mongoose");
const { Schema } = mongoose;

const locationSchema = new mongoose.Schema({type:{
        type: String,
        enum: ['Point'],
        required:true
    },
    coordinates:{
        type: [Number],
        required:true
    }});

const learningCentreSchema = new Schema({
    name: { type: String, required: true },
    address: {postCode: String, Address1: String, Address2: String, City: String, County: String, Country: String
    },
    location: locationSchema,
    schema_version: {type: String, default: 'v3'}
});
mongoose.model("LearningCentre", learningCentreSchema);
