const registermodel = require('../models/registermodel');
const nodemailer = require('nodemailer');
const cookie = require('cookie-parser');

const emaildata = async (req, res) => {
    let email = req.body.email;
    let user = await registermodel.findOne({ email: email });
    if (user) {
        let otp = Math.floor(Math.random() * 100000);

        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'jashnd70@gmail.com',
                pass: 'ijntwlxsyinfther'
            }
        });
        let mailOptions = {
            from: 'jashnd70@gmail.com',
            to: email,
            subject: 'Forgot password',
            text: 'Otp :- ' + otp
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
                return false;
            } else {
                console.log('Email sent: ' + info.response);
                const otpdata = {
                    useremail: user.email,
                    userotp: otp
                }
                console.log(otpdata);
                res.cookie('otp', otpdata);
                return res.redirect('/otp');
            }
        });
    } else {
        console.log("User not found");
        return res.redirect('back');
    }
}
const otp = (req, res) => {
    return res.render('otp');
}
const otpData = (req, res) => {
    if (req.cookies.otp.userotp == req.body.otp) {
        return res.redirect('password')
    } else {
        console.log("Otp is wrong");
        return res.redirect('back');
    }
}

const password = (req, res) => {
    return res.render('password');
}

const PasswordData = async (req, res) => {
    let password = req.body.password;
    let cpassword = req.body.cpassword;

    try {
        if (password == cpassword) {
            let email = req.cookies.otp.useremail;
            console.log(email);
            let user = await registermodel.findOne({ email: email });
            console.log(user);
            if (!user) {
                console.log("user not found");
                return false;
            }

            let id = user.id;
            let editrecord = await registermodel.findByIdAndUpdate(id, {
                password: password
            })

            if (editrecord) {
                console.log("Password Successfully Updated");
                res.clearCookie('otp');
                return res.redirect('/');
            }
        } else {
            console.log("Password and Confirm password not match");
            return false;
        }
    } catch (error) {
        console.log(error);
        return false;
    }
}

module.exports = { emaildata, otp, otpData, password, PasswordData }