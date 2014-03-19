if (global.process.env.FLICKR_KEY){
    var ApiValues = {
        flickrKey: global.process.env.FLICKR_KEY ,
        flickrSecret: global.process.env.FLICKR_SECRET 
    };
} else{
   var ApiValues = require('../apis.js'); 
}

var Flickr = require("node-flickr");
var keys = {
    "api_key":ApiValues.flickrKey,
    "api_secret": ApiValues.flickrSecret
}
var flickr=module.exports = new Flickr(keys);