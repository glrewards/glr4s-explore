const mongoose = require("mongoose");
const { Schema } = mongoose;

const issuerSchema = new Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String
    }
});

mongoose.model("Issuer", issuerSchema);
