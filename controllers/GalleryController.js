let Gallery = require('../models/Gallery');

module.exports = {
    async getGalleries(req, res) {
        let author = req.user.id;
        try {
            let galleries = await Gallery.find({author});
            res.json(galleries);
        } catch (e) {
            res.sendStatus(404).send(e.toString());
        }
    },
    async createGallery(req, res) {
        let currentUser = req.user;
        let newGallery = req.body;
        try {
            let gallery = await new Gallery(newGallery);
            gallery.author = currentUser;
            gallery.save();
            currentUser.gallery.push(gallery);
            currentUser.save();
            res.json(currentUser);
        } catch (e) {
            res.status(400).send(e.toString());
        }
    },
    async getGalleryById(req, res) {
        let galleryId = req.params.id;
        try {
            let gallery = await Gallery.findById(galleryId);
            res.json(gallery);
        } catch (e) {
            res.sendStatus(400).send(e.toString());
        }
    },
    async updateGalleryById(req, res) {
        let galleryId = req.params.id;
        let updatedGallery = req.body;
        try {
            let updatedGallery = await Gallery.findByIdAndUpdate(galleryId, updatedGallery, {new: true});
            res.json(updatedGallery);
        } catch (e) {
            res.sendStatus(400).send(e.toString());
        }
    },
    async deleteGalleryById(req, res) {
        let galleryId = req.params.id;
        try {
            let gallery = await Gallery.findById(galleryId);
            gallery = await gallery.remove();
            res.status(204).json(gallery);
        } catch (e) {
            res.status(400).send(e.toString());
        }
    }
};