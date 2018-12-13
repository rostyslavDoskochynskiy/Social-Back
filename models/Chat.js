let mongoose = require('mongoose');

let { Schema } = mongoose;

let ChatSchema = new Schema({
    name: String,
    messages: [{
        type: Schema.Types.ObjectId,
        ref: 'message'
    }],
    users: [{
        type: Schema.Types.ObjectId,
        ref: 'user'
    }]
});

module.exports = mongoose.model('chat', ChatSchema);
