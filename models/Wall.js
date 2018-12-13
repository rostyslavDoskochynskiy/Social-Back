let mongoose = require('mongoose');

let {Schema} = mongoose;

let WallSchema = new Schema({
    posts: [{
        type: Schema.Types.ObjectId,
        ref: 'post'
    }],
    author: {
        type: Schema.Types.ObjectId,
        ref: 'account'
    }
});

module.exports = mongoose.model('wall', WallSchema);