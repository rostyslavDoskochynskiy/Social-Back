let mongoose = require('../config/connection');
let { Schema } = mongoose;

let friendRequestSchema = new Schema({
    fromUser: {
        type: String,
        ref: 'user'
    },
    toUser: {
        type: String,
        ref: 'user'
    },
    dateRequest: Date,
    requested: Boolean,
    approved: Boolean
});

module.exports = mongoose.model('friendRequest',friendRequestSchema);
