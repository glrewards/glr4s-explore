const mongoose = require('mongoose');
const {Schema} = mongoose;

const userSchema = new Schema({
    googleId: String,
    credits: {type: Number, default: 0},
    _student: {type: Schema.Types.ObjectId, ref: 'students'},
    _teacher: {type: Schema.Types.ObjectId, ref: 'teachers'}
});

mongoose.model('users',userSchema);
//mongoose.model('users2',userSchema);
