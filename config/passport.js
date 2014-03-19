var passport = require('passport');
// var facebookClientID = global.process.env.FACEBOOK_CLIENT_ID || ApiValues.facebookClientID;
// var facebookClientSecret = global.process.env.FACEBOOK_CLIENT_SECRET || ApiValues.facebookClientSecret;
// var flickrKey = global.process.env.FLICKR_KEY || ApiValues.flickrKey;
// var flickrSecret =  global.process.env.FLICKR_SECRET || ApiValues.flickrSecret;
// var googleClientID =  global.process.env.GOOGLE_CLIENT_ID || ApiValues.googleClientID;
// var googleClientSecret = global.process.env.GOOGLE_CLIENT_SECRET || ApiValues.googleClientSecret;
// var twitterAPIKey = global.process.env.TWITTER_API_KEY || ApiValues.twitterAPIKey;
// var twitterAPISecret = global.process.env.TWITTER_API_SECRET || ApiValues.twitterAPISecret; 

if(global.process.env.FACEBOOK_CLIENT_ID){
  var ApiValues = {
    facebookClientID : global.process.env.FACEBOOK_CLIENT_ID,
    facebookClientSecret : global.process.env.FACEBOOK_CLIENT_SECRET,
    googleClientID : global.process.env.GOOGLE_CLIENT_ID,
    googleClientSecret : global.process.env.GOOGLE_CLIENT_SECRET,
    twitterAPIKey : global.process.env.TWITTER_API_KEY,
    twitterAPISecret : global.process.env.TWITTER_API_SECRET
  };
} else {

  var ApiValues = require('../apis.js');
}

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
    callbackURL: "/oauth2callback"
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
    callbackURL: '/facebook/callback'
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
    callbackURL: '/auth/twitter/callback'
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






