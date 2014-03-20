var UserModel = require('../models/userModel.js');
var PastycheModel = require('../models/pastycheModel.js');
var flickr= require('../config/flickr.js');
var underscore = require('underscore');
module.exports ={
    randomBackground: function(req,res){
        var results = flickr.get("photos.search", {"tags":"landscape", 
            "sort": "interestingness-desc",
            "per_page": 20

        },  function(result){
            res.send(result.photos);
        });
        // res.render('index.jade',{
        //     title:"Pastyche",

        // })

    },
    search: function(req, res){
        console.log('req.query.searchTerm: ', req.query.searchTerm);
        var results = flickr.get("photos.search", {"tags":req.query.searchTerm, 
            "sort": "interestingness-desc",
            "per_page": 20,
            "extras": "tags"

        }, 
            function(result){
            res.send(result.photos);
    });
        // console.log("results: ", results);
        
    },
    // tagLookUp: function(req, res){
    //     console.log("REQ.QUERY: ", req.query);
    //     var results = flickr.get("tags.getListPhoto", {"photo_id":req.query.id},
    //         function(result){
    //             res.send(result);
    //         });
    // },
    savePastyche: function(req, res){
        // console.log("req.user:  ", req.user);
        var pastyche = {};
        // console.log("req.body.savedPastycheData", req.body.savedPastycheData);
        pastyche=req.body.savedPastycheData;
        // console.log("pastyche:  ", pastyche);
        var savedPastyche= new PastycheModel(pastyche);
        console.log('savedPastyche: ', savedPastyche);
        savedPastyche.save(function(err, doc){
            if(err){
                console.log("ERR IN SAVING!!");
            }
            res.send('SUCCESS!!', doc);
            UserModel.update({_id: req.user._id}, {
                $push:{pastyches:doc._id}
            },
            function(err, docs){
                if(err){
                    console.log('ERROR', err);
                }

            }
            );

        });
    },
    pastycheLookUp: function(req, res){
        console.log("req.user.pastyches:  ", req.user.pastyches);
        PastycheModel.find({_id:{$in:req.user.pastyches}}, function(err, docs){
            if(err){
                console.log("ERR IN SAVING!!");
            }
            var profileArray =underscore._.map(docs, function(obj){return underscore._.pick(obj, 'title', 'description', 'backgroundImage')});
            // console.log("docs.title: ", docs.title);
            // res.render('profile.jade', {
            //     title: 'Pastyche',
            //     user: req.user,
            //     pastycheTitles:docs.title

            // });
            console.log('(profileArray):  ', profileArray);
            res.send(profileArray);
        });

    }
};