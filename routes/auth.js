let router = require('express').Router();
let { signUp, signIn, logout } = require('../controllers/AuthController');
let User = require('../models/User');

router.get('/principal', async (req, res) => {
    if (req.user) {
        let user = await User.findById(req.user._id);
        user = user.toObject();
        res.json({
            auth: true,
            user
        });
    } else {
        res.json(null);
    }
});

router.get('/principal/friends', async (req, res) => {
   if(req.user) {
       try {
           let user = await User.findOne(req.user._id);
           let friendsId = user.friends;
           let friends = [];
           for (const friend of friendsId) {
               let user = await User.find(friend);
               friends.push(user[0]);
           }
           res.json(friends);
       } catch (e) {
           res.sendStatus(404).send(e.toString());
       }
   } else {
       res.json(null);
   }
});

router.delete('/principal/friends/:id', async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id);
    console.log(user);
    const indexOf = user.friends.indexOf(req.user._id);
    user.friends.splice(indexOf, 1);
    user.save();
    const indexOfdeletedFriend = req.user.friends.indexOf(id);
    req.user.friends.splice(indexOfdeletedFriend, 1);
    const message = `user ${ user.name } has been removed from friends`;
    res.json({ message, id })
});

router.post('/local/signup', signUp);
router.post('/local/signin', signIn);
router.get('/logout', logout);

module.exports = router;


