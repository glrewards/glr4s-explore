const mongoose = require('mongoose');
const {Schema} = mongoose;
const favouriteSchema = require('./Favourite');

/*
I have created the location as subdocument here because I want to have mandatory fields on location but
the location itself has to remain optional. If I include it as a nested object then location becomes
mandatory because the sub items are mandatory which makes sense if you stop thinking in Object Oriented terms

This will result in the location getting an _id field but I could supress this if it was an issue
 */
const locationSchema = new mongoose.Schema({type:{
        type: String,
        enum: ['Point'],
        required:true
    },
    coordinates:{
        type: [Number],
        required:true
    }});

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
    "address": {PostCode: String, Address1: String, Address2: String, City: String, County: String, Country: String
    },
    "location": locationSchema,
    "_relatedUserIds": [{"type": Schema.Types.ObjectId, "ref": 'related'}],
    "containers":[{"_containerId": Schema.Types.ObjectId,"name": String, "type": String, "code": String}],
    "favourites":[favouriteSchema],
    "resetNeeded": Boolean,
    "schema_version": {type: String, default: 'v4'}
});

mongoose.model('users',userSchema);

