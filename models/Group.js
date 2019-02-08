let Account = require('./Account');
let mongoose = require('../config/connection');

let {Schema} = mongoose;

let GroupSchema = new Schema({
    name: String,
    desc: String,
    subscribers: [{
        type: Schema.Types.ObjectId,
        ref: 'account'
    }],
    groupReachings: [{
        type: Schema.Types.ObjectId,
        ref: 'evaluetable'
    }]
},{
    discriminatorKey: 'kind'
});

module.exports = Account.discriminator('group', GroupSchema);