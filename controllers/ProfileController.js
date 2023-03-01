const registermodel = require('../models/registermodel')

const profile = (req, res) => {
    return res.render('profile')
}

const profiledata = async (req, res) => {
    let id = res.locals.userLogin.id;
    console.log(id);
    try {
        let userprofile = await registermodel.findByIdAndUpdate(id,{
            name : req.body.name,
            email : req.body.email,
            password : req.body.password,
        })

        if(userprofile){
            console.log("Profile successfully changed");
            return res.redirect('/dashboard');
        }else{
            console.log("Profile not update");
            return false;
        }

    } catch (error) {
        console.log(err);
        return false;
    }
}

module.exports = { profile, profiledata }