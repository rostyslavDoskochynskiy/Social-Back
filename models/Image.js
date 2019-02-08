let mongoose = require('../config/connection');
let Evaluetable = require('./Evaluetable');
let {Schema} = mongoose;

let ImageSchema = new Schema({
    path: String,
    title: String,
    galleries: [{
        type: Schema.Types.ObjectId,
        ref: 'gallery'
    }],
    author: {
        type: Schema.Types.ObjectId,
        ref: 'account'
    }
},{
    discriminatorKey: 'kind'
});

module.exports = Evaluetable.discriminator('image', ImageSchema);