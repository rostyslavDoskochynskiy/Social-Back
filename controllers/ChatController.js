let Chat = require('../models/Chat');

module.exports = {
    async getChats(req, res) {
        let author = req.params.id;
        try {
            let chats = await Chat.find({author});
            res.json(chats);
        } catch (e) {
            res.sendStatus(404).send(e.toString());
        }
    },
    async createChat(req, res) {
        let currentUser = req.user;
        let newChat = req.body;
        try {
            let chat = await new Chat(newChat);
            chat.users.push(currentUser);
            chat.save();
            currentUser.chats.push(chat);
            currentUser.save();
            res.json(currentUser);
        } catch (e) {
            res.status(400).send(e.toString());
        }
    },
    async getChatById(req, res) {
        let chatId = req.params.id;
        try {
            let chat = await Chat.findById(chatId);
            res.json(chat);
        } catch (e) {
            res.sendStatus(400).send(e.toString());
        }
    },
    async updateChatById(req, res) {
        let chatId = req.params.id;
        let updatedChat = req.body;
        try {
            let updatedChat = await Chat.findByIdAndUpdate(chatId, updatedChat, {new: true});
            res.json(updatedChat);
        } catch (e) {
            res.sendStatus(400).send(e.toString());
        }
    },
    async deleteChatById(req, res) {
        let chatId = req.params.id;
        try {
            let chat = await Chat.findById(chatId);
            chat = await chat.remove();
            res.status(204).json(chat);
        } catch (e) {
            res.status(400).send(e.toString());
        }
    }
};