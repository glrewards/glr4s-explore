const mongoose = require('mongoose');
const {Schema} = mongoose;
const userRoleSchema = require('./UserRole');


const userSchema = new Schema({
    googleId: String,
    slackId: String,
    email: String,
    hash: String,
    salt: String,
    ELId: {type:String, unique: true},
    username: {type: String, unique:true},
    credits: {type: Number, default: 0},
    _student: {type: Schema.Types.ObjectId, ref: 'students'},
    _teacher: {type: Schema.Types.ObjectId, ref: 'teachers'},
    _learningCentreId: {type: Schema.Types.ObjectId, ref: 'learningcentres'},
    isAdmin: Boolean,
    roles: [userRoleSchema],
    resetNeeded: Boolean
});

mongoose.model('users',userSchema);

