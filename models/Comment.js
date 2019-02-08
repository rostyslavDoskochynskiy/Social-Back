let mongoose = require('../config/connection');

let {Schema} = mongoose;

let CommentSchema = new Schema({
    text: String,
    date: Date,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
});

module.exports = mongoose.model('comment', CommentSchema);