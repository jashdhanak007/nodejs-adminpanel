const express = require('express');
const port = 5555;
const app = express();
const path = require('path');
const passport = require('passport');
const passportlocal = require('./config/passport-local-strategy')
const session = require('express-session');
const cookieparser = require('cookie-parser')

const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

const db = require('./config/mongoose');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    name: 'jash',
    secret: 'dhanak',
    saveUninitialized: true,
    resave: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 100
    }
}))

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthentication);
app.use(cookieparser());

app.use(express.urlencoded());

app.use('/', require('./routes'));

app.listen(port, (err) => {
    if (err) {
        console.log("Server not Started");
        return false;
    }
    console.log("Server is start");
})