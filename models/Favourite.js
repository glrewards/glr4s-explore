const mongoose = require('mongoose');
const {Schema} = mongoose;
const LineItemSchema = require('./Favourite');


const favouriteSchema = new Schema({
    _rewardId: {"type": Schema.Types.ObjectId, "ref": 'rewards'},
    _shopifyProductId: {"type": Schema.Types.ObjectId, "ref": 'shopifyProducts'}
});

mongoose.model('favourites',favouriteSchema);

