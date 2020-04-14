const mongoose = require('mongoose');
const {Schema} = mongoose;

const userSchema = new Schema({
    googleId: String,
    slackId: String,
    email: String,
    hash: String,
    salt: String,
    username: String,
    credits: {type: Number, default: 0},
    _student: {type: Schema.Types.ObjectId, ref: 'students'},
    _teacher: {type: Schema.Types.ObjectId, ref: 'teachers'},
    isAdmin: Boolean
});

mongoose.model('users',userSchema);
//mongoose.model('users2',userSchema);
