let Like = require('../models/Like');
let express = require('express');

let router = express.Router();

router.get('/', async (req, res) => {
    try {
        let likes = await Like.find({});
        res.json(likes);
    } catch (e) {
        res.sendStatus(400).send(e.toString());
    }
});

router.get('/:id', async (req, res) => {
    try {
        let like = await Like.findById(req.params.id);
        res.json(like);
    } catch (e) {
        res.sendStatus(400).send(e.toString());
    }
});

router.post('/', async (req, res) => {
    try {
        let newLike = await Like.create(req.body);
        res.json(newLike);
    } catch (e) {
        res.sendStatus(400).send(e.toString());
    }
});

router.put('/:id', async (req, res) => {
    try {
        let updatedLike = await Like.findByIdAndUpdate(req.params.id);
        res.json(updatedLike);
    } catch (e) {
        res.sendStatus(400).send(e.toString());
    }
});

router.delete('/:id', async (req, res) => {
    try {
        let deletedLike = await Like.findByIdAndRemove(req.params.id);
        res.json(deletedLike);
    } catch (e) {
        res.sendStatus(400).send(e.toString());
    }
});

module.exports = router;