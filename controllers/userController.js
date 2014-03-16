var UserModel = require('../models/userModel.js');
// var PastycheModel = require('../models/pastycheModel.js');
module.exports = {
    userProfile: function(req,res){
        // console.log("req.user: ", req.user);
        res.redirect('/profile/' + req.user.userSlug);
    },
    userView: function(req,res){
        UserModel.find({_id:req.user._id}).populate('pastyches').exec(function(err,doc){
            console.log("DOC:  ",doc);
            res.send(doc);

        });
        // res.render('index.jade', {
        //     title:'Pastyche',
        //     user: req.user
        //     });


        
    }

};