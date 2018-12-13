let CommentController = require('../controllers/CommentController');
let express = require('express');
let router = express.Router();

router.route('/')
    .get(CommentController.getComments)
    .post(CommentController.createComment);
router.route('/:id')
    .get(CommentController.getCommentById)
    .put(CommentController.updateUserById)
    .delete(CommentController.deleteCommentById);

module.exports = router;