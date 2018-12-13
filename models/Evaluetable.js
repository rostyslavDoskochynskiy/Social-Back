let mongoose = require('mongoose');

let {Schema} = mongoose;

let EvaluetableSchema = new Schema({
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'comment'
    }],
    likes: [{
        type: Schema.Types.ObjectId,
        ref: 'like'
    }]
},{
    discriminatorKey: 'kind'
});

module.exports = mongoose.model('evaluetable', EvaluetableSchema);