let Wall = require('../models/Wall');

module.exports = {
    async getWalls(req, res) {
        let author = req.params.id;
        try {
            let walls = await Wall.find({author});
            res.json(walls);
        } catch (e) {
            res.sendStatus(404).send(e.toString());
        }
    },
    async createWall(req, res) {
        let currentUser = req.user;
        let newWall = req.body;
        try {
            let wall = await Wall.create(newWall);
            wall.author = currentUser._id;
            res.json(wall);
        } catch (e) {
            res.status(400).send(e.toString());
        }
    },
    async getWallById(req, res) {
        let wallId = req.params.id;
        try {
            let wall = await Wall.findById(wallId);
            res.json(wall);
        } catch (e) {
            res.sendStatus(400).send(e.toString());
        }
    },
    async updateWallById(req, res) {
        let wallId = req.params.id;
        let updatedWall = req.body;
        try {
            let updatedWall = await Wall.findByIdAndUpdate(wallId, updatedWall, {new: true});
            res.json(updatedWall);
        } catch (e) {
            res.sendStatus(400).send(e.toString());
        }
    },
    async deleteWallById(req, res) {
        let wallId = req.params.id;
        try {
            let wall = await Wall.findById(wallId);
            wall = await wall.remove();
            res.status(204).json(wall);
        } catch (e) {
            res.status(400).send(e.toString());
        }
    }
};