const router = require('express').Router({matchParams:true});
///query parser

// router.use(////query parser)

router.use('/users', require('./user'));
router.use('/friend-request', require('./friendsRequest'));
router.use('/groups', require('./group'));
router.use('/chats', require('./chat'));
router.use('/comments', require('./comment'));
router.use('/likes', require('./like'));
router.use('/images', require('./image'));
router.use('/galleries', require('./gallery'));
router.use('/messages', require('./message'));
router.use('/posts', require('./post'));
router.use('/walls', require('./wall'));

module.exports = router;