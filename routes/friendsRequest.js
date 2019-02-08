let FriendsRequestController = require('../controllers/FriendsRequestController');
let express = require('express');

let router = express.Router();

router.route('/')
    .get(FriendsRequestController.getFriendsRequest)
    .post(FriendsRequestController.createFriendsRequest);
router.route('/:id')
    .get(FriendsRequestController.getFriendsRequestById)
    .put(FriendsRequestController.updateFriendsRequestById)
    .delete(FriendsRequestController.deleteFriendsRequestById);

module.exports = router;


// const { id: toUserId } = req.params;
//
// const frReq = await FriendsRequest.findByIdAndRemove('5c349e970cbe47235460637d');
//
// await User.findOneAndUpdate( {_id: frReq.fromUser}, { $pull: { appliedFriendRequest: mongoose.Types.ObjectId(frReq._id)} },{new:true} );
//
// await User.findOneAndUpdate( {_id: frReq.toUser}, { $pull: { friendsRequest: mongoose.Types.ObjectId(frReq._id)} },{new:true});
//
// res.json({message: 'Request canceled', toUser: user1});