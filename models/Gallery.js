let mongoose = require('mongoose');

let {Schema} = mongoose;

let GallerySchema = new Schema({
    images: [{
        type: Schema.Types.ObjectId,
        ref: 'image'
    }],
    author: {
        type: Schema.Types.ObjectId,
        ref: 'account'
    },
    repostsImages: [{
        type: Schema.Types.ObjectId,
        ref: 'image'
    }]
});

module.exports = mongoose.model('gallery', GallerySchema);