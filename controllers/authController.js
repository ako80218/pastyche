var passport = require('passport');
var UserModel = require('../models/userModel.js');
module.exports ={
    login: function(req, res){
        if (req.isAuthenticated()){
            
            console.log('req.params.user.id: AUTHC CONTROLLER ', req.params.user.id);
            res.redirect('/user/' + req.params.user.id);
        }
        res.render('login.jade', {
            title:'Login'
        });
    },
    loginSuccess: function(req,res){
         console.log('req.params.user:       ', req.params.user);
            res.redirect('/user/' + req.params.user);
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
