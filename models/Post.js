let mongoose = require('mongoose');
let Evaluetable = require('../models/Evaluetable');

let {Schema} = mongoose;

let PostSchema = new Schema({
    dateOfPost: Date,
    text: String,
    images: [{
        type: Schema.Types.ObjectId,
        ref: 'image'
    }],
    walls: [{
        type: Schema.Types.ObjectId,
        ref: 'wall'
    }],
    author: {
        type: Schema.Types.ObjectId,
        ref: 'account'
    }
},{
    discriminatorKey: 'kind'
});

module.exports = Evaluetable.discriminator('post', PostSchema);