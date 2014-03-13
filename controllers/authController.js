var passport = require('passport');
var UserModel = require('../models/userModel.js');
module.exports ={
    login: function(req, res){
        if (req.isAuthenticated()){
            res.redirect('/user');
        }
        res.render('login.jade', {
            title:'Login'
        });
    },
    loginSuccess: function(req,res){
            res.redirect('/user/' +req.user._id);
    },
    logout: function(req, res){
        req.logout();
        res.redirect('/');
    },
    ensureAuthenticated: function(req, res, next){
        if (req.isAuthenticated()){
            return next();
        }
        res.redirect('/login');
    }, 
    register: function(req, res){
        res.render('register.jade', {title:'Register'});
    }
};
