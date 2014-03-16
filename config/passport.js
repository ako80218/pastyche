var passport = require('passport');
var ApiValues = require('../apis.js');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var FacebookStrategy = require('passport-facebook'). Strategy;
var TwitterStrategy = require('passport-twitter'). Strategy;
var UserModel=require('../models/userModel.js');
passport.serializeUser(function(user, done){
    done(null, user._id);
});
passport.deserializeUser(function(userid, done){
    UserModel.findOne({_id: userid}, function(err, user){
        done(err,user);
    })
});
// Use the GoogleStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and Google
//   profile), and invoke a callback with a user object.
passport.use(new GoogleStrategy({
    clientID: ApiValues.googleClientID,
    clientSecret: ApiValues.googleClientSecret,
    callbackURL: "http://localhost:1337/oauth2callback"
  },
  function(accessToken, refreshToken, profile, done) {
    // console.log("profile.id: ", profile.id);
    UserModel.findOne({userId: profile.id}, function(err, user){
        // console.log("user: ", user);
        if (user){
            return done(err, user);
        }
        var newUser = new UserModel({
            userId: profile.id,
            userName: profile.name.givenName,
            userDisplayName: profile.displayName,
            userSlug: (profile.name.givenName).toLowerCase() + '-' + (profile.name.familyName).toLowerCase(),
            profile: profile
        });
        newUser.save(function(err, doc){
            return done(err, doc);
        });
    });
  }
));
passport.use(new FacebookStrategy({
    clientID:ApiValues.facebookClientID,
    clientSecret: ApiValues.facebookClientSecret,
    callbackURL: 'http://localhost:1337/facebook/callback'
},
  function(accessToken, refreshToken, profile, done){
    // console.log("profile.name.givenName: ", profile.name.givenName);
    UserModel.findOne({userId: profile.id}, function(err, user){
        // console.log("user: ", user);
        if (user){
            return done(err, user);
        }
        var newUser = new UserModel({
            userId: profile.id,
            userName: profile.username,
            userDisplayName: profile.displayName,
            userSlug: (profile.name.givenName).toLowerCase() + '-' + (profile.name.familyName).toLowerCase(),
            profile: profile
        });
        newUser.save(function(err, doc){
            return done(err, doc);
        });
    });
  }
));
passport.use(new TwitterStrategy({
    consumerKey:ApiValues.twitterAPIKey,
    consumerSecret: ApiValues.twitterAPISecret,
    callbackURL: 'http://127.0.0.1:1337/auth/twitter/callback'
},
  function(token, tokenSecret, profile, done){

      // console.log("token: ", token);
      // console.log('tokenSecret:', tokenSecret);
      UserModel.findOne({userId: profile.id}, function(err, user){
          if (user){
              return done(err, user);
          }
          var newUser = new UserModel({
              userId: profile.id,
              userName: profile.username,
              userDisplayName: profile.displayName,
              userSlug: profile.displayName.replace(' ', '-').toLowerCase(),
              profile: profile
          });
          newUser.save(function(err, doc){
              return done(err, doc);
          });
      });
    }
));






