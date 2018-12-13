let PostController = require('../controllers/PostController');
let express = require('express');

let router = express.Router();

router.route('/')
    .get(PostController.getPosts)
    .post(PostController.createPost);
router.route('/:id')
    .get(PostController.getPostById)
    .put(PostController.updatePostById)
    .delete(PostController.deletePostById);

module.exports = router;