let LocalStrategy = require('passport-local');
let User = require('../../models/User');

exports.LocalSignup = new LocalStrategy({
        usernameField: 'login',
        passwordField: 'password',
        passReqToCallback: true
    }, async (req, login, password, done) => {
        await User.findOne({login}, async (err, user) => {
            if (err)
                return done(err);
            if (user)
                return done(null, false, {message: 'Such user is already exist.'});
            let newUser = new User(req.body);
            newUser.password = newUser.encryptPassword(password);
            newUser = await newUser.save();
            return done(null, newUser);
        })
    }
);

exports.LocalSignin = new LocalStrategy({
    usernameField: 'login',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, login, password, done) => {
    try {
        let user = await User.findOne({login});
        if (user)
            if (user.validPassword(password, user)) {
                return done(null, user)
            } else {
                return done(null, false);
            }
        return done(null, false);
    } catch (e) {
        return e;
    }
});