var UserModel = require('../models/userModel.js');
var PastycheModel = require('../models/pastycheModel.js');
var flickr= require('../config/flickr.js');
module.exports ={
    search: function(req, res){
        console.log('req.query.searchTerm: ', req.query.searchTerm);
        var results = flickr.get("photos.search", {"tags":req.query.searchTerm, 
            "sort": "interestingness-desc",
            "per_page": 20

        }, 
            function(result){
            res.send(result.photos);
    });
        // console.log("results: ", results);
        
    },
    tagLookUp: function(req, res){
        console.log("REQ.QUERY: ", req.query);
        var results = flickr.get("tags.getListPhoto", {"photo_id":req.query.id},
            function(result){
                res.send(result);
            });
    },
    savePastyche: function(req, res){
        console.log("req.user:  ", req.user);
        var pastyche = {};
        pastyche.pastyche=req.body.savedPastycheData;
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
    }
};