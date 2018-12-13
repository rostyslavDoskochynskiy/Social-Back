module.exports = {
    notLoggedIn(req, res, next) {
        if (!req.isAuthenticated()) {
            return next();
        }
        req.logout();
        const response = {auth: false, message: "User isn't exist. Please sign up"};
        res.json(response);
    },
    isLoggedIn(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        let response = req.user === undefined ? {error: 'Unauthorised'} : req.user;
        res.send(response);
    }
};
