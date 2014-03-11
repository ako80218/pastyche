var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var UserModel=require('../models/userModel.js');
passport.serializeUser(function(user, done){
    done(null, user._id);

});
passport.deserializeUser(function(userid, done){
    UserModel.findOne({_id: userid}, function(err, user){
        done(err,user);
    })

});
var localStrategy = new LocalStrategy({

}, 
function(accessToken, refreshToken, profile, done){
    console.log(accessToken, refreshToken, profile);
    UserModel.findOne({userid: profile.id}, function(err, user){
        if (user){
            return done(err, user);
        }

        var newUser = new UserModel({
            userId: profile.id,
            userName: profile.username,
            profile: profile
        });
        newUser.save(function(err, doc){
            return done(err, doc);
        });
    });

});

passport.use(localStrategy(UserModel.authenticate()));