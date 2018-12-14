let router = require('express').Router();
let { isLoggedIn } = require('../middleware/passport');
let { signUp, signIn, logout } = require('../controllers/AuthController');
let Image = require('../models/Image');
let User = require('../models/User');

router.get('/principal', async (req, res) => {
    if (req.user) {
        let user = await User.findById(req.user._id);
        user = user.toObject();
        res.json({
            auth: true,WW
            user
        });
    } else {
        res.json(null);
    }
});

router.post('/local/signup', signUp);
router.post('/local/signin', signIn);
router.get('/logout', isLoggedIn, logout);

module.exports = router;