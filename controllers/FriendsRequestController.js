let User = require('../models/User');
let FriendsRequest = require('../models/FriendsRequest');
let mongoose = require('../config/connection');

module.exports = {
    async getFriendsRequest(req, res) {
       console.log('get all');
       res.end();
    },
    async createFriendsRequest(req, res) {
        const { toId } = req.body;
        const { _id: fromId } = req.user;
        try {
            const toUser = await User.findById(toId);
            const friendReq = {
                fromUser: req.user._id,
                toUser: toId,
                dateRequest: new Date(),
                approved: false,
                requested: true
            };

            const checkedRequest = await FriendsRequest.find({ fromUser: fromId, toUser: toId});
            const hasSuchFriendRequest = checkedRequest.length <= 0;

            if (hasSuchFriendRequest) {
                const newFriendsRequest = await FriendsRequest.create(friendReq);
                req.user.appliedFriendRequest.push(toId);
                req.user.save();
                toUser.friendsRequest.push(newFriendsRequest);
                toUser.save();
                const response = {toId, requestId: newFriendsRequest._id};
                res.json(response);
            } else {
                console.log('already requested')
            }
        } catch (e) {
            res.status(400).send(e.toString())
        }
    },
    async getFriendsRequestById(req, res) {
        const { id: reqId } = req.params;
        try {
            const response = await FriendsRequest.find({toUser: reqId});
            const users = [];
            for (const item of response) {
                let user = await User.findById(item.fromUser);
                users.push(user);
            }
            res.json(users);
        } catch (e) {
            res.status(400).send(e.toString());
        }
    },
    async updateFriendsRequestById(req, res) {
        const { id: userId } = req.params;
        const toUser = await User.findById(userId);
        const alreadyFriends = req.user.friends.indexOf(userId) !== -1;
        const alreadyFriendsToUser = toUser.friends.indexOf(req.user._id) !== -1;

        if(!alreadyFriends) {
            req.user.friends.push(toUser);
            req.user.save();
        } else {
          console.log('already fr 1')
        }

        if(!alreadyFriendsToUser){
            toUser.friends.push(req.user);
            toUser.save();
        } else {
            console.log('already fr 2')
        }

        res.json({ userId, message: 'Successfully added' });
    },
    async deleteFriendsRequestById(req, res) {
        try {
            const { id: toUserId } = req.params;
            const byAuthorRequest = await FriendsRequest.findOne({fromUser: toUserId});
            const byReceiverRequest = await FriendsRequest.findOne({toUser: toUserId});

            if(byAuthorRequest){
                const frReq = await FriendsRequest.findOneAndRemove({fromUser: toUserId});
                await User.findOneAndUpdate( {_id: frReq.fromUser}, { $pull: { appliedFriendRequest: mongoose.Types.ObjectId(req.user._id)} }, {new:true});
                await User.findOneAndUpdate( {_id: frReq.toUser}, { $pull: { friendsRequest: mongoose.Types.ObjectId(frReq._id)} }, {new:true});
            } else if(byReceiverRequest) {
                const frReq = await FriendsRequest.findOneAndRemove({toUser: toUserId});
                await User.findOneAndUpdate( {_id: frReq.fromUser}, { $pull: { appliedFriendRequest: mongoose.Types.ObjectId(toUserId)} }, {new:true});
                await User.findOneAndUpdate( {_id: frReq.toUser}, { $pull: { friendsRequest: mongoose.Types.ObjectId(frReq._id)} }, {new:true});
            }
            res.json({cancelled: true, toUser: toUserId});
        } catch (e) {
            res.sendStatus(400).send(e.toString());
        }
    }
};