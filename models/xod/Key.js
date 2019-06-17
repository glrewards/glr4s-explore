const mongoose = require('mongoose');
const {Schema} = mongoose;

const KeySchema = new Schema({
  name: {type: String, required: true},
  token: {type:String, required: true},
  expiryDate: {type: Date, require: false}
});



mongoose.model("keys", KeySchema);
