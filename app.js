
/*
 * Module dependencies.
 */

var express = require('express');

var http = require('http');
var path = require('path');
var mongoose = require('mongoose');
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
// var ApiValues =require('./apis.js');
var mongoose = require('mongoose');
var stylus = require('stylus');
var nib = require("nib");
// mongoose.connect('mongodb://localhost/pastyche');
// if (global.process.env.MONGOHQ_URL){
//   mongoose.connect(global.process.env.MONGOHQ_URL)
// }else{
//   mongoose.connect('mongodb://localhost/pastyche');
// }

var mongo_url = global.process.env.MONGOHQ_URL || 'mongodb://localhost/pastyche'
mongoose.connect(mongo_url);

var indexController =require('./controllers/indexController.js');
var authController = require('./controllers/authController.js');
var userController = require('./controllers/userController.js');
var photosController = require('./controllers/photosController.js');
var passportConfig=require('./config/passport');

var app = express();
// all environments
var compile = function(str, path){
  return stylus(str)
    .set('filename', path)
    .set("compress", false)
    .use(nib())
    .import("nib");
}
// all environments
app.set('port', process.env.PORT || 1337);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser());
app.use(express.session({secret: 'password'}));
app.use(passport.initialize());
app.use(passport.session());
app.use(app.router);
app.use(stylus.middleware({
  src: path.join(__dirname, 'public'),
  compile: compile
}));
app.use(express.static(path.join(__dirname, 'public')));


// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', indexController.index);
app.get('/random-background', photosController.randomBackground);
app.get('/login', authController.login);
app.get('/register', authController.register);
app.get('/user/:id', authController.ensureAuthenticated, userController.userProfile);
app.get('/profile/:userSlug', authController.ensureAuthenticated, userController.userView);
app.get('/auth/google',
  passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/userinfo.profile',
                                            'https://www.googleapis.com/auth/userinfo.email'] }),
  function(req, res){
    // The request will be redirected to Google for authentication, so this
    // function will not be called.
  });
  // GET /auth/google/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
app.get('/oauth2callback', 
  passport.authenticate('google', {failureRedirect: '/login' }),
  authController.loginSuccess
  );
app.get('/login/facebook', passport.authenticate('facebook'));
app.get(
    '/facebook/callback', 
    passport.authenticate('facebook', {failureRedirect: '/login'}),
    authController.loginSuccess
);
app.get('/login/twitter', passport.authenticate('twitter'));
app.get(
  '/auth/twitter/callback',
  passport.authenticate('twitter', {failureRedirect: '/login'}),
  authController.loginSuccess
);

app.get('/logout', authController.logout);
app.get('/search', photosController.search);
app.get('/profile/:userSlug/pastyches', photosController.pastycheLookUp);
app.post('/save', photosController.savePastyche);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
