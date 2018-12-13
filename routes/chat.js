let ChatController = require('../controllers/ChatController');
let express = require('express');
let router = express.Router();

router.route('/')
    .get(ChatController.getChats)
    .post(ChatController.createChat);
router.route('/:id')
    .get(ChatController.getChatById)
    .put(ChatController.updateChatById)
    .delete(ChatController.deleteChatById);

module.exports = router;