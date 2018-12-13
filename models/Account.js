let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let AccountSchema = new Schema({
    avatar: String,
    dateOfRegistration: Date,
    login: String,
    password: String,
    wall: {
        type: Schema.Types.ObjectId,
        ref: 'wall'
    },
    gallery: {
        type: Schema.Types.ObjectId,
        ref: 'gallery'
    },
    likes: [{
        type: Schema.Types.ObjectId,
        ref: 'like'
    }],
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'comment'
    }]
},{
    discriminatorKey: 'kind'
});

module.exports = mongoose.model('account', AccountSchema);