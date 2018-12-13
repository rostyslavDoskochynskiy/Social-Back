let passport = require('passport');
module.exports = {
    signUp(req, res, next) {
        passport.authenticate('local.signup', (err, user, message) => {
            if (err)
                return res.sendStatus(400).send(err);
            if (message)
                return res.status(400).json(message);
            req.logIn(user, async err => {
                if (err)
                    return next(err);
                return res.status(200).json({user: req.user, isReg: true});
            });
        })(req, res, next);
    },
    signIn(req, res, next) {
        passport.authenticate('local.signin', (err, user) => {
            if (err) {
                return res.status(400).send(err);
            }
            if (!user) {
                return res.sendStatus(400);
            }
            req.logIn(user, async err => {
                if (err)
                    return next(err);
                return res.status(200).json({user: req.user, loggedIn: true});
            });
        })(req, res, next);
    },
    logout(req, res) {
        req.logout();
        res.json({message: 'User is logged out'});
    }
};