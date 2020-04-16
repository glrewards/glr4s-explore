const mongoose = require("mongoose");
const { Schema } = mongoose;

const issuerSchema = new Schema({
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
