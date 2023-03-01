const express = require('express');
const passport = require('passport');
const routes = express.Router();

console.log("Routing is working");

const LoginController = require('../controllers/logincontroller')
const ForgotController = require('../controllers/ForgotController');
const ProfileController = require('../controllers/ProfileController');
const CategoryController = require('../controllers/CategoryController');
const SubCategoryController= require('../controllers/SubCategoryController')

//LoginController

routes.get('/',LoginController.login);
routes.get('/register',LoginController.register);
routes.get('/dashboard',passport.chekAuthentication,LoginController.dashboard);
routes.post('/registerdata',LoginController.registerdata);
routes.post('/logindata',passport.authenticate('local',{failureRedirect : '/'}),LoginController.logindata);
routes.get('/logout',LoginController.logout);
routes.get('/forgot',LoginController.forgot);

//ForgotController

routes.post('/emaildata',ForgotController.emaildata);
routes.get('/otp',ForgotController.otp);
routes.post('/otpData',ForgotController.otpData);
routes.get('/password',ForgotController.password);
routes.post('/PasswordData',ForgotController.PasswordData);

//ProfileController

routes.get('/profile',passport.chekAuthentication,ProfileController.profile);
routes.post('/profiledata',passport.chekAuthentication,ProfileController.profiledata);

//Category

routes.get('/category',passport.chekAuthentication,CategoryController.AddCategory);
routes.post('/insertcategory',passport.chekAuthentication,CategoryController.insertcategory);
routes.get('/viewcategory',passport.chekAuthentication,CategoryController.viewcategory);

//Sub-Category

routes.get('/subcategory',passport.chekAuthentication,SubCategoryController.SubCategory);
routes.post('/insertsubcategory',passport.chekAuthentication,SubCategoryController.insertsubcategory);
routes.get('/viewsubcategory',passport.chekAuthentication,SubCategoryController.viewsubcategory);

module.exports = routes;