var UserModel = require('../models/userModel.js');
module.exports = {
    userProfile: function(req,res){
        // console.log("req.user: ", req.user);
        res.redirect('/profile/' + req.user.userSlug);
    },
    userView: function(req,res){
        res.render('index.jade', {
            title:'Pastyche',
            user: req.user
        });
    }

};