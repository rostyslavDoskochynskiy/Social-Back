let Account = require('./Account');
let bcrypt = require('bcrypt-nodejs');
let mongoose = require('../config/connection');

let {Schema} = mongoose;

let UserSchema = new Schema({
    name: String,
    surname: String,
    birthday: Date,
    town: String,
    phone: String,
    email: String,
    about: String,
    friendsRequest: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: 'friendRequest'
        }]
    },
    appliedFriendRequest: [{
        type: Schema.Types.ObjectId,
        ref: 'friendRequest'
    }],
    relationships: String,
    hobbies: String,
    userReaching: [{
        type: Schema.Types.ObjectId,
        ref: 'evaluetable'
    }],
    messages: [{
        type: Schema.Types.ObjectId,
        ref: 'message'
    }],
    chats: [{
        type: Schema.Types.ObjectId,
        ref: 'chat'
    }],
    subscriptions: [{
        type: Schema.Types.ObjectId,
        ref: 'account'
    }],
    friends: [{
        type: Schema.Types.ObjectId,
        ref: 'account'
    }]
},{
    discriminatorKey: 'kind'
});

UserSchema.methods.encryptPassword = password => bcrypt.hashSync(password, bcrypt.genSaltSync(5), null);
UserSchema.methods.validPassword = (pass, {password}) => {
    return bcrypt.compareSync(pass, password)
};

module.exports = Account.discriminator('user',UserSchema);


