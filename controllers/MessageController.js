let Message = require('../models/Message');

module.exports = {
    async getMessages(req, res) {
        let author = req.params.id;
        try {
            let messages = await Message.find({author});
            res.json(messages);
        } catch (e) {
            res.sendStatus(404).send(e.toString());
        }
    },
    async createMessage(req, res) {
        let currentUser = req.user;
        let newMessage = req.body;
        try {
            let message = await new Message(newMessage);
            message.author = currentUser;
            message.save();
            currentUser.messages.push(message);
            currentUser.save();
            res.json(currentUser);
        } catch (e) {
            res.status(400).send(e.toString());
        }
    },
    async getMessageById(req, res) {
        let messageId = req.params.id;
        try {
            let message = await Message.findById(messageId);
            res.json(message);
        } catch (e) {
            res.sendStatus(400).send(e.toString());
        }
    },
    async updateMessageById(req, res) {
        let messageId = req.params.id;
        let updatedMessage = req.body;
        try {
            let updatedMessage = await Message.findByIdAndUpdate(messageId, updatedMessage, {new: true});
            res.json(updatedMessage);
        } catch (e) {
            res.sendStatus(400).send(e.toString());
        }
    },
    async deleteMessageById(req, res) {
        let messageId = req.params.id;
        try {
            let message = await Message.findById(messageId);
            message = await message.remove();
            res.status(204).json(message);
        } catch (e) {
            res.status(400).send(e.toString());
        }
    }
};