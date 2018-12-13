let WallController = require('../controllers/WallController');
let express = require('express');

let router = express.Router();

router.route('/')
    .get(WallController.getWalls)
    .post(WallController.createWall);
router.route('/:id')
    .get(WallController.getWallById)
    .put(WallController.updateWallById)
    .delete(WallController.deleteWallById);

module.exports = router;