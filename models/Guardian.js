const mongoose = require('mongoose');
const {Schema} = mongoose;

const guardianSchema = new Schema({
    "firstName": {"type": String, "required": true},
    "lastName": {"type": String, "required": true},
    "address": {"type": String, "required": true},
    "email": {"type": String, "required": true},
    "_studentIds": [{"type": Schema.Types.ObjectId, "ref": 'students'}]
});

mongoose.model('guardians',guardianSchema);

