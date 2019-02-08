let mongoose = require('../config/connection');

let {Schema} = mongoose;

let MessageSchema = new Schema({
    text: String,
    date: Date,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'account'
    },
    chats: [{
        type: Schema.Types.ObjectId,
        ref: 'chat'
    }]
});

module.exports = mongoose.model('message', MessageSchema);