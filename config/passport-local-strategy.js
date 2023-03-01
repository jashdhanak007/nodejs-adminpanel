const passport = require('passport');
const registermodel = require('../models/registermodel');
const passportlocal = require('passport-local').Strategy;

passport.use(new passportlocal({
    usernameField: 'email'
}, async (email, password, done) => {
    try {
        let user = await registermodel.findOne({ email: email })
        if (!user || user.password != password) {
            console.log("Email and Password is not match");
            return (null, false);
        }
        console.log(user);
        return done(null, user);
    } catch (error) {
        console.log(error);
    }
}));

passport.serializeUser((user, done) => {
    return done(null, user.id);
});

passport.deserializeUser((id, done) => {
    registermodel.findById(id, (err, user) => {
        if (err) {
            console.log(err);
            return done(null, false);
        }
        return done(null, user);
    })
});

passport.chekAuthentication = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    return res.redirect('/');
};

passport.setAuthentication = (req, res, next) => {
    if (req.isAuthenticated()) {
        res.locals.userLogin = req.user
    }
    return next();
};


module.exports = passport;