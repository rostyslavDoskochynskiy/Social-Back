let mongoose = require('mongoose');

let {Schema} = mongoose;

let LikeSchema = new Schema({
    date: Date,
    value: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'account'
    },
    target: [{
        type: Schema.Types.ObjectId,

    }]
});

module.exports = mongoose.model('like', LikeSchema);