const registermodel = require('../models/registermodel');

const login = (req, res) => {
    if (res.locals.userLogin) {
        return res.redirect('dashboard');
    }
    return res.render('login');
}

const register = (req, res) => {
    if (res.locals.userLogin) {
        return res.redirect('dashboard')
    }
    return res.render('register');
}

const dashboard = (req, res) => {
    return res.render('dashboard')
}

const registerdata = async (req, res) => {
    console.log('data' + req.body)
    try {
        let register = await registermodel.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        })
        if (register) {
            console.log("Record successfully insert");
            return res.redirect('back');
        } else {
            console.log("Data not Fetch");
        }
    } catch (error) {
        console.log(error);
    }
}

const logindata = (req, res) => {
    console.log(req.body)
    return res.redirect('/dashboard');
}

const logout = (req, res) => {
    req.logout((err) => {
        if (err) {
            console.log("User not logout");
            return false;
        }
        return res.redirect('/');
    })
}

const forgot = (req,res)=>{
    return res.render('forgot')
}

module.exports = { login, register, dashboard, logindata, registerdata, logout,forgot }
