let Chat = require('../models/Chat');
let User = require('../models/User');

module.exports = {
    async getChats(req, res) {
        let author = req.user._id;
        try {
            let chats = await Chat.find({author});
            let chatWith = [];
            for (const chat of chats) {
                for (const id of chat.users) {
                    const user = await User.findById(id);
                    chatWith.push(user);
                }
            }
            const response = {chats, chatWith};
            res.json(response);
        } catch (e) {
            res.sendStatus(404).send(e.toString());
        }
    },
    async createChat(req, res) {
        try {
            const currentUser = req.user;
            const { userId } = req.body;
            const user = await User.findById(userId);
            const newChat = {
                author: currentUser._id,
                name: `Chat with ${user.name} ${user.surname}`,
                date: new Date()
            };

            const allChats = await Chat.find({});

            for (const chat of allChats) {
                const chatAlreadyExist = chat.users.indexOf(user._id) !== -1;
                if(chatAlreadyExist) return res.json({message: 'Chat already exist', chat});
            }

            const chat = await Chat.create(newChat);

            currentUser.chats.push(chat);
            currentUser.save();
            user.chats.push(chat);
            user.save();
            chat.users.push(user);
            chat.save();
            res.json({ message: 'Chat created', chat});
        } catch (e) {
            res.status(400).send(e.toString());
        }
    },
    async getChatById(req, res) {
        let chatId = req.params.id;
        try {
            let chat = await Chat.findById(chatId);

            console.log('dasdasdadsasdasd')


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