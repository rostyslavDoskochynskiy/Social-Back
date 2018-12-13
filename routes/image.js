let Image = require('../models/Image');
let express = require('express');

let router = express.Router();

router.get('/', async (req, res) => {
    try {
        let images = await Image.find({});
        res.json(images);
    } catch (e) {
        res.sendStatus(400).send(e.toString());
    }
});

router.get('/:id', async (req, res) => {
    try {
        let image = await Image.findById(req.params.id);
        res.json(image);
    } catch (e) {
        res.sendStatus(400).send(e.toString());
    }
});

router.post('/', async (req, res) => {
    try {
        let newImage = await Image.create(req.body);
        res.json(newImage);
    } catch (e) {
        res.sendStatus(400).send(e.toString());
    }
});

router.put('/:id', async (req, res) => {
    try {
        let updatedImage = await Image.findByIdAndUpdate(req.params.id);
        res.json(updatedImage);
    } catch (e) {
        res.sendStatus(400).send(e.toString());
    }
});

router.delete('/:id', async (req, res) => {
    try {
        let deletedImage = await Image.findByIdAndRemove(req.params.id);
        res.json(deletedImage);
    } catch (e) {
        res.sendStatus(400).send(e.toString());
    }
});

module.exports = router;