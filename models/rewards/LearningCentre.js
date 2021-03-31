const mongoose = require("mongoose");
const { Schema } = mongoose;


const learningCentreSchema = new Schema({
    name: { type: String, required: true },
    address: {postCode: String, Address1: String, Address2: String, City: String, County: String, Country: String
    },
    location: {
        type:{
            type: String,
            enum: ['Point'],
            required:true
        },
        coordinates:{
            type: [Number],
            required:true
        }
    },
    schema_version: {type: String, default: 'v3'}
});
mongoose.model("LearningCentre", learningCentreSchema);
