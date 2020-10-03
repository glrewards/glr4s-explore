const mongoose = require('mongoose');
const {Schema} = mongoose;
const favouriteSchema = require('./Favourite');


const userSchema = new Schema({
    "googleId": String,
    "slackId": String,
    "email": String,
    "hash": String,
    "salt": String,
    "ELId": {"type":String},
    "username": {"type": String, "unique":true},
    "credits": {"type": Number, "default": 0},
    "_student": {"type": Schema.Types.ObjectId, "ref": 'students'},
    "_centreManager": {"type": Schema.Types.ObjectId, "ref": 'teachers'},
    "_learningCentreId": {"type": Schema.Types.ObjectId, "ref": 'learningcentres'},
    "roles": [String],
    "firstName": {"type": String},
    "lastName": {"type": String},
    "address": {"type": String},
    "_relatedUserIds": [{"type": Schema.Types.ObjectId, "ref": 'related'}],
    "favourites":[favouriteSchema],
    "resetNeeded": Boolean
});


mongoose.model('users',userSchema);
mongoose.model('related', userSchema, 'related');

