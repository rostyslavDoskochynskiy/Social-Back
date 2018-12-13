const passport = require('passport');

let express = require('express');
let router = express.Router();

router.get('/', (req, res) => {
    // res.end('Social Network API');
    res.render('index');
});

// router.get('/profile', isLoggedIn, (req, res) => {
//     res.render('profile', {user: req.user});
// });
//
// router.get('/test', (req, res) => {
//     res.render('test', {user: req.user});
// });
//
// router.post('/signup', passport.authenticate('local.signup', {
//   failureRedirect: '/'
// }), (req, res) => {
//     res.end('Registered');
// });
//
// router.post('/signin', passport.authenticate('local.signin', {
//     failureRedirect: '/'
// }), (req, res) => {
//     res.redirect('/profile');
// });
//
// router.post('/logout', (req, res) => {
//     req.logout();
//     res.redirect('/');
// });
//
// function isLoggedIn(req, res, next) {
//     if(req.isAuthenticated()) {
//         return next()
//     }
//     res.redirect('/')
// }
//
// function notLoggedIn(req, res, next) {
//     if(!req.isAuthenticated()) {
//         return next()
//     }
//     res.redirect('/profile')
// }

module.exports = router;