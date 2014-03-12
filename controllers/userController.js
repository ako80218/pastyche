var UserModel = require('../models/userModel.js');
module.exports = {
    userProfile: function(req,res){
        // console.log("req.params.user: ", req.params.user);
        UserModel.findOne({userName: req.params.user}, function(err,user){
            // res.render('profile.jade', {user: user});
            // console.log("User from Controller: ",user);
            // res.redirect('/user/' + req.user_id);
        })
        
    }

};