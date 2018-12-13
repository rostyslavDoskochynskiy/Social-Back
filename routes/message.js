let MessageController = require('../controllers/MessageController');
let express = require('express');

let router = express.Router();

router.route('/')
    .get(MessageController.getMessages)
    .post(MessageController.createMessage);
router.route('/:id')
    .get(MessageController.getMessageById)
    .put(MessageController.updateMessageById)
    .delete(MessageController.deleteMessageById);

module.exports = router;