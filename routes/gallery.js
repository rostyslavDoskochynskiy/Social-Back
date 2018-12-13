let GalleryController = require('../controllers/GalleryController');
let express = require('express');

let router = express.Router();

router.route('/')
    .get(GalleryController.getGalleries)
    .post(GalleryController.createGallery);
router.route('/:id')
    .get(GalleryController.getGalleryById)
    .put(GalleryController.updateGalleryById)
    .delete(GalleryController.deleteGalleryById);

module.exports = router;