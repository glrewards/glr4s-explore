const mongoose = require("mongoose");
const { Schema } = mongoose;

const SchoolSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    address: {type: String},
    shopifCustomerygid: String
});

mongoose.model("schools", schoolsSchema);
