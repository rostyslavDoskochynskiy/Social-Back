let Group = require('../models/Group');
let express = require('express');

let router = express.Router();

router.get('/', async (req, res) => {
    try {
        let groups = await Group.find({});
        res.json(groups);
    } catch (e) {
        res.sendStatus(400).send(e.toString());
    }
});

router.get('/:id', async (req, res) => {
    try {
        let group = await Group.findById(req.params.id);
        res.json(group);
    } catch (e) {
        res.sendStatus(400).send(e.toString());
    }
});

router.post('/', async (req, res) => {
    try {
        let newGroup = await Group.create(req.body);
        res.json(newGroup);
    } catch (e) {
        res.sendStatus(400).send(e.toString());
    }
});

router.put('/:id', async (req, res) => {
    try {
        let updatedGroup = await Group.findByIdAndUpdate(req.params.id);
        res.json(updatedGroup);
    } catch (e) {
        res.sendStatus(400).send(e.toString());
    }
});

router.delete('/:id', async (req, res) => {
    try {
        let deletedGroup = await Group.findByIdAndRemove(req.params.id);
        res.json(deletedGroup);
    } catch (e) {
        res.sendStatus(400).send(e.toString());
    }
});

module.exports = router;