var UserModel = require('../models/userModel.js');
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
        console.log("req.query", req.query);
        var results = flickr.get("photos.getInfo", {"photo_id":req.query},
            function(result){
                res.send(result);
        });
    }


};