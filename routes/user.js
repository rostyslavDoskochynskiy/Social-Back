let User = require('../models/User');
let express = require('express');

let router = express.Router();

router.get('/', async (req, res) => {
    try {
        let users = await User.find({});
        res.json(users);
    } catch (e) {
        e ? res.sendStatus(400) : '';
    }
});

router.get('/:id', async (req, res) => {
    try {
        let user = await User.findById(req.params.id);
        res.json(user);
    } catch (e) {
        e ? res.sendStatus(400) : '';
    }
});

router.post('/', async (req, res) => {
    try {
        let newUser = await User.create(req.body);
        res.json(newUser);
    } catch (e) {
        res.sendStatus(400).send(e.toString());
    }
});

router.put('/:id', async (req, res) => {
    try {
        let updatedUser = await User.findByIdAndUpdate(req.params.id);
        res.json(updatedUser);
    } catch (e) {
        res.sendStatus(400).send(e.toString());
    }
});

router.delete('/:id', async (req, res) => {
    try {
        let deletedUser = await User.findByIdAndRemove(req.params.id);
        res.json(deletedUser);
    } catch (e) {
        res.sendStatus(400).send(e.toString());
    }
});

module.exports = router;