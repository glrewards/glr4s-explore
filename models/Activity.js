const mongoose = require('mongoose');
const {Schema} = mongoose;

const activitySchema = new Schema({
    activityName: {
        type: String,
        lowercase:true,
        ref: _id
    },

    rewardPoints: {
        type: Number,
        default: 0
    },

    _category: {
        type: String,
        Category: {type: Schema.Types.ObjectId, ref: 'Category'},
        required:true
    },
    _schoolClass:{type: Schema.Types.ObjectId, ref: 'SchoolClass'},
    _students: [{type:Schema.Types.ObjectId, ref: 'Student'}]

});

mongoose.model('Activity',activitySchema);

