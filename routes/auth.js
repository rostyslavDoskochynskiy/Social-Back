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

router.post('/local/signup', signUp);
router.post('/local/signin', signIn);
router.get('/logout', logout);

module.exports = router;