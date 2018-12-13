let Comment = require('../models/Comment');

module.exports = {
    async getComments(req, res) {
        console.log(req.body);
        let author = req.user.id;
        try {
            let comments = await Comment.find({author});
            res.json(comments);
        } catch (e) {
            res.sendStatus(404).send(e.toString());
        }
    },
    async createComment(req, res) {
        let currentUser = req.user;
        let newComment = req.body;
        console.log(newComment);
        try {
            let comment = await new Comment(newComment);
            comment.author = currentUser;
            comment.save();
            currentUser.comments.push(comment);
            currentUser.save();
            res.json(comment);
        } catch (e) {
            res.status(400).send(e.toString());
        }
    },
    async getCommentById(req, res) {
        let commentId = req.params.id;
        try {
            let comment = await Comment.findById(commentId);
            res.json(comment);
        } catch (e) {
            res.sendStatus(400).send(e.toString());
        }
    },
    async updateUserById(req, res) {
        let commentId = req.params.id;
        let updatedComment = req.body;
        try {
            let updatedComment = await Comment.findByIdAndUpdate(commentId, updatedComment, {new: true});
            res.json(updatedComment);
        } catch (e) {
            res.sendStatus(400).send(e.toString());
        }
    },
    async deleteCommentById(req, res) {
        let commentId = req.params.id;
        try {
            let comment = await Comment.findById(commentId);
            comment = await comment.remove();
            res.status(204).json(comment);
        } catch (e) {
            res.status(400).send(e.toString());
        }
    }
};