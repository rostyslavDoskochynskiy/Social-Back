let router = require('express').Router();
let PassportMiddleware = require('../middleware/passport');
let AuthController = require('../controllers/AuthController');
let Image = require('../models/Image');
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

router.post('/local/signup', AuthController.signUp);
router.post('/local/signin', AuthController.signIn);
router.get('/logout', PassportMiddleware.isLoggedIn, AuthController.logout);

module.exports = router;