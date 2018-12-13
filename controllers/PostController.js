let Wall = require('../models/Wall');
let Post = require('../models/Post');

module.exports = {
    async getPosts(req, res) {
        let author = req.params.id;
        try {
            let posts = await Post.find({author});
            res.json(posts);
        } catch (e) {
            res.sendStatus(404).send(e.toString());
        }
    },
    async createPost(req, res) {
        let currentUser = req.user;
        let newPost = req.body;
        try {
            let post = await Post.create(newPost);
            post.author = currentUser.id;
            console.log(post);
            res.json(post);
        } catch (e) {
            res.status(400).send(e.toString());
        }
    },
    async getPostById(req, res) {
        let postId = req.params.id;
        try {
            let post = await Post.findById(postId);
            res.json(post);
        } catch (e) {
            res.sendStatus(400).send(e.toString());
        }
    },
    async updatePostById(req, res) {
        let postId = req.params.id;
        let updatedPost = req.body;
        try {
            let updatedPost = await Post.findByIdAndUpdate(postId, updatedPost, {new: true});
            res.json(updatedPost);
        } catch (e) {
            res.sendStatus(400).send(e.toString());
        }
    },
    async deletePostById(req, res) {
        let postId = req.params.id;
        try {
            let post = await Post.findById(postId);
            post = await post.remove();
            res.status(204).json(post);
        } catch (e) {
            res.status(400).send(e.toString());
        }
    }
};