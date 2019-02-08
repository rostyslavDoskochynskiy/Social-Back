let mongoose = require('../config/connection');

let { Schema } = mongoose;

let ChatSchema = new Schema({
    name: String,
    author: String,
    messages: [{
        type: Schema.Types.ObjectId,
        ref: 'message'
    }],
    date: Date,
    users: [{
        type: Schema.Types.ObjectId,
        ref: 'user'
    }]
});

module.exports = mongoose.model('chat', ChatSchema);
